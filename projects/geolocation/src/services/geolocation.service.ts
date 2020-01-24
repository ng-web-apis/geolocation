import {Inject, Injectable, Optional} from '@angular/core';
import {NAVIGATOR} from '@ng-web-apis/common';
import {Observable} from 'rxjs';
import {POSITION_OPTIONS} from '../tokens/geolocation-options';

@Injectable({
    providedIn: 'root',
})
export class GeolocationService extends Observable<Position> {
    private watchPositionId = 0;

    constructor(
        @Inject(NAVIGATOR) private readonly navigatorRef: Navigator,
        @Optional()
        @Inject(POSITION_OPTIONS)
        private readonly positionOptions: PositionOptions,
    ) {
        super(subscriber => {
            this.watchPositionId = this.navigatorRef.geolocation.watchPosition(
                position => subscriber.next(position),
                positionError => subscriber.error(positionError),
                this.positionOptions,
            );
        });
    }

    clearWatch() {
        this.navigatorRef.geolocation.clearWatch(this.watchPositionId);
    }
}
