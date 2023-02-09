import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css']
})
export class EditAnswerComponent implements OnInit{
  answerForm!:FormGroup;
  answerId:any;
  data:any;
  public answerInfo : Observable<any> = this.activatedRoute.paramMap.pipe(
    switchMap(params=>{
      this.answerId = params.get('id');
      return this.http.viewAnswer(this.answerId) ;
    })
  );
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router,
    public activatedRoute: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.initForm();
    this.patchAnswer();
  }
  initForm(){
    this.answerForm = this.fb.group({
      answer:['']
    })
  }
  patchAnswer(){
    this.answerInfo.subscribe((result)=>{
      console.log(result.data);
      this.data = result.data;
      this.answerForm.patchValue({
        answer: this.data[0].answers
      })
    })
  }
  editData(){
    const value = this.answerForm.value;
    this.http.editAnswer(this.answerId,value).subscribe((result) =>{
      console.log("result.........",result);
      if(result){
        alert("data updated successfully");
        this.route.navigateByUrl('/faq-list');
      }
      else{
        alert("error");
      }
    })
  }
}
