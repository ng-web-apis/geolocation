import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    positions: Position | null = null;
    currentPositionUrl: SafeResourceUrl | null = null;
    toggle = false;
    watchSubscription: Subscription | null = null;

    constructor(
        private readonly geolocationService: GeolocationService,
        private readonly domSanitizer: DomSanitizer,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {}

    getCurrentPosition() {
        this.geolocationService.pipe(take(1)).subscribe(position => {
            this.currentPositionUrl = this.getUrl(position);
            this.changeDetectorRef.markForCheck();
        });
    }

    toggleWatch() {
        !this.watchSubscription
            ? this.startWatchGeoposition()
            : this.stopWatchGeoposition();
    }

    startWatchGeoposition() {
        this.watchSubscription = this.geolocationService.subscribe(position => {
            this.positions = position;
            this.changeDetectorRef.markForCheck();
        });
    }

    stopWatchGeoposition() {
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
    }

    getUrl(position: Position): SafeResourceUrl {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;

        return this.domSanitizer.bypassSecurityTrustResourceUrl(
            `//www.openstreetmap.org/export/embed.html?bbox=${longitude -
                0.005},${latitude - 0.005},${longitude + 0.005},${latitude +
                0.005}&marker=${position.coords.latitude},${
                position.coords.longitude
            }&layer=mapnik`,
        );
    }
}
