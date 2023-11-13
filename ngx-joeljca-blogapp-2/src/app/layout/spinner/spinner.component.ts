import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.tasks$.subscribe(tasks => this.spinning = tasks > 0);
  }

  spinning = false;

}
