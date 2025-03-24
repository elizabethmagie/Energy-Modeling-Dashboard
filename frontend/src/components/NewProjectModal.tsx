import { FC, useCallback, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Project, Measure, StatusOption, AllStatusOption } from '../types';

interface NewProjectModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

type NewMeasure = Omit<Measure, 'id' | 'project_id'>;

type NewProject = Omit<Project, 'id' | 'measures'> & { measures: NewMeasure[] };

const statusOptions: Exclude<StatusOption, AllStatusOption>[] = [
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Complete', label: 'Complete' }
];

export const NewProjectModal: FC<NewProjectModalProps> = ({ show, onHide, onSuccess }) => {
  const [project, setProject] = useState<NewProject>({
    title: '',
    status: 'In Progress',
    measures: []
  });

  const [measure, setMeasure] = useState<NewMeasure>({
    measure_type: '',
    install_date: ''
  });

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
      });
      
      if (!response.ok) throw new Error('Failed to create project');
      
      onHide();
      onSuccess();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }, [project, onHide, onSuccess]);

  const addMeasure = useCallback(() => {
    if (measure.measure_type && measure.install_date) {
      setProject(prev => ({
        ...prev,
        measures: [...prev.measures, { ...measure }]
      }));
      setMeasure({ measure_type: '', install_date: '' });
    }
  }, [measure]);

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              required
              value={project.title}
              onChange={e => setProject(prev => ({ ...prev, title: e.target.value }))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Select
              value={statusOptions.find(option => option.value === project.status)}
              onChange={(option) => option && setProject(prev => ({ 
                ...prev, 
                status: option.value
              }))}
              options={statusOptions}
              isSearchable={false}
              isClearable={false}
            />
          </Form.Group>

          <h6>Add Measures (Optional)</h6>
          <div className="d-flex gap-2 mb-3">
            <Form.Control
              placeholder="Measure Type"
              value={measure.measure_type}
              onChange={e => setMeasure(prev => ({ 
                ...prev, 
                measure_type: e.target.value 
              }))}
            />
            <Form.Control
              type="date"
              value={measure.install_date}
              onChange={e => setMeasure(prev => ({ 
                ...prev, 
                install_date: e.target.value 
              }))}
            />
            <Button onClick={addMeasure}>Add</Button>
          </div>

          {project.measures.length > 0 && (
            <div className="mb-3">
              <h6>Added Measures:</h6>
              <ul>
                {project.measures.map((m, i) => (
                  <li key={i}>{m.measure_type} - {m.install_date}</li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Project
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
