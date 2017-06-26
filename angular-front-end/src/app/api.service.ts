import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }


    getPost(): Observable<any> {
        return this.http.get("https://jsonplaceholder.typicode.com/posts")
            .map(res => res.json());
    }

    // get all the students
    getStudents() {
        return this.http.get("http://localhost:3000/api/users/students/all")
            .map(res => res.json().data);
    }

    // get all the works
    getWorks() {
        return this.http.get("http://localhost:3000/api/works/all")
            .map(res => res.json().data);
    }

    // create a new work
    createNewWork(name: string, num_peers: number) {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http
            .put("http://localhost:3000/api/works", JSON.stringify({name: name, num_peers: num_peers}), {headers: this.headers});
    }




}