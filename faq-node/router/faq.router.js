const express = require('express');
const route = express.Router();
const faqController = require('../controller/faq.controller');
//define middleware
const authMiddleware = require('../middleware/auth.middleware');

route.get('/test',faqController.getData);
route.post('/signIn',faqController.logIn);
route.post('/createFaq',authMiddleware.authVerify,faqController.sendFaq);
route.post('/createFaqAnswer',authMiddleware.authVerify,faqController.sendAnswer);
route.get('/getQuestion',authMiddleware.authVerify,faqController.getFaqQuestion);
route.get('/faq',[authMiddleware.authVerify,authMiddleware.loginVerify],faqController.getData);
route.get('/faq/:id',authMiddleware.authVerify,faqController.viewData);
route.get('/viewAnswer/:id',authMiddleware.authVerify,faqController.viewAnswer);
route.delete('/faq',authMiddleware.authVerify,faqController.deleteData);
route.delete('/faq-question',authMiddleware.authVerify,faqController.deleteQuestion);
route.put('/faq/:id',authMiddleware.authVerify,faqController.updateFaqQuestion);
route.put('/faq-edit-answer/:id',authMiddleware.authVerify,faqController.updateAnswer);
route.put('/faqAnswer/:qid/:id',authMiddleware.authVerify,faqController.updateFaq);
route.put('/edit-answer/:id',authMiddleware.authVerify,faqController.updateAnswer);
route.get('/signOut',authMiddleware.authVerify,authMiddleware.loginVerify,faqController.logOut);
module.exports = route;