import { FC } from 'react'
import './App.css'
import { ProjectTable } from './components/ProjectTable'
import { Header } from './components/Header'
import { Toolbar } from './components/Toolbar'

export const App: FC = () => {
  return (
    <>
      <Header />
      <Toolbar />
      <ProjectTable />
    </>
  )
}
