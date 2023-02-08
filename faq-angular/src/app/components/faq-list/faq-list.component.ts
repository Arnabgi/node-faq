import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {
  public listValue!: any;
  constructor(
    private http : HttpService,
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
    console.log("id.........",id);
    console.log("answerId.........",answerId);
    
    this.http.delete({id:id, questionId:answerId}).subscribe((result) => {
      console.log("result........",result);
      console.log("result..........",result.msg);
    })
  }
}
