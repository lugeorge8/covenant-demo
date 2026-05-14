export type Department = 'Onboarding' | 'Pre-Litigation' | 'Litigation';

export const DEPARTMENTS: Department[] = ['Onboarding', 'Pre-Litigation', 'Litigation'];

export const CASE_STATUSES: Record<Department, string[]> = {
  Onboarding: [
    'Initial Review & Evaluation',
    'Missing Information',
    'Missing Info Requested',
    'Missing Info Received',
    'Assign Firm & Finalize Data',
    'Referral Declined',
    'Retention',
    'Non-Responsive',
    'Claim Closed',
  ],
  'Pre-Litigation': ['LOR', 'Demand Letter', 'Active Negotiations', 'Suit Preparation', 'Expanded Case File'],
  Litigation: ['Suit Filed', 'Settled w/ Release', 'Claim Closed'],
};

export const NEXT_STEPS: Record<string, string[]> = {
  'Initial Review & Evaluation': [
    'Initial Review',
    'Missing Information',
    'Missing Info Requested',
    'Missing Info Received',
    'Assign Firm & Finalize Data',
    'Referral Declined',
  ],
  Retention: [
    'Build Retainer',
    'Retainer Ready / Call Client(s)',
    'Retainer Sent – Pending Signature(s)',
    'Retainer Pending Attorney Signature(s)',
    'Pending Additional Client Signature',
    'Pending Additional Client Info',
  ],
  LOR: [
    'Build LOR',
    'LOR Ready / Send to Client(s)',
    'LOR Sent to IC – Pending Response',
    'LOR Sent – Pending Client Signature(s)',
  ],
  'Demand Letter': [
    'Prepare Demand Letter',
    'Demand Letter Pending Approval',
    'Demand Letter Approved to Send',
    'Demand Letter Sent to IC – Pending Response',
  ],
  'Active Negotiations': [
    'Active Negotiations',
    'Pending BC/Contractor Estimate',
    'Pending BC Inspection Report',
    'Standing on Denial',
    'Pending EUO',
    'Escalation Requested',
  ],
};
