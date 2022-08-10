/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  IpcMessageBody,
  LoadRiivolutionModPayload,
  LOAD_RIIVOLUTION_MOD,
} from '@rii-iso-patcher/shared/action-types';
import { mapTo, tap } from 'rxjs';
import { ElectronCommunicationsService } from '../services/electron-communications.service';

import * as ServerActions from './server.actions';
import * as ServerFeature from './server.reducer';

@Injectable()
export class ServerEffects {
  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ServerActions.initServer),
  //     fetch({
  //       run: (action) => {
  //         // Your custom service 'load' logic goes here. For now just return a success action...
  //         return ServerActions.loadServerSuccess({ server: [] });
  //       },
  //       onError: (action, error) => {
  //         console.error('Error', error);
  //         return ServerActions.loadServerFailure({ error });
  //       },
  //     })
  //   )
  // );

  loadRiivolutionPatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServerActions.loadRiivolutionPatch),
      tap((f) => {
        console.log(f);
        this.electronCommunicationsService.dispatch({
          type: LOAD_RIIVOLUTION_MOD,
          payload: {
            filePath: f.filePath,
          },
        } as IpcMessageBody<LoadRiivolutionModPayload>);
      }),
      mapTo(ServerActions.setLoadRiivolutionPatchProgress({ progress: 0 }))
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly electronCommunicationsService: ElectronCommunicationsService
  ) {}
}
