import { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { NewProjectModal } from './NewProjectModal';
import { NewMeasureModal } from './NewMeasureModal';

export const NewItemButton: FC = () => {
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
      />
      <NewMeasureModal 
        show={showMeasureModal} 
        onHide={() => setShowMeasureModal(false)} 
      />
    </>
  );
};
