const createError = require('http-errors');


module.exports = {
    register: async (req, res) => {
        try {

             //const {name, email, password} = req.body;

            const form = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            if([form.name, form.email, form.password].includes("")){
                throw createError = (400, 'Todos ls datos son obligatorios');                
            };

            return res.status(201).json({
                ok: true,
                msg: 'Usuario registrado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error'
            })
        }
    },
    login: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Usuario logeado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error'
            })
        }
    },
    checked:  async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Usuario checkeado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error'
            })
        }
    },
    sendToken:  async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Token enviado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error'
            })
        }
    },
    verifyToken:  async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Token verificado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error'
            })
        }
    },
    changePassword:  async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Password actualizado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error'
            })
        }
    }
}