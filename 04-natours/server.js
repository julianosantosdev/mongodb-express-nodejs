const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DBAtlas = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// const DBLocal = process.env.DATABASE_LOCAL;

mongoose
  .connect(DBAtlas, {
    // useNewUrlParser: true, not used anymore
    // useCreateIndex: true, not used anymore
    // useFindAndModify: false, not used anymore
  })
  .then(() => {
    console.log('DB Connection Successfull');
  });

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
