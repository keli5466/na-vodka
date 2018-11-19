import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title, SafeHtml } from '@angular/platform-browser';

import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-acceptable-use-policy',
  templateUrl: './acceptable-use-policy.component.html',
  styleUrls: ['./acceptable-use-policy.component.scss'],
  providers: [ ContentService ]
})
export class AcceptableUsePolicyComponent implements OnInit 
{
	public pageTitle: SafeHtml;
	
	private titleService: Title;

	private contentSvc: ContentService;
	private sanitizer: DomSanitizer;
	public doneLoading: boolean;

	constructor( contentSvc: ContentService, 
		         sanitizer: DomSanitizer, 
		         titleService: Title )
	{
		this.contentSvc = contentSvc;
		this.sanitizer  = sanitizer;
		this.titleService = titleService;
	}

	ngOnInit() 
	{
		this.doneLoading    = false;

		this.contentSvc.getAcceptableUsePolicyPage()
		.subscribe( data => 
		{
			this.pageTitle = this.sanitizer.bypassSecurityTrustHtml( data[ 'title' ][ 0 ].value );
			this.titleService.setTitle( data[ 'title' ][ 0 ].value );

			this.doneLoading = true;
		});
	}
}
