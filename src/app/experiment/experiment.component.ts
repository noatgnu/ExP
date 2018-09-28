import { Component, OnInit, OnDestroy } from '@angular/core';
import {Exp} from '../classes/exp';
import {ExpBlock} from '../classes/exp-block';
import {Subscription} from 'rxjs';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {
  experiment = new Exp('Untitled', [new ExpBlock('Untitled')]);
  updateSubscription: Subscription;
  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.summarize();
    this.updateSubscription = this.helper.updateTrigger.subscribe((data) => {
      if (data) {
        this.summarize();
      }
    });
  }

  private summarize() {
    this.experiment.totalTime = this.experiment.CalculateTotalTime();
    this.experiment.totalMaterial = this.experiment.CalculateTotalMaterials();
    this.experiment.totalBlocks = this.experiment.CalculateTotalBlocks();
  }

  updateSummary() {
    this.summarize();
  }
}
