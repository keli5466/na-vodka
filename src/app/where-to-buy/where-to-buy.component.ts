import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from "jquery";


@Component({
	selector: 'app-where-to-buy',
	templateUrl: './where-to-buy.component.html',
	styleUrls: ['./where-to-buy.component.styl'],
	encapsulation: ViewEncapsulation.None
})
export class WhereToBuyComponent implements OnInit {

	constructor() { }

	ngOnInit() {

	}
	ngAfterViewChecked() {
		// makes map item active on sidebar
		let listItems = $(".listing_item")
		listItems.on("click", function() {
			listItems.removeClass('active')
			$(this).addClass('active')
		})
		// makes button active for mobile
		let mapItems = $(".map_btn_grp button")
		mapItems.on("click", function() {
			mapItems.removeClass('active')
			$(this).addClass('active')
		})
	}

}
