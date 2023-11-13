import { Component } from '@angular/core';
import { FEATURE_PORTFOLIO } from 'src/app/model/features';
import { FeatureService } from 'src/app/services/feature.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private feature: FeatureService
  ) { }

  showProjects() {
    return this.feature.get(FEATURE_PORTFOLIO);
  }

}
