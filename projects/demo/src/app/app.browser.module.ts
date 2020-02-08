import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HighlightLanguage, HighlightModule} from 'ngx-highlightjs';
import {POSITION_OPTIONS} from 'projects/geolocation/src/tokens/geolocation-options';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {MapComponent} from './map/map.component';

const less = require('highlight.js/lib/languages/less');
const typescript = require('highlight.js/lib/languages/typescript');
const xml = require('highlight.js/lib/languages/xml');

export function hljsLanguages(): ReadonlyArray<HighlightLanguage> {
    return [
        {name: 'typescript', func: typescript},
        {name: 'less', func: less},
        {name: 'xml', func: xml},
    ];
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule.withServerTransition({appId: 'demo'}),
        AppRoutingModule,
        HighlightModule.forRoot({
            languages: hljsLanguages,
        }),
    ],
    declarations: [AppComponent, MapComponent],
    providers: [
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
