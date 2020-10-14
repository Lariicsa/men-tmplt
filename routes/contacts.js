const express = require('express');
const ContactsService = require('../services/contacts');
const {
  createContactSchema
} = require('../utils/schemas/contact')

const transport = require("../config/sendMail");

const validationHandler = require('../utils/middlewares/validationHandler')

function contactsApi(app) {
  const router = express.Router();
  app.use('/', router);

  const contactsService = new ContactsService();

  router.get('/', async function (req, res, next) {
    try {

      res.status(200)
      res.send('<h2>FANTADMIN API IS RUNNING</h2>')
    } catch (err) {
      res.json({
        error: err
      });
      res.send('<h2>Something is Bad, check console</h2>')
      next(err);
    }
  });

  router.get('/api/contacts', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const contacts = await contactsService.getContacts({ tags });

      res.status(200).json({
        data: contacts,
        message: 'Contacts Listed'
      });
    } catch (err) {
      res.json({
        error: err
      });
      next(err);
    }
  });


  router.post('/api/contacts', validationHandler(createContactSchema), async function (req, res, next) {
    const { body: contact } = req;
    try {
      const createdContact = await contactsService.createContact({ contact });
      console.log('contact', contact);


      res.status(201).json({
        data: createdContact,
        message: 'Contact info Sent'
      });
    } catch (err) {
      console.log('showed error', err);
      res.json({
        error: err
      });
      next(err);
    }
  });


  router.post('/api/cms', validationHandler(createContactSchema), async function (req, res, next) {
  
    const { body: contact } = req;
    try {
      const createdContact = await contactsService.createContact({ contact });
      console.log('contact', contact);

      res.status(201).json({
        data: createdContact,
        message: 'Contact info Sent'
      });
    } catch (err) {
      console.log('showed error', err);
      res.json({
        error: err
      });
      next(err);
    }


  });

}

module.exports = contactsApi;