import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar-user-info',
  templateUrl: './topbar-user-info.component.html',
  styleUrls: ['./topbar-user-info.component.scss']
})
export class TopbarUserInfoComponent implements OnInit {
  public hasLogin: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
