import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-faq-add-question',
  templateUrl: './faq-add-question.component.html',
  styleUrls: ['./faq-add-question.component.css']
})
export class FaqAddQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.questionForm = this.fb.group({
      question:['', Validators.required]
    })
  }
  addQuestion(){
    let data = this.questionForm.value;
    this.http.sendQuestionData(data).subscribe((result) => {
      if(result.status == 200){
        console.log("Question added successfully");
        this.route.navigateByUrl('/faq');
      }
      else{
        console.log("Question added failed");
        
      }
    })
  }
}
