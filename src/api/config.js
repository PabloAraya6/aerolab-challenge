const REQUIRED_ENV_VARS = ['API_PRODUCTS', 'API_DOLLAR', 'API_CATEGORIES'];
const DEFAULT_PORT = 3000;
const ALLOWED_EXTERNAL_HOSTS = new Set(['challenge-api.aerolab.co']);

const parsePort = (value) => {
  const port = Number.parseInt(value || `${DEFAULT_PORT}`, 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return port;
};

const parseExternalUrl = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(value);
  } catch (error) {
    throw new Error(`${name} must be a valid URL`);
  }

  if (parsedUrl.protocol !== 'https:') {
    throw new Error(`${name} must use HTTPS`);
  }

  if (!ALLOWED_EXTERNAL_HOSTS.has(parsedUrl.hostname)) {
    throw new Error(`${name} must target an allowed Aerolab API host`);
  }

  return parsedUrl.toString();
};

const parseAllowedOrigins = (value) => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => {
      try {
        return new URL(origin).origin;
      } catch (error) {
        throw new Error(`Invalid CORS origin: ${origin}`);
      }
    });
};

const config = {
  port: parsePort(process.env.PORT),
  allowedOrigins: parseAllowedOrigins(process.env.ALLOWED_ORIGINS),
  endpoints: REQUIRED_ENV_VARS.reduce((acc, name) => {
    acc[name] = parseExternalUrl(name);
    return acc;
  }, {}),
};

module.exports = { config };
