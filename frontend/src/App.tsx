import { useState, useEffect, useCallback, useMemo } from 'react'
import './App.css'
import { ProjectTable } from './components/ProjectTable'
import { Header } from './components/Header'
import { Toolbar } from './components/Toolbar'
import { Project } from './types'

export const App = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<Project['status'] | 'all'>('all');

  const projectsFilteredByStatus = useMemo<Set<Project['id']>>(() => {
    if (statusFilter === 'all') {
      return new Set(projects.map(project => project.id));
    } else {
      return new Set(projects.filter(project => project.status === statusFilter).map(project => project.id));
    }
  }, [projects, statusFilter])

  const [projectsFilteredBySearch, setProjectsFilteredBySearch] = useState<Set<Project['id']> | undefined>();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => 
      projectsFilteredByStatus.has(project.id) && 
      (projectsFilteredBySearch == null || projectsFilteredBySearch.has(project.id))
    );
  }, [projects, projectsFilteredByStatus, projectsFilteredBySearch])

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

  // When search term changes, search for projects matching the term
  useEffect(() => {
    async function search() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/projects/search?q=${encodeURIComponent(searchTerm)}`)
        if (!response.ok) throw new Error('Failed to search projects')

        const data: Pick<Project, 'id' | 'title'>[] = await response.json();
        const projectsMatchingSearch = new Set(data.map(project => project.id))
        setProjectsFilteredBySearch(projectsMatchingSearch)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      }
    }
    search()
  }, [searchTerm, projects])

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
  }, [])

  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1)
  }, [])

  const handleStatusFilter = useCallback((status: Project['status'] | 'all') => {
    setStatusFilter(status)
  }, [])

  return (
    <>
      <Header />
      <Toolbar 
        onProjectOrMeasureAdded={handleRefresh}
        onStatusFilter={handleStatusFilter}
        onSearchFilter={handleSearch}
      />
      <ProjectTable 
        projects={filteredProjects} 
        error={error} 
      />
    </>
  )
}
