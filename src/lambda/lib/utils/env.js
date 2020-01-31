require('dotenv').config({
  path: `.env.${process.env.CONTEXT === 'production' ? 'production' : 'development'}`,
});

const env = {
  FAUNADB_SERVER_SECRET: process.env.FAUNADB_SERVER_SECRET,
};

export default env;
