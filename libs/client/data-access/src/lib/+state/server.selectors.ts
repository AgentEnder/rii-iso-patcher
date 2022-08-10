import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SERVER_FEATURE_KEY,
  ServerState,
} from './server.reducer';

// Lookup the 'Server' feature state managed by NgRx
export const getServerState =
  createFeatureSelector<ServerState>(SERVER_FEATURE_KEY);

export const getRiivolutionPatchLoadProgress = createSelector(getServerState, (s) => s.riivolutionPatchLoadProgress)