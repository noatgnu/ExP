import { Component, OnInit } from '@angular/core';
import {FileService} from '../services/file.service';
import {Observable} from 'rxjs';
import {Exp} from '../classes/exp';
import {ExpBlock} from '../classes/exp-block';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  expObs: Observable<Exp>;
  constructor(private fileService: FileService) {
    this.expObs = this.fileService.experimentSourceReader;
  }

  ngOnInit() {
  }

  exportExperiment(exp: Exp) {
    this.fileService.export(exp);
  }

  typingJson(e) {
    const experiment = new Exp('', []);
    for (const i of Object.keys(e)) {
      if (e.hasOwnProperty(i)) {
        experiment[i] = e[i];
      }
    }
    experiment.Blocks = [];
    this.fileService.extractProperties(e.Blocks, experiment.Blocks, ExpBlock);
    this.fileService.updateExperiment(experiment);
  }

  clearExperiment() {
    this.fileService.updateExperiment(new Exp('Untitled', [new ExpBlock('Untitled')]));
  }
}
