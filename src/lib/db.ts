import { createClient, createPool } from '@vercel/postgres';

// Minimal DB helper (same pattern as twodashone): works with Vercel Postgres env vars.
// Prefer POSTGRES_URL_NON_POOLING when available.

type QueryResult<T> = { rows: T[] };

type Runner = {
  query: <T = any>(text: string, params?: any[]) => Promise<QueryResult<T>>;
};

let runnerPromise: Promise<Runner> | null = null;

function isPostgresUrl(cs: string) {
  return /^postgres(ql)?:\/\//i.test(cs);
}

function looksPooled(cs: string) {
  return /pooler/i.test(cs);
}

async function getRunner(): Promise<Runner> {
  if (runnerPromise) return runnerPromise;

  const nonPooling = process.env.POSTGRES_URL_NON_POOLING;
  const pooled = process.env.POSTGRES_URL;
  const connectionString = nonPooling || pooled;

  if (!connectionString) {
    throw new Error('Missing POSTGRES_URL (and POSTGRES_URL_NON_POOLING)');
  }

  if (!isPostgresUrl(connectionString)) {
    throw new Error('Invalid POSTGRES_URL: must start with postgres:// (or postgresql://).');
  }

  if (nonPooling) {
    const client = createClient({ connectionString: nonPooling });
    runnerPromise = (async () => {
      await client.connect();
      return {
        query: async (text, params) => {
          const res = await client.query(text, params);
          return { rows: res.rows };
        },
      };
    })();
    return runnerPromise;
  }

  if (!pooled) throw new Error('POSTGRES_URL missing');

  if (looksPooled(pooled)) {
    const pool = createPool({ connectionString: pooled });
    runnerPromise = Promise.resolve({
      query: async (text, params) => {
        const res = await pool.query(text, params);
        return { rows: res.rows };
      },
    });
    return runnerPromise;
  }

  const client = createClient({ connectionString: pooled });
  runnerPromise = (async () => {
    await client.connect();
    return {
      query: async (text, params) => {
        const res = await client.query(text, params);
        return { rows: res.rows };
      },
    };
  })();
  return runnerPromise;
}

function buildQuery(strings: TemplateStringsArray, values: unknown[]) {
  let text = '';
  const params: unknown[] = [];
  for (let i = 0; i < strings.length; i++) {
    text += strings[i];
    if (i < values.length) {
      params.push(values[i]);
      text += `$${params.length}`;
    }
  }
  return { text, params };
}

export async function sql<T = any>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<QueryResult<T>> {
  const runner = await getRunner();
  const { text, params } = buildQuery(strings, values);
  return runner.query<T>(text, params as any[]);
}

export async function query<T = any>(text: string, params: any[] = []): Promise<QueryResult<T>> {
  const runner = await getRunner();
  return runner.query<T>(text, params);
}
