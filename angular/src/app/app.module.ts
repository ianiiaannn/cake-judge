import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IndexComponent } from './pages/index/index.component';
import { RouterModule } from '@angular/router';
import { ProblemListComponent } from './pages/problem-list/problem-list.component';
import { ProblemPageComponent } from './pages/problem-page/problem-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TopbarUserInfoComponent } from './topbar-user-info/topbar-user-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    IndexComponent,
    ProblemListComponent,
    ProblemPageComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    TopbarUserInfoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: IndexComponent },
      { path: 'Problems', component: ProblemListComponent },
      { path: 'ShowProblem', component: ProblemPageComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'InsertUser', component: RegisterComponent },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', redirectTo: '/404' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
