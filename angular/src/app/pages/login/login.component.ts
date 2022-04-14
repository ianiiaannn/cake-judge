import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public wrongRequest: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  login() {
    this.http.post('/api/login', this.form.value,
      {
        observe: 'response',
        responseType: 'json'
      }).subscribe((res: HttpResponse<Object>) => {
        console.debug(res.body);
        if (res.status == 200) {
          window.location.href = '/';
        }
        if (res.status == 401) {
          this.wrongRequest = true;
        }
      }
      );
  }
}
