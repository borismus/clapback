import {EventEmitter} from 'eventemitter3';

export class Clock extends EventEmitter {
  public period: number;
  public ticking = false;
  beat = 0;

  constructor(bpm: number, resolution: number) {
    super();
    const bps = bpm / 60;
    const quarterNotePeriod = 1 / bps;
    const period = quarterNotePeriod / (resolution / 4);
    this.period = period;
  }

  async start() {
    this.ticking = true;
    this.beat = 0;
    while (this.ticking) {
      await sleep(this.period);
      this.emit('tick', this.beat++);
    }
  }

  stop() {
    this.ticking = false;
  }
}

async function sleep(duration: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration * 1000);
  });
}
