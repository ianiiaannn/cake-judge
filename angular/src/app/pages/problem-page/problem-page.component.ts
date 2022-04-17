import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-problem-page',
  templateUrl: './problem-page.component.html',
  styleUrls: ['./problem-page.component.scss']
})
export class ProblemPageComponent implements OnInit {

  problem: any;
  form!: FormGroup;
  pageReady: boolean = false;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      problemid: ['', Validators.required],
      code: ['', Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      this.http.get('/api/showProblem?name=' + params['problemid'],
        {
          observe: 'response',
          responseType: 'json'
        }).subscribe({
          next: (res: HttpResponse<any>) => {
            this.problem = res.body;
            this.problemid?.setValue(this.problem.id);
            this.pageReady = true;
          },
          error: (err: HttpErrorResponse) => {
            this.error = true;
            console.log(err);
          }
        });
    });
  }

  get problemid() { return this.form.get('problemid'); }
  get code() { return this.form.get('code'); }

  submit() {
    this.http.post('/api/submit', this.form.value, {
      observe: 'response',
      responseType: 'json'
    }).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.status === 200) {
          window.location.href = '/Submissions';
          return;
        }
      }
    });
  }
}
