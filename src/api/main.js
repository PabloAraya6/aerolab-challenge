const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.static('public'));
app.use(express.json());
app.use('/api/products', require('./routes/products'));
app.use('/api/category_tree', require('./routes/categories'));
app.listen(process.env.PORT, () => {
  console.log(`Server running in port: ${process.env.PORT}`);
});

