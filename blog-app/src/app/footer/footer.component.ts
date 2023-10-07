import { Component, OnInit } from '@angular/core';
import { JoelJConstants } from '../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  serverInfo() {
    if (!JoelJConstants.isServer)
      return (window as any).serverInfo;
    else 
      return { node: "ssr", slot: "ssr", version: "ssr" };
  }

}
