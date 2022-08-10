import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IpcMessageBody,
  IPC_MESSAGE,
  LoadRiivolutionModProgressPayload,
  LOAD_RIIVOLUTION_MOD_PROGRESS,
} from '@rii-iso-patcher/shared/action-types';
import type { IpcRenderer } from 'electron';
import { EMPTY } from 'rxjs';
import { setLoadRiivolutionPatchProgress } from '../+state/server.actions';
import { MockIpcRenderer } from './mock-ipc-renderer';

@Injectable({ providedIn: 'root' })
export class ElectronCommunicationsService {
  private ipcRenderer?: typeof import('electron').ipcRenderer;

  ipcEvents$ = EMPTY;

  constructor(private store: Store) {
    if (window['require']) {
      this.ipcRenderer = window['require']('electron').ipcRenderer;
    } else {
      this.ipcRenderer = new MockIpcRenderer() as unknown as IpcRenderer;
    }
    this.ipcRenderer.on(IPC_MESSAGE, (e, action: IpcMessageBody) => {
      console.log('CLIENT', action);
      switch (action.type) {
        case LOAD_RIIVOLUTION_MOD_PROGRESS:
          this.store.dispatch(
            setLoadRiivolutionPatchProgress(
              (action as IpcMessageBody<LoadRiivolutionModProgressPayload>)
                .payload
            )
          );
          break;
      }
    });
  }

  dispatch(action: IpcMessageBody) {
    if (this.ipcRenderer) {
      console.log('Sending: ', action);
      this.ipcRenderer.send(IPC_MESSAGE, action);
    } else {
      throw new Error('ipcRenderer is not defined!');
    }
  }
}
