import {NgModule} from '@angular/core';
import {WatchPositionDirective} from './directives/watchPosition.directive';

@NgModule({
    declarations: [WatchPositionDirective],
    exports: [WatchPositionDirective],
})
export class GeolocationModule {}
