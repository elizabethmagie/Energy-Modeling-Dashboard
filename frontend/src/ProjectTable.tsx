import { FC, useEffect, useState } from 'react';

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
    return <div>Error: {error}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Number of Measures</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.title}</td>
            <td>{project.status}</td>
            <td>{project.measures.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};