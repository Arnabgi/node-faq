import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-faq-add-question',
  templateUrl: './faq-add-question.component.html',
  styleUrls: ['./faq-add-question.component.css']
})
export class FaqAddQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  answerForm!: FormGroup;
  questionId!:any;
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.initQuestionForm();
    this.initAnswerForm();
  }
  get faqAnswer() : FormArray{
    return this.questionForm.get('faqAnswer') as FormArray;
  }
  initQuestionForm(){
    this.questionForm = this.fb.group({
      question:[''],
      faqAnswer: this.fb.array([
        this.fb.group({
          answers: ['']
        })
      ])
    })
  }
  initAnswerForm(){
    this.answerForm = this.fb.group({
      faqAnswer: this.fb.array([
        this.fb.group({
          //question:[''],
          answers: ['']
        })
      ])
    })
  }
  addFields(){
    const val =this.fb.group({
      //question : [''],
      answers : ['']
    });
    this.faqAnswer.push(val);
  }

  removeFields(i:any){
    this.faqAnswer.removeAt(i);
  }
  
  addQuestion(){
    let saveData = this.questionForm.value;
    console.log("saveData......",saveData);
    
    this.http.sendQuestionData({question:saveData.question}).subscribe((result) => {
      if(result.status == 200){
        this.questionId = result.data.id;
        console.log("questionId..........",this.questionId);
        
        let answerVal = saveData.faqAnswer;
        if(this.questionId){
          answerVal.forEach((dt:any)=>{
          let val = dt.answers;
          let arrayVal = [];
          arrayVal.push(val)
          this.http.sendAnswerData({questionId:this.questionId,answers:arrayVal}).subscribe((res) => {
            console.log("res........",res);
            if(res.status == 200){
              console.log("Faq added successfully");
              this.route.navigateByUrl('/faq');
            }
          })
          })
        }
      }
      else{
        console.log("Faq added failed");
      }
    })
  }
  saveAnswer(questionId:any){
    const saveData = this.questionForm.value;
    const id = questionId;
     const data =this.questionForm.setControl('faqAnswer',this.setArrayValue(saveData,id));
  }
  setArrayValue(jsonData:any,questionId:any) : FormArray{
    const answerValue : FormArray = new FormArray<any>([]);
    if(jsonData.length){
      jsonData.forEach((element:any) => {
        answerValue.push(
            this.fb.group({
              questionId: questionId,
              answers : element.answer,
            })
          )       
      });
    }
    return answerValue;
  }
}
