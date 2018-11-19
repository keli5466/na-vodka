import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.styl'],
  providers: [ ContentService ]
})
export class AboutComponent implements OnInit
{
	public bodyContent: SafeHtml;
	public pageTitle: SafeHtml;
	public contentPanels: Array<any>;

	private titleService: Title;
	private router: Router;

	contentSvc: ContentService;
	sanitizer: DomSanitizer;

	public doneLoading: boolean;

	constructor( contentSvc: ContentService, 
		         sanitizer: DomSanitizer, 
		         titleService: Title,
		         router: Router )
	{
		this.contentSvc 	= contentSvc;
		this.sanitizer 		= sanitizer;
		this.titleService 	= titleService;
		this.router 		= router;

		this.contentPanels 	= [];
	}

	ngOnInit()
	{
		this.doneLoading    = false;

		this.contentSvc.getAboutPage()
			.subscribe( data => 
			{
				this.pageTitle = this.sanitizer.bypassSecurityTrustHtml( data[ 'title' ][ 0 ].value );
				this.titleService.setTitle( data[ 'title' ][ 0 ].value );

				this.bodyContent = this.sanitizer.bypassSecurityTrustHtml( data[ 'body' ][ 0 ].value );

				// now go get the "panels" for this page...
				let _nodeid = data[ 'nid' ][ 0 ].value;

				this.contentSvc.getContentPanels( _nodeid )
					.subscribe( panelData => 
					{
						for( let i = 0; i < panelData.length; i++ )
						{
							panelData[ i ].panelTitle = panelData[ i ].field_panel_title;
							panelData[ i ].panelContent = this.sanitizer.bypassSecurityTrustHtml( panelData[ i ].field_panel_body_text );

							if( panelData[ i ].field_image_export )
							{
								panelData[ i ].backgroundImageURL = panelData[ i ].field_image_export.url;
							}

							if( panelData[ i ].field_panel_link_export )
							{
								panelData[ i ].panelButtonText = panelData[ i ].field_panel_link_export.text;
								panelData[ i ].panelButtonUrl  = panelData[ i ].field_panel_link_export.url;
							}

							this.contentPanels.push( panelData[ i ] );
						}

						this.doneLoading = true;
					});
			});
	}

	doClickPanelButton( route:string )
	{
		this.router.navigateByUrl( route );
	}
}
