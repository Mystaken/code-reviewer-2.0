import { Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
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
        let params: URLSearchParams = new URLSearchParams();
        params.set('user_id', user_id);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;
        
        return this.http.get("http://localhost:3000/api/works/submissions/all", requestOptions)
            .map(res => res.json().data);
    }

    // get one submission 
    getOneSubmission(sub_id: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('submission_id', sub_id);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;

        return this.http.get("http://localhost:3000/api/works/submissions", requestOptions)
            .map(res => res.json().data);    
    }

    // get all annotations of one submission
    getAnnotations(user_id: string, sub_id: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('submission_id', sub_id);
        params.set('review_by', user_id);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;

        return this.http.get("http://localhost:3000/api/works/annotations", requestOptions)
            .map(res => res.json().data);
    }


    // // get the actual code of the submission
    // getCode(subf_id: string) {
    //     let params: URLSearchParams = new URLSearchParams();
    //     params.set('submission_id', sub_id);

    //     let requestOptions = new RequestOptions();
    //     requestOptions.params = params;
    //     const query = {submission_file_id : subf_id};
    //     return this.http.get("http://localhost:3000/api/works/submissions/files", requestOptions)
    //         .map(res => res.json().data);
    // }

    // get to review list
    getToReview(work_id:string, user_id: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('work_id', work_id);
        params.set('review_by', user_id);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;

        return this.http.get("http://localhost:3000/api/works/feedbacks/all", RequestOptions)
            .map(res => res.json().data);
    }

    // get review_by list
    getReviewBy(work_id:string, user_id: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('work_id', work_id);
        params.set('author', user_id);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;

        return this.http.get("http://localhost:3000/api/works/feedbacks/all", RequestOptions)
            .map(res => res.json().data);
    }

    // get all the feedbacks of on submission
    getFeedbacks(work_id: string, sub_id: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('submission_id', sub_id);
        params.set('review_by', user_id);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;
        const query = {submission_id : sub_id, review_by : user_id};
        return this.http.get("http://localhost:3000/api/works/annotations", query)
            .map(res => res.json().data);
    }



}