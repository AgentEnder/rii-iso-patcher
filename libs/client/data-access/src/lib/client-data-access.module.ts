import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromServer from './+state/server.reducer';
import { ServerEffects } from './+state/server.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromServer.SERVER_FEATURE_KEY,
      fromServer.serverReducer
    ),
    EffectsModule.forFeature([ServerEffects]),
  ],
})
export class ClientDataAccessModule {}
