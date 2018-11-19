import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

import { ContentService } from "../services/content.service";

import { FeaturedDrinkItem } from "../types/featured-drink-item.component";

import * as Siema from "siema";
@Component({
	selector: "app-featured-drink-slider",
	templateUrl: "./featured-drink-slider.component.html",
	styleUrls: ["./featured-drink-slider.component.styl"],
	providers: [ContentService]
})
export class FeaturedDrinkSliderComponent implements OnInit, AfterViewInit {
	public recipes: FeaturedDrinkItem[];
	contentSvc: ContentService;
	sanitizer: DomSanitizer;
	router: Router;
	public doneLoading: boolean;

	@Input() featuredDrinkIDs: number[];
	private _featuredDrinkIDs: number[];

	constructor(
		contentSvc: ContentService,
		sanitizer: DomSanitizer,
		router: Router
	) {
		this.contentSvc = contentSvc;
		this.sanitizer = sanitizer;
		this.recipes = null;
		this.router = router;
	}

	ngOnInit() {
		this.recipes = [];

		for (let id of this.featuredDrinkIDs) {
			this.contentSvc.getRecipeDetailsView(id).subscribe(res => {
				this.recipes.push(
					new FeaturedDrinkItem(
						res[0].nid,
						res[0].title,
						res[0].field_recipe_subtitle,
						res[0].field_recipe_description,
						res[0].field_recipe_images_export[0],
						res[0].path
					)
				);

				this.doneLoading = true;
			});
		}
	}

	// Add class to carousel items for build ins
	handleCarouselClasses() {
		const slides = document.querySelector(".siema > div").childNodes;
		[].forEach.call(slides, (slide, index) => {
			slide.classList.add("drink-slide", `drink-slide-${index + 1}`);
		});
	}

	// Polls to make sure template has been rendered before instantiating slider

	ngAfterViewInit() {
		const interval = setInterval(() => {
			if (this.doneLoading) {
				new Siema({
					selector: ".siema",
					duration: 400,
					easing: "ease-out",
					perPage: {
						769: 2,
						1024: 3
					},
					startIndex: 0,
					draggable: true,
					threshold: 20,
					loop: false,
					rtl: false,
					onInit: () => {
						this.handleCarouselClasses();
					}
				});
				clearInterval(interval);
			}
		}, 100);
	}
}
