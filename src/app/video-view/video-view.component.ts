import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {EmbedVideoService} from 'ngx-embed-video/dist';

@Component({
    selector: 'videoView',
    templateUrl: './video-view.component.html',
    styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {
    url: string;
    subscription;

    constructor(private messageService: MessageService, public embedService: EmbedVideoService) {
        this.subscription = this.messageService.getUrl()
            .subscribe(url => this.url = url);
    }

    getHTML() {
        if (this.url !== undefined) {
            return this.embedService.embed(this.url, {
                attr: {width: 700, height: 340}
            });
        } else {
            return '';
        }
    }

    ngOnInit() {
    }
}
