const MongoLib = require('../lib/mongo');

class ContactsService {

  constructor() {
    this.collection = 'contacts';
    this.mongoDB = new MongoLib();
  }

  async getContacts({tags}) {
    const query = tags && {tags: {$in: tags}}
    const contacts = await this.mongoDB.getAll(this.collection, query)
    return contacts || []
  }

  async createContact({ contact }) {
    const createdContact = await this.mongoDB.create(this.collection, contact);
    return createdContact;
  }
}

module.exports = ContactsService
