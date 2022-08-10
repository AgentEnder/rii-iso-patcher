import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getRiivolutionPatchLoadProgress,
  loadRiivolutionPatch,
} from '@rii-iso-patcher/client/data-access';
import { tap } from 'rxjs';

@Component({
  selector: 'rii-iso-patcher-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  progress$ = this.store.select(getRiivolutionPatchLoadProgress).pipe(tap((p => {
    console.log(p);
    // this.changeDetectorRef.detectChanges();
  })));

  constructor(private store: Store, private changeDetectorRef: ChangeDetectorRef) {}

  loadIsoFile(file: string) {
    this.store.dispatch(loadRiivolutionPatch({ filePath: file }));
  }
}
