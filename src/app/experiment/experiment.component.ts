import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Exp} from '../classes/exp';
import {ExpBlock} from '../classes/exp-block';
import {Observable, Subscription} from 'rxjs';
import {HelperService} from '../services/helper.service';
import {ExpMaterial} from '../classes/exp-material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExpEditorComponent} from '../exp-editor/exp-editor.component';
import {ExpRun} from '../classes/exp-run';
import {ExpInventory} from '../classes/exp-inventory';
import {ExpTime} from '../classes/exp-time';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit, OnDestroy {
  get experiment(): Exp {
    return this._experiment;
  }

  private _experiment: Exp;

  @Input() set experiment(value: Exp) {
    this._experiment = value;
    if (this.printMode) {

    } else {
      console.log(this.printMode);
      this.helper.MaterialsArray = [];
      for (const b of value.Blocks) {
        this.helper.updateMaterial(b);
      }
      this.summarize();
    }
  }

  @Input() printMode: boolean;
  updateSubscription: Subscription;
  newBlockSubscription: Subscription;
  material;
  a = {};
  channel: BroadcastChannel;
  runSubscription: Subscription;
  channelMap: Map<string, BroadcastChannel>;


  constructor(private helper: HelperService, private modalService: NgbModal) {
    /*this.channel = new BroadcastChannel('experimentChannel');
    this.channel.onmessage = (event) => {
      console.log(event);
      if (event.data.message === 'ready') {
        this.channelMap.set(event.data.id, new BroadcastChannel(event.data.id));
        const date = new Date();
        const e = new ExpRun(date, this.experiment);
        console.log(e);
        this.channelMap.get(event.data.id).postMessage(e);
        console.log(event.data);
      }
    };*/
  }

  ngOnInit() {
    if (!this.printMode) {
      this.channelMap = new Map<string, BroadcastChannel>();
      this.helper.MaterialsArray = [
        // new ExpMaterial('test', 0, 'ml')
      ];
      this.summarize();
      this.updateSubscription = this.helper.updateTrigger.subscribe((data) => {
        if (data) {
          this.summarize();
        }
      });
      this.newBlockSubscription = this.helper.newBlockTrigger.subscribe((data) => {
        const ind = this._experiment.Blocks.indexOf(data.block);
        switch (data.position) {
          case 'before':
            this._experiment.Blocks.splice(ind, 0, new ExpBlock('Untitled', new ExpTime(0, 0, 0, 0), new ExpInventory([], [])));
            break;
          case 'after':
            if (this._experiment.Blocks.length - 1 === ind) {
              this._experiment.Blocks.push(new ExpBlock('Untitled', new ExpTime(0, 0, 0, 0), new ExpInventory([], [])));
            } else {
              this._experiment.Blocks.splice(ind + 1, 0, new ExpBlock('Untitled', new ExpTime(0, 0, 0, 0), new ExpInventory([], [])));
            }
            break;
          case 'clone':
            const inventory = new ExpInventory();
            inventory.InputMaterials = [];
            inventory.OutputMaterials = [];
            if (data.block.Inventory) {
              for (const i of data.block.Inventory.InputMaterials) {
                inventory.InputMaterials.push(new ExpMaterial(i.Name, i.Amount, i.Unit));
              }
              for (const i of data.block.Inventory.OutputMaterials) {
                inventory.OutputMaterials.push(new ExpMaterial(i.Name, i.Amount, i.Unit));
              }
            }
            let time = new ExpTime(0, 0, 0, 0);
            if (data.block.Time) {
              time = new ExpTime(data.block.Time.Days, data.block.Time.Hours, data.block.Time.Minutes, data.block.Time.Seconds);
            }
            this._experiment.Blocks.push(new ExpBlock(data.block.Name, time, inventory, data.block.Content, data.block.TimeTracked, data.block.Repeat));
        }
      });
      this.runSubscription = this.helper.triggerRun.subscribe((data) => {
        const date = new Date();
        const e = new ExpRun(date, this._experiment);
        localStorage.setItem(data, JSON.stringify(e));
        /*this.channelMap.set(data, new BroadcastChannel(data));
        this.channelMap.get(data).onmessage = (event) => {
          if (event.data === 'ready') {
            const date = new Date();
            const e = new ExpRun(date, this.experiment);
            console.log(e);
            this.channelMap.get(data).postMessage(e);
          }
        };*/
        const winRef = window.open('/#/run/' + data, '_blank');

      });
    } else {

    }

  }

  private summarize() {
    this._experiment.totalTime = this._experiment.CalculateTotalTime();
    this.material = this._experiment.CalculateTotalMaterials();
    this._experiment.totalMaterial = this.material.in;
    this._experiment.totalBlocks = this._experiment.CalculateTotalBlocks();
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
    this.newBlockSubscription.unsubscribe();
    this.runSubscription.unsubscribe();
  }

  updateSummary() {
    this.summarize();
  }

  addBlockAfter() {
    this._experiment.Blocks.push(new ExpBlock('Untitled'));
  }

  addBlockBefore(position) {
    let array: ExpBlock[] = [];
    if (position > 0) {
      array = this._experiment.Blocks.slice(0, position);
      array.push(new ExpBlock('Untitled'));
      array.concat();
      this._experiment.Blocks.slice(0, position);

    }

  }

  openModal() {
    const modalRef = this.modalService.open(ExpEditorComponent);
    modalRef.componentInstance._experiment = this._experiment;
    modalRef.result.then((result) => {
      this._experiment.Name = result['name'];
    }, (reason) => {

    });
  }

  getArray(materialId, mapMaterial: Map<string, Map<number, ExpMaterial>>) {
    console.log(mapMaterial.get(materialId));
    return Array.from(mapMaterial.get(materialId).keys());
  }

  navigateToBlock(id) {
    this.helper.blockMap.get(this._experiment.Blocks[id].id).next(true);
  }

  openPrint() {
    localStorage.setItem(this.experiment.Name, JSON.stringify(this.experiment));
    const winRef = window.open('/#/print/' + this.experiment.Name, '_blank');
  }
}
