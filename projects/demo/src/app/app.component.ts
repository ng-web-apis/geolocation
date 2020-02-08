import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {SAMPLE} from './samples/sample';

@Component({
    selector: 'main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    position: Position | null = null;
    currentPositionUrl: SafeResourceUrl | null = null;
    toggle = false;
    watchSubscription: Subscription | null = null;
    error: PositionError | null = null;

    sample = SAMPLE;

    constructor(
        private readonly geolocation$: GeolocationService,
        private readonly domSanitizer: DomSanitizer,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {}

    getCurrentPosition() {
        this.geolocation$.pipe(take(1)).subscribe(
            position => {
                this.currentPositionUrl = this.getUrl(position);
                this.changeDetectorRef.markForCheck();
            },
            error => {
                this.error = error;
                this.changeDetectorRef.markForCheck();
            },
        );
    }

    toggleWatch() {
        if (!this.watchSubscription) {
            this.startWatchGeoposition();

            return;
        }

        this.stopWatchGeoposition();
    }

    private startWatchGeoposition() {
        this.watchSubscription = this.geolocation$.subscribe(
            position => {
                this.position = position;
                this.changeDetectorRef.markForCheck();
            },
            error => {
                this.error = error;
                this.changeDetectorRef.markForCheck();
            },
        );
    }

    private stopWatchGeoposition() {
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
    }

    private getUrl(position: Position): SafeResourceUrl {
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
