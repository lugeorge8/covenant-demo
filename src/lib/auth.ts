import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'clg_admin';

// Note: in Next 16, cookies() is async.
export async function isAdminAuthed() {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value === '1';
}

export async function requireAdmin() {
  if (!(await isAdminAuthed())) redirect('/admin/login');
}

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get('password') ?? '');
  const expected = process.env.CLG_ADMIN_PASSWORD || 'demo';

  if (password !== expected) {
    redirect('/admin/login?error=1');
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });

  redirect('/admin');
}

export async function logoutAdmin() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, '0', { path: '/', maxAge: 0 });
  redirect('/');
}
