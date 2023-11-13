import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  dec() {
    this.tasks--;
    this.tasksSubject$.next(this.tasks);
  }

  inc() {
    this.tasks++;
    this.tasksSubject$.next(this.tasks);
  }

  get tasks$() { return this.tasksSubject$.asObservable(); }

  private tasks: number = 0;
  private tasksSubject$ = new BehaviorSubject(this.tasks);
}
