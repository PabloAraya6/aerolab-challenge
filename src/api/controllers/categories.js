const { response } = require('express');
const axios = require("axios");
require('dotenv').config();
const { formatCategories } = require('../helpers/formatCategories');

const getCategories = async (req, res = response, next) => {
    try {
        const items = await axios.get(process.env.API_CATEGORIES);
        const categories = items.data.categories;
        const data = formatCategories(categories);
        res.status(200).json({ categories: data })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCategories,
}
