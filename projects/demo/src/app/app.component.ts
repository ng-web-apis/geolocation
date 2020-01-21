import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
