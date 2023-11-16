import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';


const appInsights = require('applicationinsights');
const fs = require('fs');
const path = require('path');
const os = require('os');

const version = fs
  .readFileSync(path.join(join(process.cwd(), 'dist/blogapp/browser/assets'), 'version.txt'))
  .toString().trim();


const resOrigin = `${os.hostname()} ${process.cwd()} ${version}`;

if (process.env['APPLICATIONINSIGHTS_CONNECTION_STRING']) {
  appInsights.setup()
    .start();
  appInsights.defaultClient.commonProperties = {
    node: os.hostname(),
    slot: process.cwd(),
    version: version
  };
  appInsights.defaultClient.config.maxBatchIntervalMs = 100;
  console.log('Azure monitor configured');
} else {
  console.log('Application insights not configured.');
};

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/blogapp/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use((req, res, next) => {
    res.setHeader('X-Origin-Node', resOrigin);
    res.cookie('originnode', resOrigin, { httpOnly: false });
    next();
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';