import { Component, OnInit } from '@angular/core';
import { FeastureService } from '../services/feasture.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private feature: FeastureService) { }

  feature_subscribeEnabled: boolean = false;

  ngOnInit(): void {
    this.feature.isFeatureEnable('SUBSCRIBE').subscribe(enabled => this.feature_subscribeEnabled = enabled);
  }

}
