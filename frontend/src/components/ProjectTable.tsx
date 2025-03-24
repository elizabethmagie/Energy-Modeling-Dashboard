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
  isSelected: boolean;
  onSelect: (project: Project) => void;
}

const ProjectRow: FC<ProjectRowProps> = ({ project, isSelected, onSelect }) => {
  return (
    <div 
      className={`custom-table-row ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(project)}
    >
      <div className="custom-table-cell custom-title-cell">{project.title}</div>
      <div className="custom-table-cell custom-status-cell">{project.status}</div>
      <div className="custom-table-cell custom-measures-cell">{project.measures.length}</div>
    </div>
  );
};

interface MeasuresTableProps {
  measures: Measure[];
}

const MeasuresTable: FC<MeasuresTableProps> = ({ measures }) => {
  if (measures.length === 0) {
    return (
      <div className="custom-table-container">
        <div className="custom-empty-state">No associated measures</div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Adjust for timezone offset
    const timezoneOffset = date.getTimezoneOffset() * 60000; // convert minutes to milliseconds
    const adjustedDate = new Date(date.getTime() + timezoneOffset);
    
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formatter.format(adjustedDate);
  };


  return (
    <div className="custom-table-container">
      <div className="custom-table">
        <div className="custom-table-header">
          <div className="custom-table-cell">Measure Type</div>
          <div className="custom-table-cell">Install Date</div>
        </div>
        <div className="custom-table-body">
          {measures.map((measure) => (
              <div key={measure.id} className="custom-table-row">
                <div className="custom-table-cell">{measure.measure_type}</div>
                <div className="custom-table-cell">{formatDate(measure.install_date)}</div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectTable: FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const handleProjectSelect = (project: Project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
  };

  if (error) {
    return <div className="custom-error-message">Error: {error}</div>;
  }

  return (
    <div className="custom-page-container">
      <div className="custom-main-table">
        <div className="custom-table-container">
          <div className="custom-table">
            <div className="custom-table-header">
              <div className="custom-table-cell custom-title-cell">Title</div>
              <div className="custom-table-cell custom-status-cell">Status</div>
              <div className="custom-table-cell custom-measures-cell">Measures (count)</div>
            </div>
            <div className="custom-table-body">
              {projects.map((project) => (
                <ProjectRow 
                  key={project.id} 
                  project={project}
                  isSelected={selectedProject?.id === project.id}
                  onSelect={handleProjectSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedProject && (
        <div className="custom-measures-panel">
          <MeasuresTable measures={selectedProject.measures} />
        </div>
      )}
    </div>
  );
};