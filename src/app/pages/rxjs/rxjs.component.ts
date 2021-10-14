import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';
@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit,OnDestroy {
	public intervalSub!: Subscription; 

	constructor() {

		// this.getObservable().subscribe(
		// 	(res) => {
		// 		console.log("las repuestas", res);
		// 	}, (err) => {
		// 		console.log(err);

		// 	}, () => {
		// 		console.log("se completo el observable");

		// 	});
		this.intervalSub=this.getInterval().subscribe(console.log);


	}
	ngOnDestroy(): void {
		this.intervalSub.unsubscribe();
	}

	ngOnInit(): void {
	}
	public getInterval() {
		const interval$ = interval(500).pipe(
			//take(10),
			map(response => response + 1),
			filter((res) => res % 2 == 0 ? true : false),
			)

		return interval$;
	}
	public getObservable(): Observable<number> {
		let i = -1;
		const obs$ = new Observable<number>
			(observer => {
				const interval = setInterval(() => {
					i++;
					observer.next(i)
					if (i == 4) {
						observer.complete();
						clearInterval(interval)
					}
					if (i == 6) {
						observer.error("llego al valor de 2");
					}
				}, 1000)
			})
		return obs$;
	}

}
