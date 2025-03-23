import { FC } from 'react'
import './App.css'
import { ProjectTable } from './ProjectTable'
import { Header } from './Header'

export const App: FC = () => {
  return (
    <>
      <Header />
      <ProjectTable />
    </>
  )
}
