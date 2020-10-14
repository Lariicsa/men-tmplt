const joi = require('@hapi/joi');

const contactIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const contactName = joi.string()
const contactPhone = joi.number()
const contactEmail = joi.string().email()
const contactMessage = joi.string().max(300)
const contactSubject = joi.string().max(30)


const createContactSchema = {
  contactname: contactName,
  email: contactEmail,
  phone: contactPhone,
  subject: contactSubject,
  message: contactMessage
}

module.exports = {
  contactIdSchema,
  createContactSchema,
}