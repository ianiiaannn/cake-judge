import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';

@Component({
  selector: 'app-problem-page',
  templateUrl: './problem-page.component.html',
  styleUrls: ['./problem-page.component.scss'],
})
export class ProblemPageComponent implements OnInit {
  problem: any;
  form!: FormGroup;
  pageReady: boolean = false;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.http
        .get('/api/showProblem?name=' + params['problemid'], {
          observe: 'response',
          responseType: 'json',
        })
        .subscribe({
          next: (res: HttpResponse<any>) => {
            this.problem = res.body;
            this.problem.problemid = res.body.name;
            this.form = this.fb.group({
              problemid: [params['problemid'], Validators.required],
              code: ['', Validators.required],
              language: ['cpp', Validators.required],
            });
            this.pageReady = true;
          },
          error: (err: HttpErrorResponse) => {
            this.error = true;
            console.log(err);
          },
        });
    });
  }

  get problemid() {
    return this.form.get('problemid');
  }
  get code() {
    return this.form.get('code');
  }
  get language() {
    return this.form.get('language');
  }

  submit() {
    console.log(this.form.value);
    this.http
      .post('/api/problems/ans', this.form.value, {
        observe: 'response',
        responseType: 'json',
      })
      .subscribe({
        next: (res: HttpResponse<any>) => {
          console.log(this.form.value);
          if (res.status === 201) {
            window.location.href = '/Submissions';
            return;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }
}
