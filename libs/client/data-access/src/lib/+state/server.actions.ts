import { createAction, props } from '@ngrx/store';
import {
  LoadRiivolutionModErrorPayload,
  LoadRiivolutionModPayload,
  LoadRiivolutionModProgressPayload,
  LOAD_RIIVOLUTION_MOD,
  LOAD_RIIVOLUTION_MOD_ERROR,
  LOAD_RIIVOLUTION_MOD_PROGRESS,
} from '@rii-iso-patcher/shared/action-types';

export const initServer = createAction('[Server Page] Init');

export const setLoadRiivolutionPatchProgress = createAction(
  LOAD_RIIVOLUTION_MOD_PROGRESS,
  props<LoadRiivolutionModProgressPayload>()
);

export const loadRiivolutionPatch = createAction(
  LOAD_RIIVOLUTION_MOD,
  props<LoadRiivolutionModPayload>()
);

export const loadRiivolutionPatchError = createAction(
  LOAD_RIIVOLUTION_MOD_ERROR,
  props<LoadRiivolutionModErrorPayload>()
);
