import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title, SafeHtml } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import slugify from 'slugify'

import {style, animate, transition, trigger} from '@angular/animations';
import { ContentService } from '../services/content.service';

// Import RXJS
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import { exists } from 'fs';

declare var $;

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.styl'],
	providers: [ ContentService ],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({opacity:0}),
				animate(500, style({opacity:1}))
			]),
			transition(':leave', [
				animate(500, style({opacity:0}))
			])
		])
	]
})
export class RecipeListComponent implements OnInit {
	// Marquee types
	private pageData: Array<any>;
	private pageTitle: SafeHtml;
	private bodyContent: SafeHtml;

	// Recipes and flavors list
	private recipes: Array<any>;
	private flavors: Array<any>;
	private activeRecipes: Array<any>;

	// Toggles menu item
	public toggleFilter: boolean;

	// Done loading boolean
	public doneLoading: boolean;


	private activeFilter: Number;


	private titleService: Title;
	private contentSvc: ContentService;
	private sanitizer: DomSanitizer;
	private router: Router;
	private activatedRoute: ActivatedRoute;

	constructor(
		contentSvc: ContentService,
		sanitizer: DomSanitizer,
		router: Router,
		activatedRoute: ActivatedRoute,
		titleService: Title ) {
			this.contentSvc = contentSvc;
			this.sanitizer = sanitizer;
			this.titleService = titleService;
			this.router = router;
			this.activatedRoute = activatedRoute;
	}

	ngOnInit() {

		// Get this.pageTitle, flavor, and recipe data
		Observable.forkJoin(
			this.contentSvc.getRecipePage().first(),
			this.contentSvc.getFlavorList().first(),
			this.contentSvc.getRecipeList().first(),
		).subscribe((data) => {
			this.pageData = data[0]
			this.flavors = data[1]
			this.recipes = this.handleRecipeList(data[2])

			// Toggle loading to done
			this.doneLoading = true

			// Marquee Data
			const title = this.pageData['title'][0].value;
			this.pageTitle = this.sanitizer.bypassSecurityTrustHtml(title)
			this.titleService.setTitle(title)
			this.bodyContent = this.sanitizer.bypassSecurityTrustHtml(this.pageData['body'][0].value)

			// Get query params
			this.activatedRoute.queryParams.subscribe((params:object) => {
				if (params && params['filter']) {
					// Get filter off of params object
					const filter = params['filter'].split('-').join(' ')
					this.activeRecipes = this.handleFilter(filter)
				} else {
					this.activeRecipes = this.recipes
				}
			})
		})
	}

	// Abstract filter function
	handleFilter(filter:string) {
		return this.recipes.filter((recipe:object) => {
			// Make sure related flavor exists
			const relatedFlavor = recipe['field_recipe_flavor_export'] && Object.keys(recipe['field_recipe_flavor_export']).length

			// Get active filter index
			this.activeFilter = this.flavors.findIndex((flavor) => flavor.title.toLowerCase() == filter)

			// Return matches
			if (relatedFlavor) {
				return recipe['field_recipe_flavor_export'].title.toLowerCase() == filter
			}
		})
	}

	// Format recipes
	handleRecipeList(list:Array<any>) {
		return list.map((item) => {
			const images = item.field_recipe_images_export[0]
			let flavor;

			if (item.field_recipe_flavor_export) {
				flavor = item.field_recipe_flavor_export['title'].toLowerCase()
			}

			return Object.assign({}, item, {
				'field_recipe_images': images,
				flavor
			})
		})
	}

	// Sets active filter
	handleActiveFilter (index:number) {
		this.toggleFilter = !this.toggleFilter
		this.activeFilter = index;
		this.setQueryParam(index)
	}

	// Remove query params when showing all recipes
	removeFilters () {
		this.toggleFilter = false
		this.activeFilter = null
		this.router.navigate(['/recipe-list'])
	}

	// Set query param when user selects flavor
	setQueryParam (index:number) {
		const { title } = this.flavors[index]
		this.router.navigate(['/recipe-list'], { queryParams: {
			filter: slugify(title).toLowerCase()
		}})
	}

	// When event happens outside of filter, close filter
	onClickOutside (event:Object) {
		if (this.toggleFilter && event && event['value']) {
			this.toggleFilter = !this.toggleFilter
		}
	}
}
