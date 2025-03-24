import { FC } from 'react';
import { NewItemButton } from './NewItemButton';
import './Toolbar.css';

export const Toolbar: FC = () => {
  return <div className='toolbar-container'>
    <FiltersContainer />
    <div><NewItemButton /></div>
  </div>
}

const FiltersContainer: FC = () => {
  return <div>This is where my filters will go</div>
}
