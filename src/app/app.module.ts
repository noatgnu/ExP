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
import { ExpEditorComponent } from './exp-editor/exp-editor.component';
import {RouterModule, Routes} from '@angular/router';
import { ExperimentRunComponent } from './experiment-run/experiment-run.component';
import { HomeComponent } from './home/home.component';
import {TimerService} from './services/timer.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { PrintComponent } from './print/print.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'run/:id', component: ExperimentRunComponent},
  {path: 'print/:id', component: PrintComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,
    TimerComponent,
    EditorComponent,
    ExpLoaderComponent,
    ExperimentComponent,
    ExpEditorComponent,
    ExperimentRunComponent,
    HomeComponent,
    PrintComponent
  ],
  entryComponents: [ExpEditorComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes, {useHash: true}
    )
  ],
  providers: [FileService, HelperService, TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
