import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private url = new Subject<string>();

    getUrl(): Observable<string> {
        return this.url.asObservable();
    }

    updateUrl(url: string) {
        this.url.next(url);
    }

    constructor() {
    }
}
