import { createReducer, on, Action } from '@ngrx/store';

import * as ServerActions from './server.actions';

export const SERVER_FEATURE_KEY = 'server';

export interface ServerState {
  riivolutionPatchPath?: string;
  riivolutionPatchLoaded?: boolean;
  riivolutionPatchLoadProgress?: number;
  riivolutionPatchLoadError?: string;

  wiiIsoPath?: string;
  wiiIsoLoaded?: boolean;
  wiiIsoLoadProgress?: number;
  wiiIsoLoadError?: string;
}

export interface ServerPartialState {
  readonly [SERVER_FEATURE_KEY]: ServerState;
}

export const initialServerState: ServerState = {};

const reducer = createReducer(
  initialServerState,
  on(ServerActions.initServer, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ServerActions.setLoadRiivolutionPatchProgress, (state, { progress }) => ({
    ...state,
    riivolutionPatchLoadProgress: progress,
    riivolutionPatchLoaded: progress >= 1,
  })),
  on(ServerActions.loadRiivolutionPatch, (state, { filePath }) => ({
    ...state,
    riivolutionPatchPath: filePath,
  })),
  on(ServerActions.loadRiivolutionPatchError, (state, { error }) => ({
    ...state,
    riivolutionPatchLoadError: error.message,
  }))
);

export function serverReducer(state: ServerState | undefined, action: Action) {
  return reducer(state, action);
}
