const fs = require('fs');
const superagent = require('superagent');

/* ------------------------------ CALLBACK HELL ----------------------------- */
/* fs.readFile(`${__dirname}/dog.txt`, (error, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((error, response) => {
      if (error) return console.log(error.message);
      console.log(response.body.message);
      fs.writeFile('dog-img.txt', response.body.message, (error) => {
        console.log('Random dog image saved to file!');
      });
    });
}); */

/* ------------------------------ USING 'THEN' ------------------------------ */
/* fs.readFile(`${__dirname}/dog.txt`, (error, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((response) => {
      console.log(response.body.message);
      fs.writeFile('dog-img.txt', response.body.message, (error) => {
        console.log('Random dog image saved to file!');
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}); */

/* ------------------------ USING PROMISES (BEST WAY) ----------------------- */
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject('I could not find that file...😢');
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      if (error) reject('Could not write file 😢');
      resolve('success!');
    });
  });
};

readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((response) => {
    console.log(response.body.message);
    return writeFilePromise('dog-img.txt', response.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch((error) => {
    console.log(error.message);
  });
