import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit {
    positions: Position | null = null;
    currentPositionUrl: SafeResourceUrl | null = null;
    toggle = false;
    constantSubsription: Subscription | null = null;

    constructor(
        private readonly geolocationService: GeolocationService,
        private readonly domSanitizer: DomSanitizer,
    ) {}

    getCurrentPosition() {
        this.geolocationService.pipe(take(1)).subscribe();
    }

    ngOnInit() {
        this.constantSubsription = this.geolocationService.subscribe();
    }

    kill() {
        if (this.constantSubsription) {
            this.constantSubsription.unsubscribe();
        }
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
}
