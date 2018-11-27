const faker = require('faker');
const moment = require('moment');

const articles = [];
const graphData = [];
let i = 0;

function getRandomImage() {
  const min = 200;
  const max = 1084;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

while (i < 20) {
  articles.push({
    id: faker.random.uuid(),
    imageUrl: `https://picsum.photos/300/200/?image=${getRandomImage()}`,
    title: faker.random.word(),
    description: faker.lorem.paragraph(),
    article: faker.lorem.paragraphs(),
  });

  i += 1;

  graphData.push({
    date: moment()
      .subtract(i, 'days')
      .format('ll'),
    like: faker.random.number(),
    view: faker.random.number(),
    share: faker.random.number(),
  });
}

const news = { articles, graphData };
module.exports = news;
