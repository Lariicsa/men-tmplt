const MongoLib = require('../lib/mongo');

class BannerService {

  constructor() {
    this.collection = 'slides';
    this.mongoDB = new MongoLib();
  }

  async getSlides({tags}) {
    const query = tags && {tags: {$in: tags}}
    const slides = await this.mongoDB.getAll(this.collection, query)
    return slides || []
  }

  async getSlide({ slideId }) {
    const slide = await this.mongoDB.get(this.collection, slideId);
    return slide || {};
  }

  async createSlide({ slide }) {
    const createdSlide = await this.mongoDB.create(this.collection, slide);
    return createdSlide;
  }

  async updateSlide({slideId, slide}) {
    const updatedSlideId = await this.mongoDB.update(this.collection, slideId, slide)
    return updatedSlideId || {}
  }

  async deleteSlide({ slideId }) {
    const deletedSlideId = await this.mongoDB.delete(this.collection, slideId);
    return deletedSlideId;
  }
}

module.exports = BannerService
