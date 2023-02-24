import React from 'react'
import { ProjectPreview } from '../components/ProjectPreview'

export const Projetcs = () => {

  const projects = [1,2]

  return (
    <>
    <h1>
      Proyectos
    </h1>
    <div>
      {
        projects.length
        ?
        projects.map(project => <ProjectPreview key={project}/>)
        :
        <p>No hay proyectos agregados</p>
      }
    </div>
    </>
  )
}
