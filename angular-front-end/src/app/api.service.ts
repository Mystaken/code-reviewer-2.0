import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

    constructor(private _http: Http) { }


    getPost(): Observable<any> {
        return this._http.get("https://jsonplaceholder.typicode.com/posts")
            .map(res => res.json());
    }

    // get all the students
    getStudents() {
        return this._http.get("http://localhost:3000/api/users/students/all")
            .map(res => res.json().data);
    }

    // get all the works
    getWorks() {
        return this._http.get("http://localhost:3000/api/works/all")
            .map(res => res.json().data);
    }


}