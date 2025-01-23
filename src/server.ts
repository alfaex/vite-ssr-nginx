import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, {Router} from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();


app.use('*.*',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('*', (req, res, next) => {

  // console.log("url", req.url);
  // console.log("baseUrl", req.baseUrl);
  // console.log("originalUrl", req.originalUrl);

  const host = req.get('x-forwarded-host');

  if (!host) {
    res.status(400).json({ erro: 'Host not specified' });
    return;
  }

  // need to mantain a list of clients that uses base href
  const bases: Record<string, string> = {
    "potato.local": "",
    "tomato.local": "portal"
  }

  // console.log("BASE", host, bases[host], bases[host] === "");

  angularApp
    .handle(req, {base: `/${bases[host]}/`})
    .then((response) => {

      // test if the client have base href
      // to print the correct base href or the browser will get confused
      response ? writeResponseToNodeResponse(response, res) : next();
     })
    .catch(next);
});

/**
 * nee to do this to all base href
 * Since theres is no way to tell angular that APP_BASE_HREF
 * may be dynamic
 */


/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
