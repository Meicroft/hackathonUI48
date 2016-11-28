/**
 * Created by timfiez on 11/28/16.
 */
import {Component, ViewChild} from '@angular/core';


@Component({
    selector: 'login',
    template: require<any>('./login.component.html'),
    styles: [],
    providers: []
})
export class AppComponent {


    constructor() {
    }

    ngOnInit() {
        console.log('in login');
    }

    ngAfterViewInit() {
    }
}
