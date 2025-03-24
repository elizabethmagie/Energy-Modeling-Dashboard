import { FC, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { Project, Measure, ProjectOption } from '../types';

interface NewMeasureModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

export const NewMeasureModal: FC<NewMeasureModalProps> = ({ show, onHide, onSuccess }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectOption | null>(null);
  const [measureType, setMeasureType] = useState<Measure['measure_type']>('');
  const [installDate, setInstallDate] = useState<Measure['install_date']>('');

  const loadProjectOptions = async (inputValue: string) => {
    try {
      // Only search if there's an input value, otherwise get all projects
      const url = inputValue 
        ? `http://127.0.0.1:5000/api/projects/search?q=${encodeURIComponent(inputValue)}`
        : 'http://127.0.0.1:5000/api/projects';
        
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects: Project[] = await response.json();
      
      return projects.map(project => ({
        value: project.id,
        label: project.title
      }));
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      const response = await fetch('http://127.0.0.1:5000/api/measures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: selectedProject.value,
          measure_type: measureType,
          install_date: installDate
        })
      });

      if (!response.ok) throw new Error('Failed to create measure');
      
      onHide();
      onSuccess();
    } catch (error) {
      console.error('Error creating measure:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Measure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Project</Form.Label>
            <AsyncSelect
              isClearable
              value={selectedProject}
              onChange={(option) => setSelectedProject(option)}
              loadOptions={loadProjectOptions}
              defaultOptions
              isSearchable
              placeholder="Search for a project..."
              noOptionsMessage={({ inputValue }) => 
                inputValue ? "No projects found" : "Type to search projects"
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Measure Type</Form.Label>
            <Form.Control
              type="text"
              required
              value={measureType}
              onChange={e => setMeasureType(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Install Date</Form.Label>
            <Form.Control
              type="date"
              required
              value={installDate}
              onChange={e => setInstallDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Measure
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
