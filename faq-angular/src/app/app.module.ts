import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FaqComponent } from './components/faq/faq.component';
import { LoginComponent } from './components/login/login.component';
import { FaqAddQuestionComponent } from './components/faq-add-question/faq-add-question.component';
import { InterceptorService } from './services/interceptor.service';
import { FaqAddAnswerComponent } from './components/faq-add-answer/faq-add-answer.component';
@NgModule({
  declarations: [
    AppComponent,
    FaqComponent,
    LoginComponent,
    FaqAddQuestionComponent,
    FaqAddAnswerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
