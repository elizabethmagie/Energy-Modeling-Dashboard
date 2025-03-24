export interface Measure {
  id: number;
  measure_type: string;
  install_date: string;
  project_id: number;
}

export interface Project {
  id: number;
  title: string;
  status: 'In Progress' | 'Complete';
  measures: Measure[];
}

export type AllStatusOption = { value: 'all'; label: 'All Projects' };

export type StatusOption = 
    | AllStatusOption
    | { value: 'In Progress'; label: 'In Progress' } 
    | { value: 'Complete'; label: 'Complete' };

export interface ProjectOption {
  value: number;
  label: string;
}
