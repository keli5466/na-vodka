import { Component, Input } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfigService } from 'ejg-config-service';
import * as $ from "jquery";
// import { AgeGateComponent } from '../age-gate/age-gate.component';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	cookieService: CookieService;
	confirmed: boolean;
	title = 'New Amsterdam Vodka';
	constructor(private router: Router,
		private configSrvc: ConfigService,
		private http: HttpClient,
		cookieService: CookieService) {
		this.cookieService = cookieService;
		this.confirmed = false;
	}
	ngOnInit() {
		$.fn.isInViewPort = function () {
			const elTop = $(this).offset().top + 200;
			const elBottom = elTop + $(this).outerHeight()

			const viewportTop = $(window).scrollTop()
			const viewportBottom = viewportTop + $(window).height()

			return elBottom > viewportTop && elTop < viewportBottom
		}

		this.router.events.subscribe((event) => {
			$(window).scrollTop(0, 0);
			setTimeout(function () {
				inViewport();
			}, 200);
		});
		$(document).ready(function () {
			setTimeout(function () {
				inViewport();
			}, 200);
		});

		$(window).on('resize scroll', () => {
			inViewport()
		})

		function inViewport() {
			$('.vueport').each(function () {
				if ($(this).isInViewPort()) {
					$(this).addClass('inView')
				}
			});
		}
	}

	ngDoCheck() {
		var ageGate = this.cookieService.check('AgeGate');
		if (ageGate)
			this.confirmed = true;
		else
			this.confirmed = false;
	}
	ngAfterContentChecked() {
		$('.vueport').each(function () {
			var divPos = $(this).offset().top,
				topOfWindow = $(window).scrollTop();

			if (divPos < topOfWindow + 200) {
				$(this).addClass('inView');
			}
		});
	}

}
