import 'zone.js/dist/zone-node';

import {APP_BASE_HREF} from '@angular/common';
import {enableProdMode} from '@angular/core';
import {ngExpressEngine} from '@nguniversal/express-engine';
import * as express from 'express';
import {existsSync} from 'fs';
import {join} from 'path';

import {AppServerModule} from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    enableProdMode();

    const server = express();
    const distFolder = join(process.cwd(), 'dist/demo/browser');
    const indexHtml = existsSync(join(distFolder, 'index.original.html'))
        ? 'index.original.html'
        : 'index';

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine(
        'html',
        ngExpressEngine({
            bootstrap: AppServerModule,
        }),
    );

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(distFolder, {
            maxAge: '1y',
        }),
    );

    // All regular routes use the Universal engine
    server.get('*', (req, res) => {
        // Add information on current browser and location
        addToGlobal(
            'location',
            new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`),
        );
        addToGlobal('navigator', {userAgent: req.get('user-agent')});

        res.render(indexHtml, {
            req,
            providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}],
        });

        function addToGlobal(key: string, value: any) {
            (global as any)[key] = value;
        }
    });

    return server;
}

function run(): void {
    const port = process.env.PORT || 4000;

    // Start up the Node server
    const server = app();

    server.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;

const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';

if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';

/**
 * Workaround for the issue with ngx-highlightjs@5.0.0 not working in SSR mode.
 * Latest version potentially works with it (need to be verified). However,
 * version 5.0.0 seems to be most appropriate to use with ng v12.
 */
if (!global['requestAnimationFrame']) {
    global['requestAnimationFrame'] = (callback: any): any => {
        let lastTime = 0;
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = setTimeout(() => {
            callback(currTime + timeToCall);
        }, timeToCall);

        lastTime = currTime + timeToCall;

        return id;
    };

    // tslint:disable-next-line:arrow-parens
    global['cancelAnimationFrame'] = id => {
        clearTimeout(id);
    };
}
