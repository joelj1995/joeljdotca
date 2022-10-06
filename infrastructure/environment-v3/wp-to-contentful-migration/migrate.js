console.log('Migrating Wordpress content to contentful');

const yargs = require("yargs");
const axios = require("axios");
const contentful = require('contentful-management');

const options = yargs
  .usage('Usage: -w <wp-base-path> -c <contentful-api-key>')
  .option('w', { alias: 'wpbasepath', description: 'Base URL of the source Wordpress instance', type: 'string', demandOption: true })
  .option('c', { alias: 'contentfulapikey', description: 'API key for the destination contentful instance', type: 'string', demandOption: true })
  .argv;

console.log(options.contentfulapikey);

const client = contentful.createClient({
  accessToken: options.contentfulapikey
});

function createContentEntry(entryData) {
  return client.getSpace('jdcejwtspy00').then(space => {
    return space.getEnvironment('master').then(environment => {
      environment.createEntry('post', entryData);
    });
  });
}

function getWordpressPosts() {
  return axios.get(`${options.wpbasepath}/index.php/wp-json/wp/v2/posts`)
    .then(res => {
      return res.data.map(wordpressPostToCfEntry);
    });
}

function wordpressPostToCfEntry(data) {
  return {
    fields: {
      slug: cfField(data.slug),
      legacyWordpressContent: cfField(data.content.rendered),
      title: cfField(data.title.rendered),
      published: cfField(data.date_gmt)
    }
  };
}

function cfField(value) {
  return {'en-US': value };
}

getWordpressPosts()
  .then(posts => {
    console.log(posts);
    posts.forEach(post => {
      createContentEntry(post);
    });
  })