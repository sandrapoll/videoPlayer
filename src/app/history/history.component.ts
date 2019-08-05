import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'History',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

    url;
    subscription;
    httpData;
    videoUrl;

    constructor(private messageService: MessageService, private http: HttpClient) {
        this.subscription = this.messageService.getUrl()
            .subscribe(url => this.url = url);
    }

    play(url) {
        this.videoUrl = url;
        this.messageService.updateUrl(this.videoUrl);
    }

    ngOnInit() {
        this.http.get('http://localhost/getHistory.php')
            .subscribe((data) => this.displayData(data));
    }

    displayData(data) {
        this.httpData = data;
    }
}
