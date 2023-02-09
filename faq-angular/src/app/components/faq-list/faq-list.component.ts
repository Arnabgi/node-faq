import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {
  public listValue!: any;
  constructor(
    private http : HttpService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.http.list().subscribe((result) => {
      if(result!=null){
        this.listValue = result.data;
        console.log(this.listValue);
        
      }
    })
  }

  deleteFaq(id:any,answerId:any){    
    this.http.delete({id:id, questionId:answerId}).subscribe((result) => {
      this.list();
    })
  }

  deleteFaqQuestion(id:any){
    this.http.deleteQuestion({id:id}).subscribe((result) => {
      this.list();
    });
  }

  editAnswer(id:any){
    this.route.navigateByUrl('/edit-answer/'+id)
  }
}
