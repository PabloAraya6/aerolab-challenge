const { response } = require('express');
const axios = require('axios');
const { config } = require('../config');
const { formatCategories } = require('../helpers/formatCategories');

const getCategories = async (req, res = response, next) => {
  try {
    const items = await axios.get(config.endpoints.API_CATEGORIES, {
      maxRedirects: 0,
      timeout: 5000,
    });
    const categories = items.data.categories;
    const data = formatCategories(categories);

    res.status(200).json({ categories: data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};
