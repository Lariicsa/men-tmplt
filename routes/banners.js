const express = require('express');
const BannerService = require('../services/banner');
const {
  bannerIdSchema,
  createBannerSchema,
  updateBannerSchema
} = require('../utils/schemas/banner')


const validationHandler = require('../utils/middlewares/validationHandler')

function bannerEndpoint(app) {
  const router = express.Router();
  app.use('/banner', router);

  const bannerService = new BannerService();


  router.get('/', async function (req, res, next) {
    try {
      res.status(200)
      res.send('<h2>Banner service is running</h2>')
    } catch (err) {
      res.json({
        error: err
      });
      res.send('<h2>Something is Bad, check console</h2>')
      next(err);
    }
  });

  router.get('/slides', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const slides = await bannerService.getSlides({ tags });
      res.status(200).json({
        data: slides,
        message: 'Slides Listed'
      });
    } catch (err) {
      res.json({
        error: err
      });
      next(err);
    }
  });


  router.post('/slide', validationHandler(createBannerSchema), async function (req, res, next) {
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

  router.put('/slide/:slideId', validationHandler({ slideId: bannerIdSchema }, 'params'), validationHandler(updateBannerSchema), async function (req, res, next) {
    const { slideId } = req.params;
    const { body: slide } = req;

    try {
      const updatedSlideId = await bannerService.updateSlide({
        slideId,
        slide
      });

      res.status(200).json({
        data: updatedSlideId,
        message: 'Slide updated'
      });
    } catch (err) {
      next(err);
    }
  });


}

module.exports = bannerEndpoint;