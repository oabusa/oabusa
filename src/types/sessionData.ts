export interface Employee {
  name: string;
  email: string;
  roles: string[];
  completedSOPs: number;
  assignedSOPs: number;
  status: 'invited' | 'active';
  lastActive?: string;
}

export interface SOP {
  id: string;
  title: string;
  description: string;
  roles: string[];
  status: 'draft' | 'published';
  steps: string[];
  createdAt: string;
  updatedAt?: string;
  sopOrder?: number;
}

export interface Role {
  name: string;
  employees: string[];
  sopOrder?: string[];
  description?: string; // Added optional description
}

export interface SessionData {
  employees: Employee[];
  sops: SOP[];
  roles: Role[];
}
