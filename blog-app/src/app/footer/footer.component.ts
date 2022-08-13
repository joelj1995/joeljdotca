import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  revision: string = (window as any).serverInfo.revision;

  constructor() { }

  ngOnInit(): void {
  }

}
