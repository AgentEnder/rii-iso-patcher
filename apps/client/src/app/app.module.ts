import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FileInputComponent } from './components/file-input/file-input/file-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, FileInputComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
