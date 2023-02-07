import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqAddAnswerComponent } from './components/faq-add-answer/faq-add-answer.component';
import { FaqAddQuestionComponent } from './components/faq-add-question/faq-add-question.component';
import { FaqComponent } from './components/faq/faq.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: "", component:LoginComponent},
  {path:"faq",component:FaqComponent},
  {path:"faq-add-question",component:FaqAddQuestionComponent},
  {path:"faq-add-answer",component:FaqAddAnswerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
