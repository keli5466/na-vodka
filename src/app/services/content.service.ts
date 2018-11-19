import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { environment } from '../../environments/environment';
import { ConfigService } from 'ejg-config-service';
import { FeaturedDrinkItem } from '../types/featured-drink-item.component';


const headers: HttpHeaders = new HttpHeaders( {'Accept': 'text/html'} );

const API_URLHOMEPAGE             = environment.site + environment.url_homepage;
const API_URLHOMEPAGE_FEATURES    = environment.site + environment.url_homepage_featured_content;
const API_FLAVOR_PAGE             = environment.site + environment.url_flavors_page;
const API_PRIVACY_POLICY_PAGE     = environment.site + environment.url_privacy_policy_page;
const API_PRODUCTLIST             = environment.site + environment.url_productlist;
const API_PRODUCTDETAILS          = environment.site + environment.url_productdetails;
const API_RECIPELIST              = environment.site + environment.url_recipelist;
const API_RECIPEDETAILS_PAGE      = environment.site + environment.url_recipedetails_page;
const API_RECIPEDETAILS_VIEW      = environment.site + environment.url_recipedetails_view;
const API_RECIPEPAGE              = environment.site + environment.url_recipepage;
const API_TRADEMARKS_PAGE         = environment.site + environment.url_trademarks;
const API_USE_AGREEMENT_PAGE      = environment.site + environment.url_use_agreement;
const API_URLABOUTPAGE            = environment.site + environment.url_aboutpage;
const API_URL_ACCEPTABLE_USE_PAGE = environment.site + environment.url_acceptable_use_policy_page;
const API_URLCONTENTPANELS        = environment.site + environment.url_content_panels;

const AWS_APIKEY                  = environment.aws_apikey;
const AWS_ROOTURL                 = environment.aws_rooturl;


@Injectable()
export class ContentService 
{
    private hasValidAPI: boolean = false;
    private APIkey: any;
    private brandCode: any;
    private RootURL: any;

    constructor( private http: HttpClient, private configService: ConfigService ) 
    { 
        // load everything up at once when the service is first loaded (per convo w/ Robert)
        // (tho after variouos convos w/ NAV I'm not sure we can truly get ALL the content that way...)

        this.brandCode = this.configService.config.Brand.BrandCode;

        this.APIkey    = AWS_APIKEY;
        this.RootURL   = AWS_ROOTURL;
    }

  	public getFlavorList()
  	{
        return this.http.get<any>( API_PRODUCTLIST, { headers: headers } );
  	}


    public getFlavorPage()
    {
        return this.http.get<any>( API_FLAVOR_PAGE, { headers: headers } );
    }

    public getPrivacyPolicyPage()
    {
        return this.http.get<any>( API_PRIVACY_POLICY_PAGE, { headers: headers } );
    }

    public getProductDetail( productName:string )
    {
        var _url = API_PRODUCTDETAILS + "/" + productName + "?_format=json";
        return this.http.get<any>( _url, { headers: headers } );
    }

    public getRecipeDetailsPage( recipeName:string )
    {
        var _url = API_RECIPEDETAILS_PAGE + "/" + recipeName + "?_format=json";
        return this.http.get( _url, { headers: headers } );
    }

    public getRecipeDetailsView( recipeid:number )
    {
        var _url = API_RECIPEDETAILS_VIEW + "/" + recipeid;
        return this.http.get( _url, { headers: headers } );
    }

    public getRecipeList()
    {
        return this.http.get<any>( API_RECIPELIST, { headers: headers } );
    }

    public getRecipePage()
    {
        return this.http.get<any>( API_RECIPEPAGE, { headers: headers } );
    }

    public getContentPanels( nodeid: number )
    {
        var _url = API_URLCONTENTPANELS + "/" + nodeid;
        return this.http.get<any>( _url, { headers: headers } );
    }

    public getHomePage()
    {
        return this.http.get<any>( API_URLHOMEPAGE, { headers: headers } );
    }

    public getFeaturedContent( featuredCollectionID: number )
    {
        var _url = API_URLHOMEPAGE_FEATURES + "/" + featuredCollectionID;
        return this.http.get<any>( _url, { headers: headers } );
    }

    public getAboutPage()
    {
        var _url = API_URLABOUTPAGE;
        return this.http.get( _url, { headers: headers } );
    }

    public getAcceptableUsePolicyPage()
    {
        var _url = API_URL_ACCEPTABLE_USE_PAGE;
        return this.http.get( _url, { headers: headers } );
    }

    public subscribeToEmailList( emailAddress: string, firstName = '', lastName = '' ) 
    {
        let _emailAddy = emailAddress;    // the back-tick-escaping used below doesnt like working with function args, so making a local copy to fix that.

        const options = 
        {
            headers: new HttpHeaders({
                                        'Content-Type':  'application/json',
                                        'x-api-key': this.APIkey
            })
        };

        let body = { brandCode: this.brandCode, 
                      emailAddress: _emailAddy,
                      firstName: '',
                      lastName: '',
                      optOut: false };

        var _url = this.RootURL + '/newsletter';

        return this.http.post( _url, body, options ).map(
            ( res ) => { 
                       console.log( "called salesforce api" ); 
                       console.log( res ); }
        );
    }

    public getFeaturedDrinkIDs()
    {
        let _featuredIDs:number[];
        _featuredIDs = [];

        return this.http.get( API_URLHOMEPAGE, { headers: headers } )
                 .toPromise()
                 .then( data => {
                    for( let i = 0; i < data[ "field_featured_drink" ].length; i++ )
                    {
                        let _id = data[ "field_featured_drink" ][ i ].target_id;

                        _featuredIDs.push( _id );
                    }

                    return _featuredIDs;
                 });
    }

    public getFeaturedDrink( url:string )
    {
        var _url = environment.site + url + "/?_format=json";

        return this.http.get( _url, { headers: headers } )
                .toPromise()
                .then( data => {

                    return new FeaturedDrinkItem( data[ "nid" ][ 0 ].value, 
                                                  data[ "title" ][ 0 ].value, 
                                                  ( data[ "field_recipe_subtitle" ].length > 0 ) ? data[ "field_recipe_subtitle" ][ 0 ].value : "",
                                                  data[ "field_recipe_description" ][ 0 ].value, 
                                                  data[ "field_recipe_images" ][ 0 ].url, 
                                                  data[ "path" ][ 0 ].alias );

                });
    }

    public getTrademarksPage()
    {
        var _url = API_TRADEMARKS_PAGE;
        return this.http.get( _url, { headers: headers } );
    }

    public getUseAgreementPage()
    {
        var _url = API_USE_AGREEMENT_PAGE;
        return this.http.get( _url, { headers: headers } );
    }
}

