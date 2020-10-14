const express = require('express');

const BannerService = require('./banners');
const contactsApi = require('./contacts');

module.exports = { BannerService, contactsApi };