const joi = require('@hapi/joi');

const articleIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const contactBody = joi.string().max(300)



const createArticleSchema = {
  body: contactBody
}

module.exports = {
  articleIdSchema,
  createArticleSchema,
}