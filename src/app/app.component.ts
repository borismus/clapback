import { Component } from '@angular/core';
import {compareRhythmsNoDoubleCount} from './utils';
import {Clock} from './Clock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clapback';
  refRhythm = '100010001000';
  currentIndex = 3;
  clock = new Clock(1);

  playing = false;
  metronome = false;

  get refRhythmItems() {
    return this.refRhythm.split('');
  }

  constructor() {
    const resolution = 8;
    const result = compareRhythmsNoDoubleCount('100010001000', '1111111111111');
    console.log(result);

    this.clock.on('tick', (beat) => {
      this.currentIndex = (this.currentIndex + 1) % this.refRhythm.length;
    });
  }

  togglePlay(event) {
    this.playing = event.checked;
    if (this.playing) {
      this.clock.start();
    } else {
      this.clock.stop();
    }
  }

  toggleMetronome(event) {
    this.metronome = event.checked;
  }
}
