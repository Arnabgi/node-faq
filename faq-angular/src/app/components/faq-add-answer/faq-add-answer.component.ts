import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faq-add-answer',
  templateUrl: './faq-add-answer.component.html',
  styleUrls: ['./faq-add-answer.component.css']
})
export class FaqAddAnswerComponent implements OnInit {
  faqAnswerForm!: FormGroup
  constructor(
    private fb : FormBuilder
  ){
  }
  ngOnInit(): void {
    this.initForm();
  }
  get faqAnswer() : FormArray{
    return this.faqAnswerForm.get('faqAnswer') as FormArray;
  }
  initForm(){
    this.faqAnswerForm = this.fb.group({
      faqAnswer: this.fb.array([
        this.fb.group({
          question:[''],
          answer:['']
        })
      ])
    })
  }
  addFields(){
    const val =this.fb.group({
      question : [''],
      answer : ['']
    });
    this.faqAnswer.push(val);
  }

  removeFields(i:any){
    this.faqAnswer.removeAt(i);
  }
}
