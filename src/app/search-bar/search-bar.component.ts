import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        /*'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, ' +
            'Access-Control-Request-Method, Access-Control-Request-Headers'*/
    })
};

@Component({
    selector: 'searchBar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    videoUrl;
    urlForm = new FormGroup({
        url: new FormControl('', Validators.required),
    });

    constructor(private messageService: MessageService, private http: HttpClient) {
    }

    ngOnInit() {
    }

    public onSubmit(): void {
        this.videoUrl = this.urlForm.value.url;
        this.messageService.updateUrl(this.videoUrl);
        this.http.post('http://localhost/post.php',
            {
                url: this.videoUrl
            }, httpOptions
        ).subscribe();
    }
}
