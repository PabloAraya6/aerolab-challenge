const { response } = require('express');
const axios = require('axios');
const moment = require('moment');
const { config } = require('../config');
const { filterByDates } = require('../helpers/filterByDates');

const parsePage = (value) => {
  if (value === undefined) {
    return 1;
  }

  const page = Number.parseInt(value, 10);

  if (!Number.isInteger(page) || page < 1 || page > 1000 || `${page}` !== `${value}`) {
    const error = new Error('page must be an integer between 1 and 1000');
    error.statusCode = 400;
    throw error;
  }

  return page;
};

const getProducts = async (req, res = response, next) => {
  try {
    const page = parsePage(req.query.page);

    const dollar = await axios.get(config.endpoints.API_DOLLAR, {
      maxRedirects: 0,
      timeout: 5000,
    });
    const rate = dollar.data.rate;

    const productsUrl = new URL(config.endpoints.API_PRODUCTS);
    productsUrl.searchParams.set('page', page);

    const items = await axios.get(productsUrl.toString(), {
      maxRedirects: 0,
      timeout: 5000,
    });

    const startDate = moment().utc().subtract(1, 'months').format();
    const endDate = moment().utc().format();

    const data = filterByDates(items.data.products, startDate, endDate);

    data.forEach((element) => {
      element.dollarPrice = Math.round((element.price / rate) * 100) / 100;
    });

    res.status(200).json({
      products: data,
      page: items.data.page,
      per_page: items.data.per_page,
      page_count: items.data.page_count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
};
