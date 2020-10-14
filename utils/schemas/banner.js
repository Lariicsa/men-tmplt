const joi = require('@hapi/joi');

const bannerIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const bannerName = joi.string()
const bannerText = joi.string().max(300)
const bannerImageUrl = joi.string()
const bannerLink = joi.string()


const createBannerSchema = {
  name: bannerName,
  text: bannerText,
  imagePath: bannerImageUrl,
  link: bannerLink
}

const updateBannerSchema = {
  name: bannerName,
  text: bannerText,
  imagePath: bannerImageUrl,
  link: bannerLink
}

module.exports = {
  bannerIdSchema,
  createBannerSchema,
  updateBannerSchema
}