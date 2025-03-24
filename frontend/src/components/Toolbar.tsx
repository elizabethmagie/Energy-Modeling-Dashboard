import { FC, useState } from 'react';
import './Toolbar.css';
import { NewProjectModal } from './NewProjectModal';
import { NewMeasureModal } from './NewMeasureModal';
import { Dropdown, Form } from 'react-bootstrap';

interface ToolbarProps {
  onProjectOrMeasureAdded: () => void;
  onStatusFilter: (status: string) => void;
  className?: string;
}

interface NewItemButtonProps {
  onProjectOrMeasureAdded: () => void;
}

export const Toolbar: FC<ToolbarProps> = ({ onProjectOrMeasureAdded, onStatusFilter }) => {
  return (
    <div className='custom-toolbar-container my-3'>
      <FiltersContainer onStatusFilter={onStatusFilter} />
      <div><NewItemButton onProjectOrMeasureAdded={onProjectOrMeasureAdded} /></div>
    </div>
  )
}

interface FiltersContainerProps {
  onStatusFilter: (status: string) => void;
}

const FiltersContainer: FC<FiltersContainerProps> = ({ onStatusFilter }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusFilter(e.target.value);
  };

  return (
    <Form.Group className="toolbar-filter">
      <Form.Select 
        onChange={handleStatusChange}
        defaultValue="all"
      >
        <option value="all">All Projects</option>
        <option value="In Progress">In Progress</option>
        <option value="Complete">Complete</option>
      </Form.Select>
    </Form.Group>
  );
};

const NewItemButton: FC<NewItemButtonProps> = ({ onProjectOrMeasureAdded }) => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showMeasureModal, setShowMeasureModal] = useState(false);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="primary">
          New
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowProjectModal(true)}>Project</Dropdown.Item>
          <Dropdown.Item onClick={() => setShowMeasureModal(true)}>Measure</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <NewProjectModal 
        show={showProjectModal} 
        onHide={() => setShowProjectModal(false)} 
        onSuccess={onProjectOrMeasureAdded}
      />
      <NewMeasureModal 
        show={showMeasureModal} 
        onHide={() => setShowMeasureModal(false)} 
        onSuccess={onProjectOrMeasureAdded}
      />
    </>
  );
};
