import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Component({
    selector: 'Bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
    url;
    subscription;
    count;
    bookmarks;
    clicked = false;

    constructor(private messageService: MessageService, private http: HttpClient) {
        this.subscription = this.messageService.getUrl()
            .subscribe(url => this.url = url);
    }

    ngOnInit() {
        this.http.get('http://localhost/getBookmarkCount.php')
            .subscribe((data) => this.displayData(data));
    }

    displayData(data) {
        this.count = data;
    }

    bookmark() {
        if (this.url !== undefined) {
            this.http.post('http://localhost/postBookmark.php',
                {
                    url: this.url
                }, httpOptions
            ).subscribe();
            location.reload();
        } else {
            this.count = 'Please enter or select video url!';
            setTimeout(location.reload.bind(location), 2000);
        }
    }

    showBookmarks(data) {
        this.http.get('http://localhost/getBookmarks.php')
            .subscribe((data) => this.showBookmarks(data));
        this.clicked = true;
        this.bookmarks = data;
    }

    closeBookmarks() {
        this.clicked = false;
        location.reload();
    }

}
