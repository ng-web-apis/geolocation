import {Inject, Injectable, Optional} from '@angular/core';
import {NAVIGATOR} from '@ng-web-apis/common';
import {POSITION_OPTIONS} from '../tokens/geolocation-options';

@Injectable({
    providedIn: 'root',
})
export class GeolocationService {
    constructor(
        @Inject(NAVIGATOR) private readonly navigatorRef: Navigator,
        @Optional()
        @Inject(POSITION_OPTIONS)
        private readonly positionOptions: PositionOptions,
    ) {}

    getCurrentPosition(
        options: PositionOptions = this.positionOptions,
    ): Promise<Position> {
        return new Promise((resolve, reject) => {
            this.navigatorRef.geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                options,
            );
        });
    }
}
