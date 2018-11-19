import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ContentService } from '../services/content.service';
import { FeaturedContentItem } from '../types/featured-content-item.component';

@Component({
	selector: 'app-featured-content',
	templateUrl: './featured-content.component.html',
	styleUrls: ['./featured-content.component.styl'],
	providers: [ContentService]
})
export class FeaturedContentComponent implements OnInit {
	@Input() featuredContentCollectionID: number;

	public features: FeaturedContentItem[];
	contentSvc: ContentService;
	sanitizer: DomSanitizer;
	public doneLoading: boolean;

	constructor(contentSvc: ContentService, sanitizer: DomSanitizer) {
		this.contentSvc = contentSvc;
		this.sanitizer = sanitizer;
		this.features = null;
	}

	ngOnInit() {
		this.features = [];
		this.contentSvc.getFeaturedContent(this.featuredContentCollectionID).subscribe((res) => {
			for (let k = 0; k < res.length; k++) {
				this.features.push(
					new FeaturedContentItem(res[k].nid,
						res[k].field_featured_content_title,
						this.sanitizer.bypassSecurityTrustHtml(res[k].field_featured_content_subtitle),
						this.sanitizer.bypassSecurityTrustHtml(res[k].field_featured_content_body),
						res[k].field_featured_content_link,
						res[k].field_featured_content_link_text,
						res[k].field_featured_content_image));
			}
			this.doneLoading = true;
		});
	}
}
