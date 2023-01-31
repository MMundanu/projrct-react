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
                <a href='${process.env.URL_FRONT}/confirm/${token}' >Confirma tu cuenta</a>`
            })
        } catch (error) {
            console.log(error);
        }
      

    }
}