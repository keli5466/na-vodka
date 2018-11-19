import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, Title, SafeHtml } from '@angular/platform-browser';

import { ContentService } from '../services/content.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.styl'],
	providers: [ ContentService ]
})

export class ProductListComponent implements OnInit {
	public bodyContent: string;
	public pageTitle: SafeHtml;
	public pageSubtitle: SafeHtml;
	public flavors: Array<any>;
	private titleService: Title;
	private contentSvc: ContentService;
	private sanitizer: DomSanitizer;
	public doneLoading: boolean;

	constructor(
		contentSvc: ContentService,
		sanitizer: DomSanitizer,
		titleService: Title ) {
			this.contentSvc = contentSvc;
			this.sanitizer = sanitizer;
			this.titleService = titleService;
	}

	ngOnInit() {
		this.contentSvc.getFlavorPage().subscribe((data) => {
				this.pageTitle = this.sanitizer.bypassSecurityTrustHtml( data[ 'title' ][ 0 ].value );
				this.titleService.setTitle( data[ 'title' ][ 0 ].value );
				this.pageSubtitle = this.sanitizer.bypassSecurityTrustHtml( data[ 'body' ][ 0 ].value );
		});

		this.contentSvc.getFlavorList().subscribe((data) => {
			for(let i = 0; i < data.length; i++) {
				data[i].productid = data[i].nid;
				data[i].imagefilename = data[i].field_spirit_product_image_export[0].url;
				data[i].flavor = data[i].title;
			}

			this.flavors = data;
			this.doneLoading = true;
		});
	}
}
