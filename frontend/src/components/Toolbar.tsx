import { FC, useState } from 'react';
import './Toolbar.css';
import { NewProjectModal } from './NewProjectModal';
import { NewMeasureModal } from './NewMeasureModal';
import { Dropdown, Form, Button, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import { StatusOption } from '../types';

interface ToolbarProps {
  onProjectOrMeasureAdded: () => void;
  onStatusFilter: (status: 'In Progress' | 'Complete' | 'all') => void;
  onSearchFilter: (searchTerm: string) => void;
}

interface NewItemButtonProps {
  onProjectOrMeasureAdded: () => void;
}

const statusOptions: StatusOption[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Complete', label: 'Complete' }
];

export const Toolbar: FC<ToolbarProps> = ({ 
  onProjectOrMeasureAdded, 
  onStatusFilter,
  onSearchFilter 
}) => {
  return (
    <div className='custom-toolbar-container my-3'>
      <FiltersContainer 
        onStatusFilter={onStatusFilter}
        onSearchFilter={onSearchFilter}
      />
      <div><NewItemButton onProjectOrMeasureAdded={onProjectOrMeasureAdded} /></div>
    </div>
  )
}

interface FiltersContainerProps {
  onStatusFilter: (status: 'In Progress' | 'Complete' | 'all') => void;
  onSearchFilter: (searchTerm: string) => void;
}

const FiltersContainer: FC<FiltersContainerProps> = ({ onStatusFilter, onSearchFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFilter(searchTerm);
  };

  return (
    <div className="custom-filters-container">
      <Select
        className='custom-toolbar-filter'
        options={statusOptions}
        defaultValue={statusOptions[0]}
        onChange={(option) => option && onStatusFilter(option.value)}
        isSearchable={false}
        isClearable={false}
      />

      <InputGroup>
        <Form.Control
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e);
            }
          }}
        />
        <Button 
          variant="outline-secondary" 
          onClick={handleSearch}
        >
          Search
        </Button>
      </InputGroup>
    </div>
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
