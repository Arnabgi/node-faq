const faqService = require("../service/faq.service");

module.exports ={
     getData: async(req,res) => {
        try {
            res.send("Hello World!");    
        } catch (error) {
            res.send(error);
        }
     },

     logIn: async(req,res) => {
        let token = process.env.JWT_SECRET_KEY;
        try {
            //console.log(req.body);
            let logData = {
                username: req.body.username,
                password: req.body.password
            };
            let loginData = await faqService.signIn(logData,token);
            res.json({
                    status : 200, 
                    message : "Login Success",
                    data : loginData
                });
        } catch (error) {
            //console.log("error...",error);
            res.send(error);
        }
    },

    sendFaq: async(req,res) => {
        try {
            let faqData = {
                question: req.body.question,
            }
            let faq = await faqService.addFaq(faqData);
            res.json({
                status: 200,
                message: faq.msg, 
                data: faq.questionDetails
            });   
        } catch (error) {
            res.send(error);
        }
    },

    sendAnswer: async(req,res) => {
        try {
            let faqAnswers = [];
            const question_id = req.body.questionId;
            faqAnswers = req.body.answers;			
            let faq = await faqService.addFaqAnswer(question_id,faqAnswers);
            res.json({
                status: 200,
                message: faq.msg,
            })
        } catch (error) {
            console.log("error...",error);
            res.send(error);
        }
    },
    
    getFaqQuestion: async(req,res) => {
        try {
            const getQuestion = await faqService.getFaqQuestion();
            res.json({
                status: 200,
                data: getQuestion
            })
        } catch (error) {
            res.send(error)
        }
    },

    getData: async(req,res) => {
        try {
            const faqData = await faqService.getData();
            res.json({
                status: 200,
                data: faqData
            })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    deleteData: async(req,res) => {
        try {
            const faqId = {
                id : req.body.id,
                questionId: req.body.questionId
            };
            const deleteFaq = await faqService.deleteData(faqId);
            res.json({
                status: 200,
                msg: "success"
                //msg: deleteFaq.msg
            })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}