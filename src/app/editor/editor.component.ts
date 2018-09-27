import { Component, OnInit } from '@angular/core';
import {Quill} from 'quill';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor = {};
  block = {"ops":[{"insert":"tesdtw\nqweasf\nwaef\nsdg\nwqar\nwer\nsa\ndf\nawet\nasdqwr"},{"attributes":{"indent":1},"insert":"\n"},{"insert":"qweasf"},{"attributes":{"indent":2},"insert":"\n"}]};
  constructor() { }

  ngOnInit() {
    this.createEditor();
  }

  createEditor() {
    this.editor = {
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
}
