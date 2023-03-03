import React, { useEffect } from 'react'
import { ProjectPreview } from '../components/ProjectPreview'
import  useProjects  from '../hooks/useProjects'

export const Projetcs = () => {

  const {loading, alert, projects, getProjects} = useProjects();
  
  useEffect(() => {
    getProjects()
  }, []);

  return (
    <>
    <h1>
      Proyectos
    </h1>
    <div>
      {
        loading ? 
        <p>cargando...</p> 
        :
        projects.length
        ?
        projects.map((project, i) => <ProjectPreview key={project + i} {...project} />)
        :
        <p>No hay proyectos agregados</p>
      }
    </div>
    </>
  )
}


