import { Component, OnInit, OnDestroy } from '@angular/core';
import {Exp} from '../classes/exp';
import {ExpBlock} from '../classes/exp-block';
import {Subscription} from 'rxjs';
import {HelperService} from '../services/helper.service';
import {ExpMaterial} from '../classes/exp-material';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit, OnDestroy {
  experiment = new Exp('Untitled', [new ExpBlock('Untitled')]);
  updateSubscription: Subscription;
  newBlockSubscription: Subscription;
  material;
  a = {};
  constructor(private helper: HelperService) { }

  ngOnInit() {
    this.summarize();
    this.updateSubscription = this.helper.updateTrigger.subscribe((data) => {
      if (data) {
        this.summarize();
      }
    });
    this.newBlockSubscription = this.helper.newBlockTrigger.subscribe((data) => {
      const ind = this.experiment.Blocks.indexOf(data.block);
      switch (data.position) {
        case 'before':
          this.experiment.Blocks.splice(ind, 0, new ExpBlock('Untitled'));
          break;
        case 'after':
          if (this.experiment.Blocks.length - 1 === ind) {
            this.experiment.Blocks.push(new ExpBlock('Untitled'));
          } else {
            this.experiment.Blocks.splice(ind + 1, 0, new ExpBlock('Untitled'));
          }
          break;
      }
    });
  }

  private summarize() {
    this.experiment.totalTime = this.experiment.CalculateTotalTime();
    this.material = this.experiment.CalculateTotalMaterials();
    this.experiment.totalMaterial = this.material.in;
    this.experiment.totalBlocks = this.experiment.CalculateTotalBlocks();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
    this.newBlockSubscription.unsubscribe();
  }

  updateSummary() {
    this.summarize();
  }

  addBlockAfter() {
    this.experiment.Blocks.push(new ExpBlock('Untitled'));
  }

  addBlockBefore(position) {
    let array: ExpBlock[] = [];
    if (position > 0) {
      array = this.experiment.Blocks.slice(0, position);
      array.push(new ExpBlock('Untitled'));
      array.concat();
      this.experiment.Blocks.slice(0, position);

    }

  }

  addBlockBetween(position) {

  }

  getArray(materialId, mapMaterial: Map<string, Map<number, ExpMaterial>>) {
    console.log(mapMaterial.get(materialId));
    return Array.from(mapMaterial.get(materialId).keys());
  }

  navigateToBlock(id) {
    this.helper.blockMap.get(this.experiment.Blocks[id].id).next(true);
  }
}
