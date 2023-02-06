import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private route: Router,
    private storage: StorageService
  ){}
  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(){
   this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
   })
  }

  SignIn(){
    const data = this.loginForm.value;
    if(data){
      this.http.sendLoginData(data).subscribe((result) => {
      if(result.status == 200){
        this.storage.setToken(result.data);
        console.log("login success");
        this.route.navigateByUrl('/faq')
      }
      else{
        console.log("login Failed"); 
      }
      })
    }
    else{
      console.log("login Failed"); 
    }
  }
}
