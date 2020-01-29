import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.less'],
})
export class MapComponent {
    @Input()
    set coordinatesChange(coords: Coordinates) {
        this.transformCoords(coords);
    }
    coords: Coordinates | null = null;

    initialCoords: Coordinates | null = null;

    markerTransform$ = new BehaviorSubject<SafeStyle>('translate(0px,0px)');

    constructor(private readonly domSanitizer: DomSanitizer) {}

    transformCoords(coords: Coordinates) {
        if (!this.initialCoords) {
            this.initialCoords = coords;

            return;
        }

        this.coordsToStyle(coords);
    }

    coordsToStyle(coordinates: Coordinates) {
        const deltaX =
            (this.initialCoords &&
                this.initialCoords.longitude + coordinates.longitude)! * 10000;
        const deltaY =
            (this.initialCoords && this.initialCoords.latitude + coordinates.latitude)! *
            10000;
        const style = `translate(${deltaX}px,${deltaY}px)`;

        const safestyle = this.domSanitizer.bypassSecurityTrustStyle(style);

        this.markerTransform$.next(safestyle);
    }
}
