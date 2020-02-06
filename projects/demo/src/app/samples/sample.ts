export const SAMPLE = `import {GeolocationService} from '@ng-web-apis/geolocation';

// ...

constructor(private readonly geolocationService: GeolocationService) {}

getLocation() {
       geolocationService.subscribe(position => 
        doSomethingWithPosition(position));
   }`;
