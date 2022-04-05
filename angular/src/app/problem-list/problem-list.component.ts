import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import DataTable from 'datatables.net';
@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  theList: any[]=[];
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.http.get('/api/problems',
        {
          observe: 'response',
          responseType: 'json'
        }).subscribe((res: any) => {
          console.log(res.body);
          $('#table').DataTable(
            {
              data: res.body,
            }
          );
        }, (err: any) => {
          console.log(err);
        });
    });
  }

}

