import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getRiivolutionPatchLoadProgress,
  loadRiivolutionPatch,
} from '@rii-iso-patcher/client/data-access';

@Component({
  selector: 'rii-iso-patcher-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  progress$ = this.store.select(getRiivolutionPatchLoadProgress);

  constructor(private store: Store) {}

  loadIsoFile(file?: string) {
    if (file) { 
      this.store.dispatch(loadRiivolutionPatch({ filePath: file }));
    }
  }
}
