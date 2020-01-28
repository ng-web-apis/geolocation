import {TestBed} from '@angular/core/testing';
import {interval} from 'rxjs';
import {skip, take} from 'rxjs/operators';
import {GEOLOCATION} from '../tokens/geolocation';
import {GeolocationService} from './geolocation.service';

describe('Geolocation service', () => {
    let service: GeolocationService;
    let clearWatchCount: number;

    class FakeGeolocation {
        watchPosition(success: Function) {
            interval(300).subscribe(number => success(number.toString()));
        }

        clearWatch() {
            clearWatchCount++;
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: GEOLOCATION, useClass: FakeGeolocation},
                GeolocationService,
            ],
        });

        service = TestBed.get(GeolocationService);
        clearWatchCount = 0;
    });

    it('Gives a position', done => {
        service.pipe(take(1)).subscribe(position => {
            expect(position).toMatch('0');
            done();
        });
    });

    it('Provides position from cache if other subscriptions exist', done => {
        let firstPosition: Position;

        service.subscribe(position => {
            firstPosition = position;
        });

        service.pipe(skip(2), take(1)).subscribe(position => {
            expect(position).toEqual(firstPosition);
            done();
        });
    });

    it('clearWatch method is called once when all subscribers are unsubscribed.', () => {
        const firstSubscription = service.subscribe();

        const secondSubscription = service.subscribe();

        firstSubscription.unsubscribe();
        secondSubscription.unsubscribe();

        expect(clearWatchCount).toEqual(1);
    });

    it('clearWatch method is not called if none of the subscribers unsubscribed', () => {
        service.subscribe();
        service.subscribe();

        expect(clearWatchCount).toEqual(0);
    });
});
