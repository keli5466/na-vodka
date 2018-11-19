import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { CookieService } from 'ngx-cookie-service';

@Component({
	selector: 'app-age-gate',
	templateUrl: './age-gate.component.html',
	styleUrls: ['./age-gate.component.styl']
})
export class AgeGateComponent implements OnInit
{
	date: Date;
	age: boolean;
	minAge: string;
	underAge: boolean;
	cookieService: CookieService;


	constructor( cookieService:CookieService )
	{
		this.age = true;
		this.underAge = false;
		this.cookieService = cookieService;
	}

	sorryGate() {
		this.underAge = !this.underAge
		var getCardHeight = $('.card.active').height();
		$('.agegate-wrapper').css({height: getCardHeight});
	}

	closeGate() {
		this.age = !this.age;
		$( 'html' ).css( { overflow: 'auto' } );
		$( '.header' ).addClass('active');
		//$( '#agegate' ) .fadeOut( 'slow', 'swing' , this.test() );

		// $( '#agegate' ).css( { opacity: 1, display: 'flex' } ).animate({
		// 						opacity: 0,
		// 						zIndex: -5
		// 				}, 1000 );

		this.putCookie('AgeGate', 'true');
	}

	ngOnInit()
	{
		// if the cookie is still here from yesteday, no need to draw the age gate again.
		let ageGate = this.getCookie( 'AgeGate' );

		if( !ageGate )
		{
			var today = new Date();
			var minAge = 21;
			this.date = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
			//$('#agegate').fadeIn();
			// $( '#agegate' ).css( { display: 'flex' } );
			$( 'html' ).css( { overflow: 'hidden' } );
		}
	}
	ngAfterViewInit() {
		var getCardHeight = $('.card.active').height();
		$('.agegate-wrapper').css({height: getCardHeight});
	}

	ngAfterViewChecked(){
		var getCardHeight = $('.card.active').height();
		$('.agegate-wrapper').css({height: getCardHeight});
	}

	putCookie( key, value )
	{
		// Expire cookie within 24 hours
				var date = new Date();
				date.setTime(date.getTime() + (24 * 60 * 60 * 1000));

				return this.cookieService.set( key, value, date );
	}

	getCookie( key )
	{
		return this.cookieService.get( key );
	}


}
