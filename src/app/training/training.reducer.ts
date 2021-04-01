import {SET_AVAILABLE_TRAINING, SET_FINISHED_TRAINING, START_TRAINING, STOP_TRAINING, TrainingActions} from './training.actions';
import {Exercise} from './exercise.model';
import * as fromRoot from '../app.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise[];
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};

export function trainingReducer(
  state = initialState,
  action: TrainingActions): {
    activeTraining: Exercise[];
    availableExercises: Exercise[];
    finishedExercises: Exercise[] } {

  switch (action.type) {
    case SET_AVAILABLE_TRAINING:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAINING:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: action.payload
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: action.payload
      };
    default:
      return { ...state };

  }
}



export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableTraining = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedTraining = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
