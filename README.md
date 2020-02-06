# ![ng-web-apis logo](projects/demo/src/assets/logo.svg) Geolocation API for Angular

> Part of <img src="projects/demo/src/assets/web-api.svg" align="top"> [Web APIs for Angular](https://ng-web-apis.github.io/)

[![npm version](https://img.shields.io/npm/v/@ng-web-apis/geolocation.svg)](https://npmjs.com/package/@ng-web-apis/geolocation)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ng-web-apis/geolocation)
[![Travis (.com)](https://img.shields.io/travis/com/ng-web-apis/geolocation)](https://travis-ci.com/ng-web-apis/geolocation)
[![Coveralls github](https://img.shields.io/coveralls/github/ng-web-apis/geolocation)](https://coveralls.io/github/ng-web-apis/geolocation?branch=master)
[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/TinkoffCreditSystems/angular-open-source-starter)

This is a library for declarative use of [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) with Angular 6+.

Angular does not have any abstractions over [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API). This library provides you simple observable-service to use this API with Angular of 6+ version.

## Install

If you do not have [@ng-web-apis/common](https://github.com/ng-web-apis/common):

```
npm i @ng-web-apis/common
```

Now install the package:

```
npm i @ng-web-apis/geolocation
```

## How to use

### GeolocationService

GeolocationService is an observable, that emits [Position](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition) object

Import service in your component:

```js
import {GeolocationService} from '@ng-web-apis/geolocation';

...
constructor(private readonly geolocationService: GeolocationService) {}
```

Now, to observe user position, you can subscribe to geolocationService:

```js
geolocationService.subscribe(position => doSomethingWithPosition(position));
```

If you need to get position just once and stop observing user location, you can subscribe to geolocationService and use take(1) rxJs operator:

```js
geolocationService.pipe(take(1)).subscribe(position => doSomethingWithPosition(position));
```

Or you can use async pipe to get position directly in template:

```html
<div *ngIf="geolocationService | async as position">
    <span>{{position.coords.latitude}}</span>
</div>
```

When the last subscriber unsubscribes, the service will automatically execute the clearWatch function with the current watchId

## Tokens

The library also provides some tokens to simplify working with Geolocation API:

-   `GEOLOCATION_SUPPORT` returns `true` if user's browser supports Geolocation API

```js
export class YourComponent {
    constructor(
        @Inject(GEOLOCATION_SUPPORT) private readonly geolocationSupport: boolean
    ) {}
    ...
```

-   You can provide `GEOLOCATION_OPTIONS` as an object with optional properties named enableHighAccuracy, timeout and maximumAge. It uses `{}` by default. [More about options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)

```js
@Component({
    ...
    providers: [
        {
            provide: [POSITION_OPTIONS],
            useValue: {
                enableHighAccuracy: true,
                timeout: 3000,
                maximumAge: 1000,
            }
        }
    ]
})
export class YourComponentThatUsesGeolocation {
    ...
}
```

## See also

All [@ng-web-apis](https://ng-web-apis.github.io/) for your apps

## Open-source

Do you also want to open-source something, but hate the collateral work?
Check out this [Angular Open-source Library Starter](https://github.com/TinkoffCreditSystems/angular-open-source-starter)
we’ve created for our projects. It got you covered on continuous integration,
pre-commit checks, linting, versioning + changelog, code coverage and all that jazz.
