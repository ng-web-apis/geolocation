import {Directive, Inject, Input, OnDestroy, Optional, Output} from '@angular/core';
import {NAVIGATOR} from '@ng-web-apis/common';
import {Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {POSITION_OPTIONS} from '../tokens/geolocation-options';

@Directive({
    selector: '[WaWatchPosition]',
})
export class WatchPositionDirective implements OnDestroy {
    private readonly positionChanged$ = new Subject<Position>();

    private readonly watchPositionId: number = 0;

    @Input()
    readonly options: PositionOptions | undefined = undefined;

    @Output()
    readonly position = this.positionChanged$.pipe(
        distinctUntilChanged(
            (previous, current) =>
                previous.coords.latitude === current.coords.latitude &&
                previous.coords.longitude === current.coords.longitude,
        ),
    );

    constructor(
        @Inject(NAVIGATOR) private readonly navigatorRef: Navigator,
        @Optional()
        @Inject(POSITION_OPTIONS)
        private readonly positionOptions: PositionOptions,
    ) {
        this.watchPositionId = this.navigatorRef.geolocation.watchPosition(
            position => this.positionChanged$.next(position),
            error => this.positionChanged$.error(error),
            this.options || this.positionOptions,
        );
    }

    ngOnDestroy() {
        this.navigatorRef.geolocation.clearWatch(this.watchPositionId);
    }
}
