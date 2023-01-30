let createError = require('http-errors');
const errorResponse = require('../helpers/errorResponse');
const User = require('../database/models/user');
const generatedToken = require('../helpers/generatedToken');
const generatedJsonToken = require('../helpers/generatedJsonToken');


module.exports = {
    register: async (req, res) => {
        try {

             const {name, email, password} = req.body;
             
    
            if([name, email, password].includes("")){
                throw createError = (400, 'Todos los datos son obligatorios');                
            };

            let user = await User.findOne({
                email
            })


            if(user){
                throw createError = (400, 'El email ya se encuentra registrado');                
            }

            user = new User(req.body);
            user.token = generatedToken();

           //console.log('-------------------------------', user);


           const userStore = await user.save()

           //Enviar el mail de confirmación 

            return res.status(201).json({
                ok: true,
                msg: 'Usuario registrado',
                data: userStore
            })
        } catch (error) {
            return errorResponse(res, error, 'Register')
            }
        },
    login: async (req, res) => {
        try {

            const {name, email, password} = req.body;


            if([name, email].includes("")){
                throw createError(400, 'Todos los datos son obligatorios');                
            };

            let user = await User.findOne({
                email
            })

            if(!user){
                throw createError(404, 'Credenciales invalidas | email');                
            }

            if(!user.cheked){
                throw createError(403, 'Tu cuentano no ha sido confirmada');                
            }

            if(!await user.checkedPassword(password)){
                throw createError(403,"Credenciales inválidas | PASSWORD");
            }
            

            return res.status(201).json({
                ok: true,
                msg: 'Usuario logeado',
                user: {
                    nombre: user.name,
                    email: user.email,
                    token: generatedJsonToken({
                        id: user._id
                    })
                }
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