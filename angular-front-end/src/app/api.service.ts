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



    // get all the submissions belongs to student 
    getSubmissions(user_id: string) {
        const query = {author_id: user_id};
        return this.http.get("http://localhost:3000/api/works/submissions/all", query)
            .map(res => res.json().data);
    }


    // @kevin this might be helpfull, change them it they are wrong 
    getOneSubmission(sub_id: string) {
        const query = {submission_id : sub_id}; // hardcode sub_id
        return this.http.get("http://localhost:3000/api/works/submissions", query)
            .map(res => res.json().data);    
    }

    // get all annotations of one submission
    getAnnotations(user_id: string, sub_id: string) {
        const query = {submission_id : sub_id, review_by : user_id};
        return this.http.get("http://localhost:3000/api/works/annotations", query)
            .map(res => res.json().data);
    }


    // get the actual code of the submission
    getCode(subf_id: string) {
        const query = {submission_file_id : subf_id};
        return this.http.get("http://localhost:3000/api/works/submissions/files", query)
            .map(res => res.json().data);
    }

    // // get all the feedbacks of on submission
    // getFeedbacks(user_id: string, sub_id: string) {
    //     const query = {submission_id : sub_id, review_by : user_id};
    //     return this.http.get("http://localhost:3000/api/works/annotations", query)
    //         .map(res => res.json().data);
    // }


}