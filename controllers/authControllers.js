let createError = require('http-errors');
const errorResponse = require('../helpers/errorResponse');
const User = require('../database/models/user');
const generatedToken = require('../helpers/generatedToken');
const generatedJsonToken = require('../helpers/generatedJsonToken');
const { confirmRegister, forgetPassword } = require('../helpers/sendMail');


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

            const token = generatedToken();

            user = new User(req.body);
            user.token = token;

           //console.log('-------------------------------', user);


           const userStore = await user.save()

           
           await confirmRegister({
                name:userStore.name,
                email: userStore.email,
                token: userStore.token
           })

            return res.status(201).json({
                ok: true,
                msg: 'Usuario registrado',
                user: userStore
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

            if(!user.checked){
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
        const {token} = req.query;

        try {

            if(!token){
                throw createError(400, 'Token inexistentes');                
            };

            const user = await User.findOne({
                token
            })

            if(!user){
                throw createError(400, 'Token invalido');                
            };

            user.checked = true;
            user.token = ''

            await user.save()

            return res.status(201).json({
                ok: true,
                msg: 'Registro completado exitosamente'
            })
        } catch (error) {
            return errorResponse(res, error, 'Checked')
        }
    },
    sendToken:  async (req, res) => {

        const {email} = req.body
        try {

            let user = await User.findOne({
                email
            })

            if(!user) throw createError(400, 'el email no se encuentra registrado');

            const token = generatedToken();
            user.token = token;
             await user.save()

             //ToDo: Enviar email para reestablecer la contraseña

               
           await forgetPassword({
            name:user.name,
            email: user.email,
            token: user.token
       })
             

            return res.status(200).json({
                ok: true,
                msg: 'Se ha enviado un mail con las instucciones'
            })
        } catch (error) {
            return errorResponse(res, error, 'SendToken')
        }
    },
    verifyToken:  async (req, res) => {
        try {

            const {token} = req.query;

            if(!token) throw createError(400, 'No hay token en la petición')

            const user = await User.findOne({
                token
            })

            if(!user) throw createError(400, 'Token invalido')


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

            const {token} = req.query;

            const {password} = req.body;

            if(!password) throw createError(404, 'El password es obligatorio')

            const user = await User.findOne({
                token
            })

            user.password = password;
            user.token= ''

            user.save()

            return res.status(200).json({
                ok: true,
                msg: 'Password actualizado'
            })
        } catch (error) {
            return errorResponse(res, error, 'ChangePassword')
        }
    }
}