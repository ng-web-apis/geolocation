import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {POSITION_OPTIONS} from '@ng-web-apis/geolocation';
import {HighlightModule, HighlightOptions, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {MapComponent} from './map/map.component';

const highlightOptions: HighlightOptions = {
    coreLibraryLoader: () => import('highlight.js/lib/highlight'),
    languages: {
        less: () => import('highlight.js/lib/languages/less'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        xml: () => import('highlight.js/lib/languages/xml'),
    },
};

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule.withServerTransition({appId: 'demo'}),
        AppRoutingModule,
        HighlightModule,
    ],
    declarations: [AppComponent, MapComponent],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: highlightOptions,
        },
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
        {
            provide: POSITION_OPTIONS,
            useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000},
        },
    ],
})
export class AppBrowserModule {}
