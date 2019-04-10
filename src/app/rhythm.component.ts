import {Component, Input} from '@angular/core';

@Component({
  selector: 'clap-rhythm',
  templateUrl: './rhythm.component.html',
  styleUrls: ['./rhythm.component.scss']
})
export class RhythmComponent {
  @Input() rhythmString: string;
  @Input() currentIndex: number;
  @Input() active: boolean;

  get rhythmItems() {
    return this.rhythmString.split('');
  }

  get index() {
    return this.active ? this.currentIndex : -1;
  }

  constructor() {
    //console.log('RhythmComponent', this.rhythmString);
  }
}
