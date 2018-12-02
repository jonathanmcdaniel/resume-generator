import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class GenerateService {
  constructor(private http: HttpClient) { }

  getLocalURL(){
    let localIP = window.location.origin.toString().split(":");
    let retVal = localIP[0]+":"+localIP[1];
    return retVal;
  }

  postResumeData(json, template): Observable<String> {
    return this.http.post<any>(this.getLocalURL()+":3000/generate/" + template + "/pdf-online", json, httpOptions);
  }

  handleError(data) {
    console.error(data);
  }
}