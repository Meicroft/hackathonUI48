import {Component, ViewChild} from '@angular/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {MapService} from '../../services/map.service';
import {GeocodingService} from '../../services/geocoding.service';
import {Location} from '../../core/location.class';
import {LngLat, Map} from 'mapbox-gl';
import {QueryDataService} from "../../services/querydata.service";

@Component( {
    selector: 'app',
    template: require<any>('./app.component.html'),
    styles: [
        require<any>('./app.component.less')
    ],
    providers: []
})
export class AppComponent {
    @ViewChild(MarkerComponent) markerComponent: MarkerComponent;
    private map:Map;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
    }

    ngOnInit() {
        let self = this;
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


        this.map = new Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
            center: [-115.1653003692627, 36.132883744079486],
            zoom: 11 // starting zoom
});

        this.mapService.map = this.map;


    this.map.on('load', function() {

    // Add a new source from our GeoJSON data and set the
    // 'cluster' option to true.
    self.map.addSource("trash", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "https://6pruhoed7c.execute-api.us-east-1.amazonaws.com/prod/incidents?eventType=trash",
        // cluster: true,
        // clusterMaxZoom: 15, // Max zoom to cluster points on
        // clusterRadius: 20 // Use small cluster radius for the heatmap look
    });

        self.map.addSource("traffic", {
            type: "geojson",
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: "https://6pruhoed7c.execute-api.us-east-1.amazonaws.com/prod/incidents?eventType=traffic",
             cluster: true,
             clusterMaxZoom: 15, // Max zoom to cluster points on
             clusterRadius: 60 // Use small cluster radius for the heatmap look
        });

        // Use the earthquakes source to create four layers:
    // three for each cluster category, and one for unclustered points

    // Each point range gets a different fill color.
    var layers = [
        [2, 'red'],
        [3, 'red'],
        [10, 'red']
    ];

    layers.forEach(function (layer, i) {
        self.map.addLayer({
            "id": "cluster-" + i,
            "type": "circle",
            "source": "trash",
            "paint": {
                "circle-color": layer[1],
                "circle-radius": 70,
                "circle-blur": 1 // blur the circles to get a heatmap look
            },
            "filter": i === layers.length - 1 ?
                [">=", "point_count", layer[0]] :
                ["all",
                    [">=", "point_count", layer[0]],
                    ["<", "point_count", layers[i + 1][0]]]
        }, 'waterway-label');
    });

    self.map.addLayer({
        "id": "unclustered-points",
        "type": "circle",
        "source": "trash",
        "paint": {
            "circle-color": 'rgba(255,0,0,0.5)',
            "circle-radius": 20,
            "circle-blur": 1
        },
        "filter": ["!=", "cluster", true]
    }, 'waterway-label');
 });

    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
    }

}
