import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }
  sendLoginData(logData:any) : Observable<any> {
    return this.http.post('http://localhost:5001/faq-route/signIn',logData);
  }
  sendQuestionData(questionData:any) : Observable<any> {
    return this.http.post('http://localhost:5001/faq-route/createFaq',questionData);
  }
  sendAnswerData(answerData:any) : Observable<any> {
    return this.http.post('http://localhost:5001/faq-route/createFaqAnswer',answerData);
  }
  list() : Observable<any> {
    return this.http.get('http://localhost:5001/faq-route/faq');
  }
  delete(data:any): Observable<any> {
    return this.http.delete('http://localhost:5001/faq-route/faq',{
      body: data
    });
  }
}
