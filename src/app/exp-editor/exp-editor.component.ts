import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Exp} from '../classes/exp';
import {HelperService} from '../services/helper.service';
import {Observable, Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-exp-editor',
  templateUrl: './exp-editor.component.html',
  styleUrls: ['./exp-editor.component.scss']
})
export class ExpEditorComponent implements OnInit, OnDestroy {
  @Input() experiment: Exp;
  form: FormGroup;
  constructor(private modalService: NgbModal, private helper: HelperService, public activeModal: NgbActiveModal, private _fb: FormBuilder) {
  }

  ngOnDestroy() {
  }

  open(editor) {
    this.modalService.open(editor).result.then((result) => {

    }, (reason) => {

    });
  }

  ngOnInit() {
    this.form = this._fb.group({
      'name': [this.experiment.Name, Validators.required]
    });
  }

}
