import {Inject, Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize, shareReplay} from 'rxjs/operators';
import {GEOLOCATION} from '../tokens/geolocation';
import {POSITION_OPTIONS} from '../tokens/geolocation-options';

@Injectable({
    providedIn: 'root',
})
export class GeolocationService extends Observable<Position> {
    private watchPositionId = 0;

    constructor(
        @Inject(GEOLOCATION) private readonly geolocationRef: Geolocation,
        @Optional()
        @Inject(POSITION_OPTIONS)
        private readonly positionOptions?: PositionOptions,
    ) {
        super(subscriber => {
            this.watchPositionId = this.geolocationRef.watchPosition(
                position => subscriber.next(position),
                positionError => subscriber.error(positionError),
                this.positionOptions,
            );
        });

        return this.pipe(
            finalize(() => this.clearWatch()),
            shareReplay({bufferSize: 1, refCount: true}),
        ) as GeolocationService;
    }

    clearWatch() {
        this.geolocationRef.clearWatch(this.watchPositionId);
    }
}
