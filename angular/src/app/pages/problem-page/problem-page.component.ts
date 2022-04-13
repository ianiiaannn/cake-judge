import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-problem-page',
  templateUrl: './problem-page.component.html',
  styleUrls: ['./problem-page.component.scss']
})
export class ProblemPageComponent implements OnInit {
  public problem: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.http.get('/api/showProblem?name=' + params['problemid'],
        {
          /* params: {
            name: this.route.queryParams.pipe().subscribe(params => params['name']),
          }, */
          observe: 'response',
          responseType: 'json'
        }).subscribe((res: any) => {
          this.problem = res.body;
          console.log(res.body);

        }, (err: any) => {
          console.log(err);
        });
    });
  }
}
