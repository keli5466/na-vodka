import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { get } from "lodash";

import { ContentService } from "../services/content.service";

@Component({
	selector: "app-recipe-detail",
	templateUrl: "./recipe-detail.component.html",
	styleUrls: ["./recipe-detail.component.styl"],
	providers: [ContentService]
})
export class RecipeDetailComponent implements OnInit {
	private contentSvc: ContentService;
	private sanitizer: DomSanitizer;
	private route: ActivatedRoute;
	public doneLoading: boolean;

	public title: SafeHtml;
	public recipeName: string;
	public recipeID: number;
	public subcopy: SafeHtml;
	public shareURL: string;
	public featuredimage: string;
	public body: SafeHtml;
	public ingredients: SafeHtml;
	public instructions: SafeHtml;

	public featuredRecipeIDs: number[];

	constructor(
		contentSvc: ContentService,
		sanitizer: DomSanitizer,
		route: ActivatedRoute,
		private ref: ChangeDetectorRef
	) {
		this.contentSvc = contentSvc;
		this.sanitizer = sanitizer;
		this.route = route;
		this.featuredRecipeIDs = null;
		this.recipeID = null;
	}

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.recipeName = params.get("recipename");

			this.contentSvc.getRecipeDetailsPage(this.recipeName).subscribe(data => {
				console.log(data);
				this.recipeID = data["nid"][0].value;
				this.title = data["title"][0].value;
				this.subcopy =
					data["field_recipe_subtitle"].length > 0
						? data["field_recipe_subtitle"][0].value
						: "";

				this.featuredimage =
					data["field_recipe_images"].length > 0
						? data["field_recipe_images"][0].url
						: "";

				this.ingredients =
					data["field_recipe_ingredients_list"].length > 0
						? data["field_recipe_ingredients_list"][0].value
						: "";
				this.instructions =
					data["field_recipe_description"].length > 0
						? data["field_recipe_description"][0].value
						: "";

				this.contentSvc.getFeaturedDrinkIDs().then(res => {
					this.featuredRecipeIDs = [];
					for (let i = 0; i < res.length; i++) {
						if (this.recipeID != res[i]) {
							this.featuredRecipeIDs.push(res[i]);
						}
					}
					this.doneLoading = true;
				});
			});
			this.ref.detectChanges();
		});

		this.ref.detectChanges();
	}
}
