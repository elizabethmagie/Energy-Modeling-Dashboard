import { FC, useEffect, useState } from 'react';
import './ProjectTable.css';

interface Measure {
  id: number;
  measure_type: string;
  install_date: string;
}

interface Project {
  id: number;
  title: string;
  status: string;
  measures: Measure[];
}

interface ProjectRowProps {
  project: Project;
}

const ProjectRow: FC<ProjectRowProps> = ({ project }) => {
  return (
    <div className="table-row">
      <div className="table-cell title-cell">{project.title}</div>
      <div className="table-cell status-cell">{project.status}</div>
    </div>
  );
};

export const ProjectTable: FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header">
          <div className="table-cell title-cell">Title</div>
          <div className="table-cell status-cell">Status</div>
        </div>
        <div className="table-body">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};