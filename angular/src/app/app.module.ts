import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IndexComponent } from './index/index.component';
import { QuestionsComponent } from './questions/questions.component';
import { RouterModule } from '@angular/router';
import { ProblemListComponent } from './problem-list/problem-list.component';
import { ProblemPageComponent } from './problem-page/problem-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    IndexComponent,
    QuestionsComponent,
    ProblemListComponent,
    ProblemPageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'Problems', component: ProblemListComponent },
      { path: 'ShowProblem', component: ProblemPageComponent },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', redirectTo: '/404' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
