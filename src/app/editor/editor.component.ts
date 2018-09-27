import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Quill} from 'quill';
import {ExpBlock} from '../classes/exp-block';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExpMaterial} from '../classes/exp-material';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Output() ExpBlock = new EventEmitter<ExpBlock>();
  form: FormGroup;
  options = {};
  editor: Quill;
  block = {'ops': [{'insert': 'tesdtw\nqweasf\nwaef\nsdg\nwqar\nwer\nsa\ndf\nawet\nasdqwr'}, {'attributes': {'indent': 1}, 'insert': '\n'}, {'insert': 'qweasf'}, {'attributes': {'indent': 2}, 'insert': '\n'}]};
  input: ExpMaterial[] = [];
  output: ExpMaterial[] = [];

  constructor(private _fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
    this.createEditor();
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

        ['link', 'image', 'video']                         // link and image, video
      ]
    };
  }

  createForm() {
    this.form = this._fb.group({
      'name': ['Untitled Block', Validators.required],
      'timeTracked': [false],
      'time': this._fb.group({
        'days': [0],
        'hours': [0],
        'seconds': [0]
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
    this.input.push(new ExpMaterial('', 0));
  }
  addOutput() {
    this.output.push(new ExpMaterial('', 0));
  }
}
