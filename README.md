# ![ng-web-apis logo](projects/demo/src/assets/logo.svg) Geolocation API for Angular

> Part of <img src="projects/demo/src/assets/web-api.svg" align="top"> [Web APIs for Angular](https://ng-web-apis.github.io/)

[![npm version](https://img.shields.io/npm/v/@ng-web-apis/geolocation.svg)](https://npmjs.com/package/@ng-web-apis/geolocation)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ng-web-apis/geolocation)
[![Travis (.com)](https://img.shields.io/travis/com/ng-web-apis/geolocation)](https://travis-ci.com/ng-web-apis/geolocation)
[![Coveralls github](https://img.shields.io/coveralls/github/ng-web-apis/geolocation)](https://coveralls.io/github/ng-web-apis/geolocation?branch=master)
[![angular-open-source-starter](https://img.shields.io/badge/made%20with-angular--open--source--starter-d81676?logo=angular)](https://github.com/TinkoffCreditSystems/angular-open-source-starter)

This is an `Observable` based abstraction over [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) to use with Angular

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

`GeolocationService` is an `Observable`, that emits [Position](https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition) object

Import service in your component:

```js
import {GeolocationService} from '@ng-web-apis/geolocation';

...
constructor(private readonly geolocation$: GeolocationService) {}
```

Now, to observe user position, you can subscribe to `geolocation$`:

```js
geolocation$.subscribe(position => doSomethingWithPosition(position));
```

If you need to get position just once and stop observing user location, you can subscribe to `geolocation$` and use `take(1)` RxJs operator:

```js
geolocation$.pipe(take(1)).subscribe(position => doSomethingWithPosition(position));
```

Or you can use async pipe to get position directly in template:

```html
<div *ngIf="geolocation$ | async as position">
    <span>{{position.coords.latitude}}</span>
</div>
```

Service is cold, meaning if there are no active subscriptions, it doesn't track position.

## Tokens

The library also provides some tokens to simplify working with [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API):

-   `GEOLOCATION_SUPPORT` returns `true` if user's browser supports
    [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

```js
export class YourComponent {
    constructor(
        @Inject(GEOLOCATION_SUPPORT) private readonly geolocationSupport: boolean
    ) {}
    ...
```

-   You can provide [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)
    through `POSITION_OPTIONS` token with optional properties named `enableHighAccuracy`, `timeout` and `maximumAge`.
    It uses `{}` by default.

```js
@NgModule({
    ...
  providers: [
        {
            provide: POSITION_OPTIONS,
            useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000},
        },
    ],
})
export class AppModule {}
```

-   [Navigator Geolocation](https://developer.mozilla.org/ru/docs/Web/API/Navigator/geolocation)
    can be injected through `GEOLOCATION` token.

## Demo

You can [try online demo here](https://ng-web-apis.github.io/geolocation)

## See also

Other [Web APIs for Angular](https://ng-web-apis.github.io/) by [@ng-web-apis](https://github.com/ng-web-apis)

## Open-source

Do you also want to open-source something, but hate the collateral work?
Check out this [Angular Open-source Library Starter](https://github.com/TinkoffCreditSystems/angular-open-source-starter)
we’ve created for our projects. It got you covered on continuous integration,
pre-commit checks, linting, versioning + changelog, code coverage and all that jazz.
