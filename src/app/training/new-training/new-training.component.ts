/* tslint:disable:no-unused-expression */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

import {Exercise} from '../exercise.model';
import {TrainingService} from '../training.service';
import {UiService} from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.exerciseSubscription = this.trainingService
      .exercisesChanged
      .subscribe(exercises => this.exercises = exercises);
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  startTraining(form: NgForm): any {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    !!this.exerciseSubscription && this.exerciseSubscription.unsubscribe();
  }
}
