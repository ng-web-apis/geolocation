import {inject, InjectionToken} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';

export const GEOLOCATION_SUPPORT = new InjectionToken<boolean>(
    'Is Geolocation Api supported?',
    {
        factory: () => {
            const window = inject(WINDOW);

            return (
                window !== null && !!window.navigator && !!window.navigator.geolocation
            );
        },
    },
);
