import React, { useState } from 'react'
import { createContext } from 'react'
import { clientAxios } from '../config/clientAxios';
import Swal from 'sweetalert2 '
import { useNavigate } from 'react-router-dom';

const ProjectsContext = createContext();

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer)
        toast.addEventListener("mouseenter", Swal.resumeTimer)
    }
})

export const ProjectsProvider = ({children}) => {
  
    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState({});
    const navigate = useNavigate()
    
    const showAlert = (msg, time = true) => {
        setAlert({
            msg
        });
        if(time){
            setTimeout(() => {
                setAlert({})
            }, 3000)
        }
    }

    const getProjects = async () => {
        setLoading(true);

        try {

            const token = sessionStorage.getItem('token')
            if(!token) return null

            const {data} = await clientAxios.get('/projects',{
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : token
                }
            });
            //console.log(data.project);
            setProjects(data.project)
            
        } catch (error) {
            console.log(error);

            showAlert(error.response ? error.response.data.msg : 'Ups, hubo un error', false)
        }finally{
            setLoading(false)
        }
    }

    const getProject  = async (id) => {
        setLoading(true)

        try {

            const token = sessionStorage.getItem('token')
            if(!token) return null

            const {data} = await clientAxios.get(`/projects/${id}`,{
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : token
                }
            });
            setProject(data.project)
            
        } catch (error) {
            console.log(error);

            showAlert(error.response ? error.response.data.msg : 'Ups, hubo un error', false)
        }finally{
            setLoading(false)
        }
    }

    const storeProject = async (project) => {

         try {

            const token = sessionStorage.getItem('token')
            if(!token) return null

            if(project.id){

                const {data} = await clientAxios.put(`/projects/${project.id}`, project,{
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization : token
                    }
                });
                const projectsUpdated = projects.map(projectState => {
                    if(projectState._id === data.project._id){
                        return data.project
                    }
                    return projectState
                })

                Toast.fire({
                    icon: 'success',
                    title: data.msg
                })

                setProjects(projectsUpdated)

                
            } else {
                const {data} = await clientAxios.post(`/projects/`, project,{
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization : token
                    }
                });
                setProjects([...projects, data.project])
    
                Toast.fire({
                    icon: 'success',
                    title: data.msg
                })
            }
            navigate('projects')
            
        } catch (error) {
            console.log(error);

            showAlert(error.response ? error.response.data.msg : 'Ups, hubo un error', false)
        }
    }

    const deleteProject = async (id) => {
        try {
            const token = sessionStorage.getItem('token')
            if(!token) return null

            const {data} = await clientAxios.delete(`/projects/${id}`,{
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : token
                }
            });

            const projectsFiltered = projects.filter(project => project._id !== id)

            setProject(projectsFiltered)

            Toast.fire({
                icon: 'success',
                title: data.msg
            })

            navigate('projects')

            
        } catch (error) {
            console.log(error);

            showAlert(error.response ? error.response.data.msg : 'Ups, hubo un error', false)
            
        }
    }
  
    return (
    <ProjectsContext.Provider
    value={{
        projects,
        alert,
        showAlert,
        loading,
        getProjects,
        project,
        getProject,
        storeProject,
        deleteProject
    }}
    >
        {children}

    </ProjectsContext.Provider>
    )
}

export default ProjectsContext
    

