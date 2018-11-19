import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import {animate, query, stagger, state, group, style, transition, trigger , animateChild} from '@angular/animations';
import * as $ from "jquery";
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.styl'],
	animations: [
		trigger('slideInOut', [
			transition('out => in', [
				group([
					query('@theChildAnimation', animateChild()),
					query('li', [
						style({ opacity: 0 }),
						stagger(110, [
							animate('800ms 300ms ease-in-out', style({ opacity: 1 }))
						])
					]),
				]),
			]),
		]),
		trigger('theChildAnimation', [
			state('in', style({
				opacity: 1,
				transform: 'translate3d(0%, 0, 0)',
			})),
			state('out', style({
				opacity: 0,
				transform: 'translate3d(-100%, 0, 0)',
			})),
			transition('out => in', [
				animate('500ms 200ms cubic-bezier(0.55, 0.31, 0.15, 0.93)'),
			]),
		]),
	],
})
export class HeaderComponent implements OnInit {
	active: boolean;
	menuState: string;
	menuToggle: boolean;

	constructor() {
		this.menuToggle = false
	}
	// Toggles menu on and off
	toggleMenu() {
		this.menuState = this.menuState === 'out' ? 'in' : 'out' ;
		this.menuToggle = !this.menuToggle;
		if (this.menuToggle)
			$('html').css({overflow: 'hidden'});
		else
			$('html').css({overflow: ''});
	}
	ngOnInit() {
		this.menuState = 'out';
		// Close Menu on click Event
		$('li a').on('click', (e) => {
			this.toggleMenu();
		})
	}

}
