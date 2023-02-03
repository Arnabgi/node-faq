const model = require('../models');
const faqModel = model.login;
const faq = model.faq;
const faqAns = model.answer;
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize');
module.exports = {
    signIn: async(loginData,token) => {
        try {
            const logData = await faqModel.findOne({
                attributes:['username','password'],
                where:{
                    username : loginData.username,
                    password : loginData.password
                }
            });
            //console.log("logdata.....",logData);
            const passToken = jwt.sign(logData.toJSON(),token);
            //console.log(passToken);
            return passToken;    
        } catch (error) {
            //console.log(error);
            throw error;
        }
    },

    addFaq: async(faqData) => {
        try {
            const fqData = await faq.create(faqData);
            return {
                msg: "Success!"
            }
        } catch (error) {
            throw error;
        }
    },

    addFaqAnswer: async(question_id,faqAnswers) => {
        try {
            faqAnswer = faqAnswers.map((fq) => { 
            return{
                question_id : question_id,
                answers: fq
            }
        });
        await faqAns.bulkCreate(faqAnswer);
        return {
            msg: "Success!"
        }
        } catch (error) {
            throw error;
        }
    }
}