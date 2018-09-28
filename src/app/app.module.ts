import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BlockComponent } from './block/block.component';
import { TimerComponent } from './timer/timer.component';
import { EditorComponent } from './editor/editor.component';
import { ExpLoaderComponent } from './exp-loader/exp-loader.component';
import {FileService} from './services/file.service';
import { ExperimentComponent } from './experiment/experiment.component';
import {HelperService} from './services/helper.service';

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    TimerComponent,
    EditorComponent,
    ExpLoaderComponent,
    ExperimentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    NgbModule
  ],
  providers: [FileService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
