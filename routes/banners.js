const express = require('express');
const BannerService = require('../services/banner');
const {
  createBannerSchema
} = require('../utils/schemas/banner')


const validationHandler = require('../utils/middlewares/validationHandler')

function bannerEndpoint(app) {
  const router = express.Router();
  app.use('/banner', router);

  const bannerService = new BannerService();


  router.get('/', async function (req, res, next) {
    try {

      res.status(200)
      res.send('<h2>Otro service</h2>')
    } catch (err) {
      res.json({
        error: err
      });
      res.send('<h2>Something is Bad, check console</h2>')
      next(err);
    }
  });

  // router.get('/api/banner', async function (req, res, next) {
  //   const { tags } = req.query;

  //   try {
  //     const contacts = await BannerService.getContacts({ tags });

  //     res.status(200).json({
  //       data: contacts,
  //       message: 'Contacts Listed'
  //     });
  //   } catch (err) {
  //     res.json({
  //       error: err
  //     });
  //     next(err);
  //   }
  // });


  router.post('/addslide', validationHandler(createBannerSchema), async function (req, res, next) {
    const { body: slide } = req;
    try {
      const createdSlide = await bannerService.createSlide({ slide });
      console.log('slide', slide);


      res.status(201).json({
        data: createdSlide,
        message: 'Slide Addedd'
      });
    } catch (err) {
      console.log('showed error', err);
      res.json({
        error: err
      });
      next(err);
    }
  });


  // router.post('/api/cms', validationHandler(createContactSchema), async function (req, res, next) {

  //   const { body: contact } = req;
  //   try {
  //     const createdContact = await bannerService.createContact({ contact });
  //     console.log('contact', contact);

  //     res.status(201).json({
  //       data: createdContact,
  //       message: 'Contact info Sent'
  //     });
  //   } catch (err) {
  //     console.log('showed error', err);
  //     res.json({
  //       error: err
  //     });
  //     next(err);
  //   }


  // });

}

module.exports = bannerEndpoint;