import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJoeljcaLibComponent } from './ngx-joeljca-lib.component';

describe('NgxJoeljcaLibComponent', () => {
  let component: NgxJoeljcaLibComponent;
  let fixture: ComponentFixture<NgxJoeljcaLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxJoeljcaLibComponent]
    });
    fixture = TestBed.createComponent(NgxJoeljcaLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
