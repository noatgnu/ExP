import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import {Quill} from 'quill';
import {ExpBlock} from '../classes/exp-block';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpMaterial} from '../classes/exp-material';
import {ExpTime} from '../classes/exp-time';
import {ExpInventory} from '../classes/exp-inventory';


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
  constructor(private _fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
    this.createEditor();
    if (this.block.Content) {
      this.content = this.block.Content;
    }
    if (this.block.Inventory) {
      this.input = this.block.Inventory.InputMaterials;
      this.output = this.block.Inventory.OutputMaterials;
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

  createForm() {
    this.form = this._fb.group({
      'name': [this.block.Name || 'Untitled', Validators.required],
      'timeTracked': [false],
      'repeat': [0],
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
    this.block.Name = this.form.value['name'];
    this.block.Time = new ExpTime(
      this.form.value['time']['days'],
      this.form.value['time']['hours'],
      this.form.value['time']['minutes'],
      this.form.value['time']['seconds']
    );
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
}
