import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, transition, animate, group, keyframes, query } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';

import { get } from 'lodash'

import 'rxjs/add/operator/toPromise';

import { ContentService } from '../services/content.service';
import { FeatureddrinksService } from '@app/services/featureddrinks.service';

import { AgeGateModule } from 'wineos-agegate';
import { AgeGateComponent } from '../age-gate/age-gate.component';

import { FeaturedDrinkItem } from '../types/featured-drink-item.component';
import Player from "@vimeo/player";
@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.styl'],
	providers: [ContentService, AgeGateModule, FeatureddrinksService],
	host: {
		'(document:scroll)': 'findScroll($event)'
	},
})

export class HomepageComponent implements OnInit {
	pageContent: string[];
	reveal: boolean;
	contentSvc: ContentService;
	sanitizer: DomSanitizer;
	featuredDrinksSvc: FeatureddrinksService;
	cookieService: CookieService;
	theMessage: string;
	public recipes;
	animate: boolean;
	featuredDrinks: FeaturedDrinkItem[];
	public featuredRecipeIDs: number[];
	public featuredContentCollectionID: number;
	public videoURL: string;
	public headline: string;
	public subhead: string;
	private videoReady: boolean;

	// public player: Player;

	public doneLoading: boolean;
	public altImg: string;

	constructor(
		contentSvc: ContentService,
		cookieService: CookieService,
		sanitizer: DomSanitizer,
		route: ActivatedRoute,
		featuredDrinksSvc: FeatureddrinksService) {
		this.contentSvc = contentSvc;
		this.animate = false;
		this.sanitizer = sanitizer;
		this.cookieService = cookieService;
		this.featuredDrinksSvc = featuredDrinksSvc;
		this.theMessage = route.snapshot.data.mymessage;
		this.featuredDrinks = [];
		this.featuredRecipeIDs = null;
		this.featuredContentCollectionID = null;
	}

	ngOnInit() {
		this.revealContent()
		this.contentSvc.getHomePage().subscribe((data) => {

			// Headline and subheadline
			this.headline = get(data, 'field_header_image_title[0].value')
			this.subhead = get(data, 'field_header_image_subtitle[0].value')

			// Featured content ref
			this.featuredContentCollectionID = get(data, 'field_featured_collection[0].target_id')

			// Video url for vimeo
			this.videoURL = get(data, 'field_vimeo_video_url[0].value')
		});

		// Get featured drink ids to pass into component
		this.contentSvc.getFeaturedDrinkIDs().then((res) => this.featuredRecipeIDs = res);
	}

	// Reveal content slightly earlier than removing loader
	revealContent() {
		setTimeout(() => {
			this.reveal = true;
		}, 1375)
	}

	// Remove loader when loading has completed
	isDoneLoading($event) {
		setTimeout(() => {
			this.doneLoading = $event;
		}, 1500);
	}

	handleVideoReady($event) {
		this.videoReady = $event
	}

	findScroll() {
		const drizlyCta = document.querySelector('.drizly-cta');
		var scrollPosition = window.pageYOffset || document.documentElement.scrollTop
		if (scrollPosition > 100) {
			drizlyCta.classList.add('slide')
		}
	}

	ngDoCheck() {
		if (this.cookieService.check('AgeGate')) {
			this.animate = true
		} else {
			this.animate = false
		}
	}
}
