console.log('Migrating Wordpress content to contentful');

const yargs = require("yargs");
const axios = require("axios");
const contentful = require('contentful-management');

const options = yargs
  .usage('Usage: -w <wp-base-path> -c <contentful-api-key>')
  .option('w', { alias: 'wpbasepath', description: 'Base URL of the source Wordpress instance', type: 'string', demandOption: true })
  .option('c', { alias: 'contentfulapikey', description: 'API key for the destination contentful instance', type: 'string', demandOption: true })
  .argv;

const client = contentful.createClient({
  accessToken: options.contentfulapikey
});

function migrateContent(contentType, entryData) {
  return client.getSpace('jdcejwtspy00').then(space => {
    return space.getEnvironment('master').then(environment => {
      environment.createEntry(contentType, entryData);
    });
  });
}

function cfField(value) {
  return { 'en-US': value };
}

function getWordpressPosts() {
  return axios.get(`${options.wpbasepath}/index.php/wp-json/wp/v2/posts`)
    .then(res => {
      return res;
    });
}

function getWordpressPages() {
  return axios.get(`${options.wpbasepath}/index.php/wp-json/wp/v2/pages`)
    .then(res => {
      return res;
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

function migratePosts() {
  getWordpressPosts()
    .then(posts => {
      posts.data.map(wordpressPostToCfEntry).forEach(post => {
        migrateContent('post', post);
      });
    })
}

function wordpressPageToCfEntry(data) {
  return {
    fields: {
      slug: cfField(data.slug),
      legacyWordpressContent: cfField(data.content.rendered),
      title: cfField(data.title.rendered),
    }
  };
}

function migratePages() {
  getWordpressPages()
    .then(pages => {
      pages.data.map(wordpressPageToCfEntry).forEach(page => {
        migrateContent('page', page);
      });
    })
}

migratePages();