const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const { config } = require('./config');

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const error = new Error('CORS origin not allowed');
    error.statusCode = 403;

    return callback(error);
  },
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json({ limit: '100kb' }));
app.use('/api/products', require('./routes/products'));
app.use('/api/category_tree', require('./routes/categories'));

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode >= 500 ? 'Internal server error' : err.message;

  return res.status(statusCode).json({ error: message });
});

app.listen(config.port, () => {
  console.log(`Server running in port: ${config.port}`);
});
