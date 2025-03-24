import { FC, useState } from 'react';
import './Toolbar.css';
import { NewProjectModal } from './NewProjectModal';
import { NewMeasureModal } from './NewMeasureModal';
import { Dropdown } from 'react-bootstrap';

interface ToolbarProps {
  onProjectOrMeasureAdded: () => void;
}

export const Toolbar: FC<ToolbarProps> = ({ onProjectOrMeasureAdded }) => {
  return (
    <div className='custom-toolbar-container'>
      <FiltersContainer />
      <div><NewItemButton onProjectOrMeasureAdded={onProjectOrMeasureAdded} /></div>
    </div>
  )
}

const FiltersContainer: FC = () => {
  return <div>This is where my filters will go</div>
}

const NewItemButton: FC<ToolbarProps> = ({ onProjectOrMeasureAdded }) => {
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
