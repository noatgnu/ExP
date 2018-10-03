import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Exp} from '../classes/exp';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  id;
  experiment: Exp;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.experiment = JSON.parse(localStorage.getItem(this.id));
  }

}
