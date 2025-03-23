import { FC } from 'react'
import './Toolbar.css';

export const Toolbar: FC = () => {
  return <div className='toolbar-container'>
    <FiltersContainer />
    <div>This is where my add button will go</div>
  </div>
}

const FiltersContainer: FC = () => {
  return <div>This is my filters container</div>
}
