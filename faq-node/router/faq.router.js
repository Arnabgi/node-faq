const express = require('express');
const route = express.Router();
const faqController = require('../controller/faq.controller');

route.get('/test',faqController.getData);
route.post('/signIn',faqController.logIn);
route.post('/createFaq',faqController.sendFaq);
route.post('/createFaqAnswer',faqController.sendAnswer);

module.exports = route;