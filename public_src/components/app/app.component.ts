import {Component, ViewChild} from '@angular/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';
import {LngLat, Map} from 'mapbox-gl';

@Component({
    selector: 'app',
    template: require<any>('./app.component.html'),
    styles: [
        require<any>('./app.component.less')
    ],
    providers: []
})
export class AppComponent {
    @ViewChild(MarkerComponent) markerComponent: MarkerComponent;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        console.log('howdy');
        if ("geolocation" in navigator) {
            /* geolocation is available */
            console.log("getting location");
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log("getting position");
                console.log(position.coords.latitude + " " + position.coords.longitude);
            },function () { console.log("some error");});
        } else {
            console.log("geolocation is not available");
            /* geolocation IS NOT available */
        }
        console.log("done with geo");

        let map = new Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v9',
            zoom: 5,
            center: [-78.880453, 42.897852]
        });

        this.mapService.map = map;
    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
    }
}
