import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  get account(){return this.form.get('account');}
  get password(){return this.form.get('password');}

  login(){
    console.debug(this.form.value);
    console.debug(this.account);
  }
}
