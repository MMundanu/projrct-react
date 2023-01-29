let createError = require('http-errors');
const errorResponse = require('../helpers/errorResponse');


module.exports = {
    register: async (req, res) => {
        try {

             const {name, email, password} = req.body;
             
    
            if([name, email, password].includes("")){
                throw createError = (400, 'Todos los datos son obligatorios');                
            };

            return res.status(201).json({
                ok: true,
                msg: 'Usuario registrado'
            })
        } catch (error) {
            return errorResponse(res, error, 'Register')
            }
        },
    login: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Usuario logeado'
            })
        } catch (error) {
            return errorResponse(res, error, 'Login')
        }
    },
    checked:  async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Usuario checkeado'
            })
        } catch (error) {
            return errorResponse(res, error, 'Checked')
        }
    },
    sendToken:  async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Token enviado'
            })
        } catch (error) {
            return errorResponse(res, error, 'SendToken')
        }
    },
    verifyToken:  async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Token verificado'
            })
        } catch (error) {
            return errorResponse(res, error, 'VerifyToken')
        }
    },
    changePassword:  async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Password actualizado'
            })
        } catch (error) {
            return errorResponse(res, error, 'ChangePassword')
        }
    }
}