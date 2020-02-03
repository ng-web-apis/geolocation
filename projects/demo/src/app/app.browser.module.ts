import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {POSITION_OPTIONS} from 'projects/geolocation/src/tokens/geolocation-options';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {MapComponent} from './map/map.component';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        FormsModule,
        BrowserModule.withServerTransition({appId: 'demo'}),
        AppRoutingModule,
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
