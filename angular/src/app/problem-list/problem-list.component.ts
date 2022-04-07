import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.scss']
})
export class ProblemListComponent implements OnInit {
  theList: any[] = [];
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
          $('#dataTable').DataTable(
            {
              autoWidth: true,
              paging: true,
              search: false,
              info: false,
              scrollX: false,
              data: res.body,
              columns: [
                {
                  data: 'title', title: 'Title',
                  "render": function (data, type, row, meta) {
                    if (type === 'display') {
                      data = '<a [routerLink]="ShowProblem?problemid=' + row.name + '">' + data + '</a>';
                    }
                    return data;
                  }
                },
                { data: 'clickSum', title: 'Click Sum' },
                { data: 'difficulty', title: 'Difficulty' },
                { data: 'tags', title: 'Tags' },
                { data: 'reference', title: 'Reference' },
              ]
            }
          );
        }, (err: any) => {
          console.log(err);
        });
    });
  }

}

