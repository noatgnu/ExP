import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import {Quill} from 'quill';
import {ExpBlock} from '../classes/exp-block';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpMaterial} from '../classes/exp-material';
import {ExpTime} from '../classes/exp-time';
import {ExpInventory} from '../classes/exp-inventory';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {HelperService} from '../services/helper.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Output() ExpBlock = new EventEmitter<ExpBlock>();
  @Input() block: ExpBlock;
  content;
  form: FormGroup;
  options = {};
  editor: Quill;

  input: ExpMaterial[] = [];
  output: ExpMaterial[] = [];
  time = new ExpTime(0, 0, 0, 0);
  repeat = 0;
  materialEditor;
  constructor(private _fb: FormBuilder, private helper: HelperService) {

  }

  ngOnInit() {
    this.createForm();
    this.createEditor();
    this.createMaterialEditor();
    if (this.block.Content) {
      this.content = this.block.Content;
    }
    if (this.block.Inventory) {
      for (const i of this.block.Inventory.InputMaterials) {
        this.input.push(Object.assign({}, i));
      }
      for (const i of this.block.Inventory.OutputMaterials) {
        this.output.push(Object.assign({}, i));
      }
    }
    if (this.block.Repeat) {
      this.repeat = this.block.Repeat;
    }
    if (this.block.Time) {
      this.time = this.block.Time;
    }
  }

  createEditor() {
    this.options = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

      ]
    };
  }

  createMaterialEditor() {
    this.materialEditor = {
      toolbar: [
        [{ 'script': 'sub'}, { 'script': 'super' }],
      ]
    };
  }

  createForm() {
    this.form = this._fb.group({
      'name': [this.block.Name || 'Untitled', Validators.required],
      'timeTracked': [false],
      'repeat': [this.repeat],
      'time': this._fb.group({
        'days': [this.time.Days],
        'hours': [this.time.Hours],
        'minutes': [this.time.Minutes],
        'seconds': [this.time.Seconds]
      })
    });
  }

  getHtml() {
    // console.log(this.editor.container.innerHTML);
  }

  getEditor(e) {
    this.editor = e;
  }

  addInput() {
    this.input.push(new ExpMaterial('', 0, ''));
  }
  addOutput() {
    this.output.push(new ExpMaterial('', 0, ''));
  }

  deleteElement(m: ExpMaterial, array: ExpMaterial[]) {
    const i = array.indexOf(m);
    array.splice(i, 1);
  }
  submit() {
    let time = new ExpTime(
      this.form.value['time']['days'],
      this.form.value['time']['hours'],
      this.form.value['time']['minutes'],
      this.form.value['time']['seconds']
    );
    time = time.StandardizeTime(time);
    this.block.Name = this.form.value['name'];
    this.block.Time = time;
    this.block.Inventory = new ExpInventory(
      this.input.slice(),
      this.output.slice()
    );
    this.block.Content = this.content;
    this.block.TimeTracked = this.form.value['timeTracked'];
    this.block.Repeat = this.form.value['repeat'];
    /*this.ExpBlock.emit(
      new ExpBlock(
        this.form.value['name'],
        new ExpTime(
          this.form.value['time']['days'],
          this.form.value['time']['hours'],
          this.form.value['time']['seconds']
        ),
        new ExpInventory(
          this.input.slice(),
          this.output.slice()
        ),
        this.content,
        this.form.value['timeTracked'],
        this.form.value['repeat']));*/
    this.ExpBlock.emit(this.block);
  }

  TypeAheadSearch (MaterialsArray = this.helper.MaterialsArray) {
    return (text: Observable<string>) =>
      text.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(
          term => term.length < 2 ? []
            : MaterialsArray.filter(
              v => v.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1).slice(0, 10))
      );
  }

  TypeAheadResult () {

  }

  TypeAheadFormatter (result: string) {
    return result;
  }

  TypeAheadInputFormatter (x: string) {
    return x;
  }
}
