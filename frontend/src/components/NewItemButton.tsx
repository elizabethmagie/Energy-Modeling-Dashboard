import { FC, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { NewProjectModal } from './NewProjectModal';

export const NewItemButton: FC = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="primary">
          New
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowProjectModal(true)}>Project</Dropdown.Item>
          <Dropdown.Item>Measure</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <NewProjectModal 
        show={showProjectModal} 
        onHide={() => setShowProjectModal(false)} 
      />
      {/* TODO implement adding new measure to existing project functionality */}
    </>
  );
};
