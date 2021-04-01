import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {TrainingComponent} from './training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingComponent} from './past-training/past-training.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {StopTrainingComponent} from './stop-training/stop-training.component';
import {AngularFireModule} from '@angular/fire';
import {SharedModule} from '../shared/shared.module';
import {TrainingRoutingModule} from './training-routing.module';
import {trainingReducer} from './training.reducer';



@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    MatSortModule,
    MatPaginatorModule,
    AngularFireModule,
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ]
})
export class TrainingModule { }
