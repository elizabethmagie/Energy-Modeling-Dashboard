import { useState, useEffect } from 'react'
import './App.css'
import { ProjectTable } from './components/ProjectTable'
import { Header } from './components/Header'
import { Toolbar } from './components/Toolbar'
import { Container } from 'react-bootstrap'

interface Project {
  id: number
  title: string
  status: string
  measures: {
    id: number
    measure_type: string
    install_date: string
  }[]
}

export const App = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }

    fetchProjects()
  }, [refreshTrigger])

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status || 'all')
  }

  // Filter projects based on selected status
  const filteredProjects = projects.filter(project => 
    statusFilter === 'all' || project.status === statusFilter
  )

  return (
    <Container className="py-4">
      <Header />
      <Toolbar 
        onProjectOrMeasureAdded={handleRefresh}
        onStatusFilter={handleStatusFilter}
      />
      <ProjectTable 
        projects={filteredProjects} 
        error={error} 
        statusFilter={statusFilter}
      />
    </Container>
  )
}
