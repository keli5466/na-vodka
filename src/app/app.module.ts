import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

// WineOS import stuffs
import { AgeGateModule } from 'wineos-agegate';
import { ConfigService } from 'ejg-config-service';
import { WineFinderFormModule } from 'wineos-finderform';
import { ContactUsModule } from 'wineos-contactus';
import { LegalContentModule } from 'wineos-legalcontent';

// App-specific components and such...

import { ContentService } from './services/content.service';
import { HeaderComponent } from './includes/header/header.component';
import { FooterComponent } from './includes/footer/footer.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WhereToBuyComponent } from './where-to-buy/where-to-buy.component';
import { ContactComponent } from './contact/contact.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UseAgreementComponent } from './use-agreement/use-agreement.component';
import { TrademarksComponent } from './trademarks/trademarks.component';
import { AcceptableUsePolicyComponent } from './acceptable-use-policy/acceptable-use-policy.component';
import { AgeGateComponent } from './age-gate/age-gate.component';
import { StayOnPointComponent } from './stay-on-point/stay-on-point.component';
import { FeaturedDrinkSliderComponent } from './featured-drink-slider/featured-drink-slider.component';
import { X5DistilledComponent } from './x5-distilled/x5-distilled.component';
import { FeaturedContentComponent } from './featured-content/featured-content.component';
import { LoadingComponent } from './loading/loading.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ClickOutsideDirective } from './click-outside'

export function configServiceFactory(config: ConfigService)
{
		return () => config.load();
}


@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		HomepageComponent,
		HeaderComponent,
		FooterComponent,
		FeaturedDrinkSliderComponent,
		StayOnPointComponent,
		AgeGateComponent,
		WhereToBuyComponent,
		ContactComponent,
		ClickOutsideDirective,
		NotFoundComponent,
		ProductListComponent,
		ProductDetailComponent,
		RecipeListComponent,
		RecipeDetailComponent,
		PrivacyPolicyComponent,
		UseAgreementComponent,
		TrademarksComponent,
		AcceptableUsePolicyComponent,
		X5DistilledComponent,
		FeaturedContentComponent,
		LoadingComponent,
		VideoPlayerComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		AgeGateModule,
		WineFinderFormModule,
		ContactUsModule,
		LegalContentModule
	],

	providers: [
		ConfigService,
		{
			provide: APP_INITIALIZER,
			useFactory: configServiceFactory,
			deps: [ConfigService],
			multi: true
		},
		CookieService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
