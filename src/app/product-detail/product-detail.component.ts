import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import {
	Location,
	LocationStrategy,
	PathLocationStrategy
} from "@angular/common";

import { get } from "lodash";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { mergeMap, map, switchMap } from "rxjs/operators";

import { ContentService } from "../services/content.service";

import { FeaturedDrinkItem } from "../types/featured-drink-item.component";

@Component({
	selector: "app-product-detail",
	templateUrl: "./product-detail.component.html",
	styleUrls: ["./product-detail.component.styl"],
	providers: [
		ContentService,
		Location,
		{ provide: LocationStrategy, useClass: PathLocationStrategy }
	]
})
export class ProductDetailComponent implements OnInit {
	title: string;
	field_buy_now_link: string;
	product_image_url: SafeHtml;
	description: SafeHtml;
	flavor_notes: Array<any>;

	public featuredRecipeIDs: number[];
	public featuredDrink: FeaturedDrinkItem;

	private contentSvc: ContentService;
	private sanitizer: DomSanitizer;
	private route: ActivatedRoute;
	private location: Location;
	public doneLoading: boolean;

	private http: HttpClient;

	constructor(
		contentSvc: ContentService,
		sanitizer: DomSanitizer,
		route: ActivatedRoute,
		location: Location,
		router: Router,
		private ref: ChangeDetectorRef,
		http: HttpClient
	) {
		this.contentSvc = contentSvc;
		this.sanitizer = sanitizer;
		this.route = route;
		this.location = location;
		this.featuredRecipeIDs = null;
		this.featuredDrink = null;
		this.http = http;
	}

	ngOnInit() {
		// Get featured drink ids
		this.contentSvc.getFeaturedDrinkIDs().then(res => {
			this.featuredRecipeIDs = res;
		});

		// Get flavor details
		this.route.paramMap.subscribe(params => {
			const flavorName = params.get("flavorname");
			this.getFlavorDetails(flavorName);
		});

		this.ref.detectChanges();
	}

	getFlavorDetails(flavorName) {
		const flavorInfo$ = this.contentSvc.getProductDetail(flavorName);

		const featuredDrink$ = flavorInfo$.pipe(
			switchMap(
				flavor => {
					let _featuredDrinkData = new Promise<FeaturedDrinkItem>(null);
					if (flavor.field_featured_drinks.length > 0) {
						_featuredDrinkData = this.contentSvc.getFeaturedDrink(
							flavor.field_featured_drinks[0].url
						);
						return _featuredDrinkData;
					} else {
						_featuredDrinkData = Promise.resolve(
							new FeaturedDrinkItem(null, null, null, null, null, null)
						);
						return _featuredDrinkData;
					}
				},
				(flavor, _featuredDrinkData) => [flavor, _featuredDrinkData]
			)
		);

		featuredDrink$.subscribe(data => {
			this.title = get(data[0], "title[0].value");
			this.field_buy_now_link = get(data[0], "field_buy_now_link[0].value");
			this.product_image_url = get(
				data[0],
				"field_spirit_product_image[0].url"
			);
			this.description = this.sanitizer.bypassSecurityTrustHtml(
				data[0].field_spirit_description.length > 0
					? data[0].field_spirit_description[0]["value"]
					: ""
			);
			// Mock flavor notes

			this.flavor_notes = [
				{
					icon: "something",
					title: "This is a flavor note"
				},
				{
					icon: "somethingElse",
					title: "This is another flavor note"
				}
			];
			// this.flavor_notes =
			// 	data[0].field_spirit_flavor.length > 0
			// 		? data[0].field_spirit_flavor[0].value
			// 		: "";
			this.featuredDrink = data[1];
			this.doneLoading = true;
		});
	}

	navigateToDrizly() {
		window.location.href = this.field_buy_now_link;
	}
}
