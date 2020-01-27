import {inject, InjectionToken} from '@angular/core';
import {NAVIGATOR} from '@ng-web-apis/common';

export const GEOLOCATION = new InjectionToken<Geolocation>(
    'An abstract over window.navigator.geolocation object',
    {
        factory: () => inject(NAVIGATOR).geolocation,
    },
);
