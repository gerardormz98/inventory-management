import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: string = "";
  @Input() breadcrumbItems: {name: string, path?: string}[] = [];
  @Input() backUrl: string = "";

  constructor() { }

  ngOnInit(): void {
    
  }
}
