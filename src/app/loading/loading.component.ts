import { Component, OnInit , EventEmitter , Output} from '@angular/core';
@Component({
	selector: 'app-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.styl']
})
export class LoadingComponent implements OnInit {
	@Output() loaded = new EventEmitter();
	public counter : number = 0;
	interval;

	ngOnInit() {
		let counter = 200;

		this.interval = () => {
			counter -= counter * 0.15;

			if(this.counter <= 99) {
				this.counter++;
				const bar = document.getElementById('bar')
				if (bar) { bar.style.width = `${this.counter}%` }
			} else {
				const loader = document.querySelector('.app-loader')
				if (loader) { loader.classList.add('animate') }
				this.loaded.emit(true)
				return
			}
			setTimeout(this.interval, counter)
		}
		this.interval()
	}

	ngOnDestroy() {
		clearInterval(this.interval)
	}
}
