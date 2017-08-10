import { Headers, Http, URLSearchParams, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }


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
  createNewWork(query) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http
      .put("http://localhost:3000/api/works", JSON.stringify(query), {headers: this.headers});
  }

  // edit a new work
  editWork(query) {
    delete query.status;
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http
      .post("http://localhost:3000/api/works", JSON.stringify(query), {headers: this.headers});
  }

  // delete a work
  deleteWork(query) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http
      .delete("http://localhost:3000/api/works", {headers: this.headers, body: query});
  }

  // return a list of user_id that is going to review
  getToReview(work_id:string, user_id: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('work_id', work_id);
    params.set('review_by', user_id);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get("http://localhost:3000/api/works/feedbacks/all", RequestOptions)
      .map(res => res.json().data)
      .map(res => res.author);
  }

  // return a list of user_id that are reviewed by
  getReviewBy(work_id:string, user_id: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('work_id', work_id);
    params.set('author', user_id);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get("http://localhost:3000/api/works/feedbacks/all", RequestOptions)
      .map(res => res.json().data)
      .map(res => res.review_by);
  }

  // return a list of user_id that is going to review
  getToMark(work_id:string, user_id: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('work_id', work_id);
    params.set('mark_by', user_id);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get("http://localhost:3000/api/works/feedbacks/all", RequestOptions)
      .map(res => res.json().data)
      .map(res => res.author);
  }

  // get all the submissions belongs to student
  getSubmissions(work_id: string, user_id: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('work_id', work_id);
    params.set('user_id', user_id);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get("http://localhost:3000/api/works/submissions/all", requestOptions)
      .map(res => res.json().data);
  }

  // get the actual code of the submission
  getCode(subf_id: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('submission_file_id', subf_id);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get("http://localhost:3000/api/works/submissions/files", requestOptions)
      .map(res => res.json().data);
  }

  // get all annotations of one submission
  getAnnotations(user_id: string, sub_id: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('submission_id', sub_id);
    params.set('user_id', user_id);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get("http://localhost:3000/api/works/annotations", requestOptions)
      .map(res => res.json().data);
  }

  // get all the feedbacks of one submission
  getFeedbacks(sub_id: string, user_id: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('submission_id', sub_id);
    params.set('author', user_id);

    let requestOptions = new RequestOptions();
    requestOptions.params = params;

    return this.http.get("http://localhost:3000/api/works/feedbacks/all", requestOptions)
      .map(res => res.json().data);
  }

  // // get one submission
  // getOneSubmission(sub_id: string) {
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('submission_id', sub_id);

  //   let requestOptions = new RequestOptions();
  //   requestOptions.params = params;

  //   return this.http.get("http://localhost:3000/api/works/submissions", requestOptions)
  //     .map(res => res.json().data);
  // }
}
