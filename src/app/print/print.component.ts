import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Exp} from '../classes/exp';
import {ExpBlock} from '../classes/exp-block';
import {FileService} from '../services/file.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  id;
  experiment: Exp;
  constructor(private route: ActivatedRoute, private fileService: FileService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    const e = JSON.parse(localStorage.getItem(this.id));
    const experiment = new Exp('', []);
    for (const i of Object.keys(e)) {
      if (e.hasOwnProperty(i)) {
        experiment[i] = e[i];
      }
    }
    experiment.Blocks = [];
    this.fileService.extractProperties(e.Blocks, experiment.Blocks, ExpBlock);
    this.experiment = experiment;
  }

}
