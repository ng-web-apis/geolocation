export const SAMPLE = `import {GeolocationService} from '@ng-web-apis/geolocation';

// ...

constructor(private readonly geolocation$: GeolocationService) {}

getPosition() {
       geolocation$.pipe(take(1)).subscribe(position => 
        doSomethingWithPosition(position));
   }`;
