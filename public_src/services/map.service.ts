import {Injectable} from '@angular/core';
import {Location} from '../core/location.class';
import * as mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';

@Injectable()
export class MapService {
    map: Map;
    baseMaps: any;

    constructor() {

        (mapboxgl as any).accessToken = 'pk.eyJ1IjoidGltZmlleiIsImEiOiJKV1lsVXVzIn0.BirEP_e4_o1mLJarrgdVaA';


        this.baseMaps = [
            { name: 'Street', id: 'street' },
            { name: 'Bright', id: 'bright' },
            { name: 'Light', id: 'light' },
            { name: 'Satellite', id: 'satellite' }
        ];
    }

}
