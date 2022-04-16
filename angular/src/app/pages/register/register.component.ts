import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;

  public badRequest: boolean = false;
  public conflict: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      displayName: ['', Validators.required],
    });
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get email() { return this.form.get('email'); }
  get displayName() { return this.form.get('displayName'); }

  login() {
    this.http.post('/api/register', this.form.value,
      {
        observe: 'response',
        responseType: 'json'
      }).subscribe((res: HttpResponse<Object>) => {
        this.badRequest = false;
        this.conflict = false;
        if (res.status === HttpStatusCode.Created) {
          window.location.href = '/';
        }
        if (res.status === HttpStatusCode.BadRequest) {
          this.badRequest = true;
        }
        if (res.status === HttpStatusCode.Conflict) {
          this.conflict = true;
        }
      }
      );
  }
}
