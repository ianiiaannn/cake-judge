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
    this.route.queryParams.subscribe(params => {
      this.http.get('/api/problems?query='+params['query'],
        {
          observe: 'response',
          responseType: 'json'
        }).subscribe((res: any) => {
          console.log(res.body);
          // $('#dataTable').DataTable().destroy();
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
                  render : function (data, type, row, meta) {
                    if (type === 'display') {
                      // data= '<a onClick="this.router.navigate(\'ShowProblem\','+ row.name+')">' + data + '</a>';
                      data = '<a [routerLink]="[\'ShowProblem\']" [queryParams]="{problemid: ' + row.name + '}" href="ShowProblem?problemid='+ row.name +'">' + data + '</a>';
                    }
                    return data;
                  }
                },
                { data: 'clickSum', title: 'Click Sum' },
                { data: 'difficulty', title: 'Difficulty' },
                { data: 'tags', title: 'Tags' },
                { data: 'reference', title: 'Reference' },
              ],
            }
          ).clear().rows.add(res.data).draw();
        }, (err: any) => {
          console.log(err);
        });
    });
  }

}

