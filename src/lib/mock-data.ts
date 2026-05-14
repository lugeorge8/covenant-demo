import type { Department } from '@/lib/workflow';

export type CaseRow = {
  id: string;
  department: Department;
  status: string;
  nextStep: string;
  insured: string;
  carrier: string;
  state: string;
  assignedFirm: string;
  lastTouch: string; // ISO date
  docs: number;
  priority: 'Low' | 'Normal' | 'High';
};

export const MOCK_CASES: CaseRow[] = [
  {
    id: 'CLG-000132',
    department: 'Onboarding',
    status: 'Initial Review & Evaluation',
    nextStep: 'Initial Review',
    insured: 'Maria Lopez',
    carrier: 'State Farm',
    state: 'NC',
    assignedFirm: 'Covenant Law Group',
    lastTouch: '2026-05-10',
    docs: 12,
    priority: 'High',
  },
  {
    id: 'CLG-000141',
    department: 'Onboarding',
    status: 'Missing Info Requested',
    nextStep: 'Missing Info Received',
    insured: 'Jordan Patel',
    carrier: 'Allstate',
    state: 'SC',
    assignedFirm: 'Covenant Law Group',
    lastTouch: '2026-05-08',
    docs: 7,
    priority: 'Normal',
  },
  {
    id: 'CLG-000155',
    department: 'Pre-Litigation',
    status: 'LOR',
    nextStep: 'LOR Sent to IC – Pending Response',
    insured: 'K. Nguyen',
    carrier: 'Nationwide',
    state: 'FL',
    assignedFirm: 'Covenant Law Group',
    lastTouch: '2026-05-07',
    docs: 18,
    priority: 'Normal',
  },
  {
    id: 'CLG-000160',
    department: 'Pre-Litigation',
    status: 'Demand Letter',
    nextStep: 'Demand Letter Pending Approval',
    insured: 'S. Williams',
    carrier: 'USAA',
    state: 'MI',
    assignedFirm: 'Covenant Law Group',
    lastTouch: '2026-05-06',
    docs: 25,
    priority: 'High',
  },
  {
    id: 'CLG-000177',
    department: 'Litigation',
    status: 'Suit Filed',
    nextStep: 'Await carrier response',
    insured: 'A. Chen',
    carrier: 'Progressive',
    state: 'CO',
    assignedFirm: 'Covenant Law Group',
    lastTouch: '2026-05-03',
    docs: 31,
    priority: 'Normal',
  },
  {
    id: 'CLG-000181',
    department: 'Pre-Litigation',
    status: 'Active Negotiations',
    nextStep: 'Pending BC/Contractor Estimate',
    insured: 'L. Garcia',
    carrier: 'Farm Bureau',
    state: 'HI',
    assignedFirm: 'Covenant Law Group',
    lastTouch: '2026-05-02',
    docs: 9,
    priority: 'Low',
  },
];
