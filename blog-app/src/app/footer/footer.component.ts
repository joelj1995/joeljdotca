import { Component, OnInit } from '@angular/core';
import versionInfo from '../version-info.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  revision: string = versionInfo.revision;

  constructor() { }

  ngOnInit(): void {
  }

}
