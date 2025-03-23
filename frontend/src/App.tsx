import { FC } from 'react'
import './App.css'
import { ProjectTable } from './ProjectTable'
import { Header } from './Header'
import { Toolbar } from './Toolbar'

export const App: FC = () => {
  return (
    <>
      <Header />
      <Toolbar />
      <ProjectTable />
    </>
  )
}
