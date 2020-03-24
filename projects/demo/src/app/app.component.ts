import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {SAMPLE} from './samples/sample';
import {SAMPLE_ASYNC} from './samples/sample-async';

@Component({
    selector: 'main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    position: Position | null = null;
    toggle = false;
    currentPositionUrl: SafeResourceUrl | null = null;
    watchSubscription: Subscription | null = null;
    error: PositionError | null = null;

    readonly sample = SAMPLE;
    readonly sampleAsync = SAMPLE_ASYNC;

    constructor(
        readonly geolocation$: GeolocationService,
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
        this.toggle = !this.toggle;
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
