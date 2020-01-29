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
    set coordinatesChange(position: Position) {
        this.transformCoords(position);
    }
    coords: Coordinates | null = null;

    initialPosition: Position | null = null;

    markerTransform$ = new BehaviorSubject<SafeStyle>('translate(0px,0px)');

    constructor(private readonly domSanitizer: DomSanitizer) {}

    transformCoords(position: Position) {
        if (!this.initialPosition) {
            this.initialPosition = position;

            return;
        }

        this.coordsToStyle(position);
    }

    coordsToStyle(position: Position) {
        const deltaX =
            (this.initialPosition &&
                this.initialPosition.coords.longitude - position.coords.longitude)! *
            10000;

        const deltaY =
            (this.initialPosition &&
                this.initialPosition.coords.latitude - position.coords.latitude)! * 10000;

        const style = `translate(${deltaX}px,${deltaY}px)`;

        const safestyle = this.domSanitizer.bypassSecurityTrustStyle(style);

        this.markerTransform$.next(safestyle);
    }
}
