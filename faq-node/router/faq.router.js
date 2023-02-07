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
route.get('/faq',authMiddleware.authVerify,faqController.getData);
module.exports = route;