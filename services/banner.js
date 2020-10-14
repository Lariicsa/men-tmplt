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

  async createSlide({ contact }) {
    const createdSlide = await this.mongoDB.create(this.collection, slide);
    return createdSlide;
  }
}

module.exports = BannerService
