import {InjectionToken} from '@angular/core';

export const POSITION_OPTIONS = new InjectionToken<PositionOptions>(
    'Token for an optional position options',
    {factory: () => ({})},
);
