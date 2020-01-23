import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {GeolocationService, WatchPositionDirective} from '@ng-web-apis/geolocation';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [WatchPositionDirective],
})
export class AppComponent {
    positions: Position | null = null;
    currentPositionUrl: SafeResourceUrl | null = null;
    toggle = false;

    constructor(
        private readonly geolocationService: GeolocationService,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly domSanitizer: DomSanitizer,
    ) {}

    getCurrentPosition() {
        this.geolocationService.getCurrentPosition().then(position => {
            this.positions = position;
            this.changeDetectorRef.markForCheck();
        });
    }

    getUrl(position: Position) {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;

        this.currentPositionUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
            `//www.openstreetmap.org/export/embed.html?bbox=${longitude -
                0.02},${latitude - 0.02},${longitude + 0.02},${latitude + 0.02}&marker=${
                position.coords.latitude
            },${position.coords.longitude}&layer=mapnik`,
        );
    }

    toggleMap() {
        this.toggle = !this.toggle;
    }
}
