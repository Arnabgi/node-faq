import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  constructor(
    private route: Router,
    private http: HttpService,
  ){}
  addQuestion(){
    this.route.navigateByUrl('/faq-add-question');
  }
  addAnswer(){
    this.route.navigateByUrl('/faq-add-answer');
  }
  logOut(){
    this.http.logOut().subscribe((result)=>{
      if(result.status==200){
        this.route.navigateByUrl('/login');
        alert("Logout successfully");
      }
      else{
        this.route.navigateByUrl('/faq');
        alert("Logout Failed!")
      }
    })
  }
}
