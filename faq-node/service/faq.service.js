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
                questionDetails: fqData,
                msg: "Success!"
            }
        } catch (error) {
            throw error;
        }
    },

    updateFaqQuestion : async(id,value)=>{
        try {
            let updateQuestionData = await faq.update(value,{
                where : {
                    id : id
                }
            });
            return {
                questionDetails: updateQuestionData,
                msg: "Question Updated Successfully!"
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
    },

    updateFaqAnswer : async(qid,id,faqAnswers)=>{
        try {
            let updateAnswerData = await faqAns.update(faqAnswers,{
                where : {
                    question_id: qid,
                    id: id
                }
            });
            return {
                answerDetails: updateAnswerData,
                msg: "Faq Updated Successfully!"
            }
        } catch (error) {
            throw error;            
        }
    },

    updateAnswer : async(id,answer) => {
        try {
            let updateAnswer = await faqAns.update(answer,{
                where : {
                    id: id
                }
            });
            console.log("updateAnswer..........",updateAnswer);
            return {
                answerDetails: updateAnswer,
                msg: "Answer Updated Successfully!"
            }
        } catch (error) {
            throw error;  
        }
    },

    getFaqQuestion: async() => {
        try {
            const getFaqQuestion = await faq.findAll();
            return getFaqQuestion;
        } catch (error) {
            throw error;
        }
    },

    getData: async() => {
        try {
            // const qid = await faqAns.findAll({
            //     attributes: ['question_id']
            // });
    
            const faqData = await faq.findAll({
                include:[{
                    model: faqAns,
                    // required: true
                    // where:{
                    //     id: qid
                    // }
                }],
                // logging: console.log
            });
            return faqData;
        } catch (error) {
            console.log(error);
            throw error;
        }    
    },

    deleteData: async(faqId) => {
        try {
            console.log("faqId..........",faqId);
            const countData = await faqAns.findAndCountAll({
                where:{
                    'question_id': faqId.id
                }
            });
            
            //console.log("countData...........",countData);return;
            if(countData.count == 1){
                const dataDelete = await faq.destroy({
                    where:{
                        id: faqId.id
                    }
                });
                if(dataDelete){
                    await faqAns.destroy({
                        where:{
                            id: faqId.questionId
                        }
                    });
                }
            }
            else{
                await faqAns.destroy({         
                    where:{
                        id: faqId.questionId
                    }
                });
            }
            return {
                msg: "Deleted Successfully!"
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    deleteQuestion: async(qId) =>{
        try {
            const deleteQuestion = await faq.destroy({
                where:{
                    id: qId.id
                }
            });
            if(deleteQuestion){
                await faqAns.destroy({
                    where:{
                        question_id: qId.id
                    }
                })
            }
            return {
                msg: "Deleted Successfully!"
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    viewData: async(faqId) =>{
        try {
            const fetchData = await faq.findAll({
                where:{
                    id:faqId
                },
                include:[{
                    model: faqAns,
                }]
            });
        return fetchData;   
        } catch (error) {
            throw error;
        }
    },

    viewAnswer: async(id) => {
        try {
            const fetchData = await faqAns.findAll({
                where:{
                    id:id
                }
            });
        return fetchData;
        } catch (error) {
            throw error;
        }
    },

    logOut: async(username) =>{
        // try {
        //     const logOut = await login.findOne({
        //         where: {
        //             username: req.username,
        //             is_login: 1
        //         } 
        //     })
        // } catch (error) {
        //     throw error;
        // }
    }
}