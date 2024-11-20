const nodemailer = require('nodemailer');
const userinfo = require('./../models/usermodel');

const  transporter = nodemailer.createTransport(
    {
        secure: true,
        host:'abcevents@gmail.com',
        auth:{
            user:to,
            pass:'bwmqfaqjlphmspsk'
        }
    }
);

function sendMail(to, sub, msg){
    transporter.sendMail({
        to: to,
        subject: sub,
        html:msg
    });
};

exports.mailto = async(req,res) => {
    try {
    const idd = req.params.id;
    const alluser = await userinfo.findById(idd);
    const to = alluser.mail;
    sendMail(to, "EVENT CONFIRMATION MAIL", 
        "Hi ${alluser.name}, This mail is regarding ${alluser.description} on ${alluser.date} at ${alluser.time}. ThankYou");
    
    res.status(200).json({                 
        status:'success', 
        data : {
            alluser
        }});
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

