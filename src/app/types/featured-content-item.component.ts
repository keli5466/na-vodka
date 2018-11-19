import { SafeHtml } from '@angular/platform-browser';

export class FeaturedContentItem 
{
	constructor( public nid: string,
	             public title: string,
	             public subtitle: SafeHtml,
	             public body: SafeHtml,
	             public link: string,
	             public linkText: string,
	             public featureImage: string ) 
	{

  	}
}
