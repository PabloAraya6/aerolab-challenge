const { response } = require('express');
const axios = require("axios");
const moment = require('moment');
require('dotenv').config();
const { filterByDates } = require('../helpers/filterByDates')

const getProducts = async (req, res = response, next) => {
    try {
        // handle pagination
        const page = req.query.page;

        // get rate of dollar in pesos
        const dollar = await axios.get(process.env.API_DOLLAR);
        const rate = dollar.data.rate;

        // get items 
        const items = await axios.get(`${process.env.API_PRODUCTS}?page=${page}`);
        
        const startDate = moment().utc().subtract(1, 'months').format();
        const endDate = moment().utc().format();
        
        // first filter by date before adding dollar price to old products
        const data = filterByDates(items.data.products, startDate, endDate);

        // conversion to dollar
        data.forEach(element => element.dollarPrice = Math.round((element.price / rate) * 100) / 100);

        res.status(200).json({
            products: data,
            page: items.data.page,
            per_page: items.data.per_page,
            page_count: items.data.page_count
        });
    } catch (error) {
        // passing to default middleware error handler
        next(error) 
    }
}

module.exports = {
    getProducts,
}