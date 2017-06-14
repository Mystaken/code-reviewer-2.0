import { Injectable } from '@angular/core'
import { Http } from '@angular/http'


@Injectable()
export class WorkTableService {

    constructor(private _http: Http) { }


    getPost(): Promise<any> {
        return this._http.get("https://jsonplaceholder.typicode.com/posts")
            .toPromise()
            .then(response => response.json());
    }
}