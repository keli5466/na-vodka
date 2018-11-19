// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes, DefaultUrlSerializer, UrlTree, UrlSerializer } from '@angular/router';

// Component Imports
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { WhereToBuyComponent } from './where-to-buy/where-to-buy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UseAgreementComponent } from './use-agreement/use-agreement.component';
import { TrademarksComponent } from './trademarks/trademarks.component';
import { AcceptableUsePolicyComponent } from './acceptable-use-policy/acceptable-use-policy.component';
import { NotFoundComponent } from './not-found/not-found.component';


// Lowercase all incoming URLs -- Please do not modify function
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
		parse(url: string): UrlTree {
				return super.parse(url.toLowerCase());
		}
}

const appRoutes: Routes = [
		{
				path: '',
				redirectTo: 'home',
				pathMatch: 'full'

		},
		{
				path: 'home',
				component: HomepageComponent
		},
		{
				// Produt Detail pages (for featured flavor too?)
				//path: 'product-detail/:productid',
				path: 'flavors/:flavorname',
				component: ProductDetailComponent
		},
		{
				// Flavors
				path: 'flavors',
				component: ProductListComponent,
				data: {
						// some sort of filter to get just the flavored products
				}
		},
		{
				// Drinks list
				path: 'recipe-list',
				component: RecipeListComponent,
				data: {

				}
		},
		{
				// Drinks detail
				path: 'recipes/:recipename',
				component: RecipeDetailComponent
		},
		{
				// about
				path: 'about',
				component: AboutComponent,
				data: {

				}
		},
		{
				// where to buy
				path: 'wheretobuy',
				component: WhereToBuyComponent,
				data: {

				}
		},
		{
				path: 'contact',
				component: ContactComponent,
				data: {
						//title: 'contact'
				}
		},
		{
				path: 'privacy-policy',
				component: PrivacyPolicyComponent,
				data: {
				}
		},
		{
				path: 'use-agreement',
				component: UseAgreementComponent,
				data: {
				}
		},
		{
				path: 'trademarks',
				component: TrademarksComponent,
				data: {
				}
		},
		{
				path: 'acceptable-use-agreement',
				component: AcceptableUsePolicyComponent,
				data: {
				}
		},
		{
				path: '**',
				redirectTo: '/404',
				pathMatch: 'full'
		},
		{
				path: '404',
				component: NotFoundComponent
		},
];

@NgModule({
		imports: [
				RouterModule.forRoot( appRoutes )
		],
		exports: [
				RouterModule
		],
		providers: [
				{
						provide: UrlSerializer,
						useClass: LowerCaseUrlSerializer
				}
		]
})
export class AppRoutingModule {}
