import { Component, AfterViewInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import Player from "@vimeo/player";

@Component({
	selector: 'app-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.styl']
})

export class VideoPlayerComponent implements AfterViewInit {
	@Input() videoURL: string;
	@Output() loaded = new EventEmitter();
	// video: string;
	public player: Player;

	@ViewChild('videoPlayer') videoPlayer;

	ngAfterViewInit() {
		this.player = new Player(this.videoPlayer.nativeElement, {
			url: this.videoURL,
			loop: true,
			muted: true,
			responsive: true,
			background: true,
			autoplay: true
		})

		this.player.on('loaded', () => {
			this.loaded.emit(true)
		})
	}
}
