const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "20e38d99c961bd",
          pass: "7e10e26c5649ff"
        }
      
})

module.exports = {
    confirmRegister : async (data) => {
        const {name, email, token} = data
        try {
            console.log(data);
            await transport.sendMail({
                from: 'Project Manager <email@email.com>',
                to: email,
                subject: 'Confirma tu cuenta',
                text: 'Confirma tu cuenta en Project Manager',
                html: `<p>Hola ${name}, hace click en el siguiente enlace<p/>
                <a href='${process.env.URL_FRONT}/checked/${token}' >Confirma tu cuenta</a>`
            })
        } catch (error) {
            console.log(error);
        }
      

    },
    forgetPassword : async (data) => {
        const {name, email, token} = data
        try {
            console.log(data);
            await transport.sendMail({
                from: 'Project Manager <email@email.com>',
                to: email,
                subject: 'Reestablece tu contraseña',
                text: 'Reestablece tu contraseña en Project Manager',
                html: `<p>Hola ${name}, hace click en el siguiente enlace para
                <a href='${process.env.URL_FRONT}/reset-password/${token}' >reestablecer tu cuenta</a><p/>`
            })
        } catch (error) {
            console.log(error);
        }
      

    }
}