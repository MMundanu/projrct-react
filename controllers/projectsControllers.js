const Project = require("../database/models/project");
const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId


module.exports = {
    list : async (req,res) => {
        try {

            const project = await Project.find().where('createdBy').equals(req.user)

            return res.status(200).json({
                ok : true,
                msg :'Lista de Proyectos',
                project: project
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en PROJECTS-LIST'
            })
        }
       
    },
    store : async (req,res) => {
        try {

            const {name, description, client} = req.body

            if([name, description, client].includes("") || !name || !description || !client){
                throw createError(400, 'Todos los datos son obligatorios');                
            }

            if(!req.user) throw createError(401, 'Error en autenticación')

            const project = new Project(req.body)


            project.createdBy = req.user._id

            //console.log(project);

            const projectStore = await project.save()


            return res.status(201).json({
                ok : true,
                msg :'Proyecto guardado',
                project: projectStore
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en STORE-PROJECT'
            })
        }
       
    },
    detail : async (req,res) => {
        try {

            const {id} = req.params;

            if(!ObjectId.isValid(id)) throw createError(400, 'No es un id valido')

            const project = await Project.findById(id)

            if(!project) throw createError(404, 'Proyecto no encontrado');

            if(req.user._id.toString() !== project.createdBy.toString()) throw createError(401, 'Error de autorización')


            return res.status(200).json({
                ok : true,
                msg :'Detalle del Proyecto',
                project
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en PROJECT-DETAIL'
            })
        }
       
    },
    update : async (req,res) => {
        try {

            const {id} = req.params;

            if(!ObjectId.isValid(id)) throw createError(400, 'No es un id valido')

            const project = await Project.findById(id)

            if(!project) throw createError(404, 'Proyecto no encontrado');

            if(req.user._id.toString() !== project.createdBy.toString()) throw createError(401, 'Error de autorización')

            const {name, description, client, dateExpire} = req.body

            project.name = name || project.name;
            project.description = description || project.description;
            project.client = client || project.client;
            project.dateExpire = dateExpire || project.dateExpire;

            const projectUpdate = await project.save()



            return res.status(201).json({
                ok : true,
                msg :'Proyecto actualizado',
                project: projectUpdate
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en PROJECT-UPDATE'
            })
        }
    },
    remove : async (req,res) => {
        try {

            
            const {id} = req.params;

            if(!ObjectId.isValid(id)) throw createError(400, 'No es un id valido')

            const project = await Project.findById(id)

            if(!project) throw createError(404, 'Proyecto no encontrado');

            if(req.user._id.toString() !== project.createdBy.toString()) throw createError(401, 'Error de autorización')

            await project.deleteOne();

            return res.status(200).json({
                ok : true,
                msg :'Proyecto eliminado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en PROJECT-REMOVE'
            })
        }
    },
    addCollaborator : async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg :'Colaborador agregado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en COLLABORATOR-ADD'
            })
        }
    },
    removeCollaborator : async (req,res) => {
        try {
            return res.status(200).json({
                ok : true,
                msg :'Colaborador eliminado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Upss, hubo un error en COLLABORATOR-REMOVE'
            })
        }
    },

}