import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactUsModule, ContactUsService, ContactUsComponent } from 'wineos-contactus';
import * as $ from "jquery";

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.styl'],
	providers: [ ContactUsComponent, ContactUsService ],
	encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {
	constructor() { }

	ngOnInit() {
		$('#userComment').css('height','50px', 'background' , 'unset');
	}

}
