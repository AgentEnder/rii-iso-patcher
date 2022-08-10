import {
  IpcMessageBody,
  IPC_MESSAGE,
  LoadRiivolutionModProgressPayload,
  LOAD_RIIVOLUTION_MOD,
  LOAD_RIIVOLUTION_MOD_PROGRESS,
} from '@rii-iso-patcher/shared/action-types';
import { Subject, Subscription } from 'rxjs';
import type { IpcRenderer, IpcRendererEvent } from 'electron';

export class MockIpcRenderer implements Partial<IpcRenderer> {
  private sentMessages$ = new Subject<IpcMessageBody>();
  private recievedMessages$ = new Subject<IpcMessageBody>();

  private subscription: Subscription = new Subscription();

  constructor() {
    this.sentMessages$.subscribe((action) => {
      switch (action.type) {
        case LOAD_RIIVOLUTION_MOD: {
          let progress = 0;
          const interval = setInterval(() => {
            progress = Math.min(1, progress + Math.random() / 4);
            this.recievedMessages$.next({
              type: LOAD_RIIVOLUTION_MOD_PROGRESS,
              payload: {
                progress,
              },
            } as IpcMessageBody<LoadRiivolutionModProgressPayload>);
            if (progress >= 1) {
              clearInterval(interval);
            }
          }, 400);
        }
      }
    });
  }

  send(_: typeof IPC_MESSAGE, message: IpcMessageBody) {
    this.sentMessages$.next(message);
  }

  on(
    _: typeof IPC_MESSAGE,
    callback: (event: IpcRendererEvent, ...args: [IpcMessageBody]) => void
  ): IpcRenderer {
    this.subscription.add(
      this.recievedMessages$.subscribe((ipcMessage) =>
        callback({} as IpcRendererEvent, ipcMessage)
      )
    );
    return this as unknown as IpcRenderer;
  }
}
