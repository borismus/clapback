import {Component} from '@angular/core';
import {compareRhythmsNoDoubleCount, pad} from './utils';
import {Clock} from './Clock';
import * as Tone from 'tone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clapback';
  refRhythm = '100000001000000010000000';
  resolution = 16;
  displayResolution = 8;
  currentIndex = 3;

  bpm = 120;
  clock = new Clock(this.bpm, this.resolution);

  metronomeTick = new Tone.Player('/assets/metronome_tick.wav').toMaster();
  singleClap = new Tone.Player('/assets/single_clap.wav').toMaster();

  detRhythms: string[] = ['', '', ''];
  lastBeatTime = 0;

  playing = false;
  metronome = false;
  recording = false;
  countdown = false;
  pressed = false;

  countdownTicks = 0;
  countdownSeconds = 0;
  recordingAttempt = 0;

  get currentValue() {
    return this.refRhythm[this.currentIndex];
  }

  get detRhythmsPadded() {
    return this.detRhythms.map(rhythm => pad(rhythm, this.refRhythm.length));
  }

  get ticksPerSecond() {
    return Math.floor(1 / this.clock.period);
  }

  get countdownRemaining() {
    return 3 - this.countdownSeconds;
  }

  constructor() {
    const result = compareRhythmsNoDoubleCount('100010001000', '1111111111111');
    console.log(result);

    this.clock.on('tick', this.tick.bind(this));
    this.clock.start();
  }

  tick(beat) {
    // Tick to the next index.
    this.currentIndex = (this.currentIndex + 1) % this.refRhythm.length;

    if (this.playing) {
      // Play sounds.
      if (this.metronome) {
        this.metronomeTick.start();
      }
      if (this.currentValue == '1') {
        this.singleClap.start();
      }
    }
    if (this.recording) {
      this.growRhythm();
    }

    if (this.countdown) {
      this.doCountdown();
    }
  }

  doCountdown() {
    console.log('countDown');
    this.countdownTicks += 1;
    if ((this.countdownTicks % this.ticksPerSecond) == 0) {
      this.countdownSeconds += 1;
    }
    if (this.countdownSeconds > 3) {
      // We're done.
      this.startRecording();
    }
  }

  togglePlay(event) {
    this.playing = event.checked;
    if (this.playing) {
      this.currentIndex = -1;
    }
  }

  toggleMetronome(event) {
    this.metronome = event.checked;
  }

  toggleRecording(event) {
    if (event.checked) {
      this.startCountdown();
    } else {
      this.stopRecording();
    }
  }

  startRecording() {
    this.countdown = false;
    this.recording = true;
    this.recordingAttempt = -1;
    this.currentIndex = -1;
    // Reset all rhythms.
    this.detRhythms = this.detRhythms.map(rhythm => '');
  }

  stopRecording() {
    this.recording = false;
    this.countdown = false;
  }

  startCountdown() {
    this.countdown = true;
    this.countdownTicks = 0;
    this.countdownSeconds = 0;
  }

  userBeat(event) {
    console.log('userBeat', event);
    event.stopPropagation();
    event.preventDefault();
    this.pressed = true;

    // Fudge this by half a period so that we are perfectly in the middle of 
    // a cell rather than being at the edge.
    this.lastBeatTime = Date.now() + this.clock.period / 2;
  }

  userBeatRelease(event) {
    this.pressed = false;
  }

  growRhythm() {
    // If we're recording, build the detected rhythm string.
    if (this.recording) {

      // If we are finished with this recording attempt, move on to the next.
      if (this.currentIndex === 0) {
        this.recordingAttempt += 1;
      }

      // If this was the last attempt, stop recording.
      if (this.recordingAttempt >= this.detRhythms.length) {
        this.recording = false;
        this.recordingAttempt = 0;
      }

      const ind = Math.max(this.recordingAttempt, 0);
      const rhythm = this.detRhythms[ind].split('');
      const elapsed = (Date.now() - this.lastBeatTime) / 1000;
      const isBeat = elapsed < this.clock.period;
      rhythm[this.currentIndex] = isBeat ? '1' : '0';
      this.detRhythms[this.recordingAttempt] = rhythm.join('');

    }
  }
}
