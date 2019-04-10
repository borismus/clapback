import {EventEmitter} from 'eventemitter3';

export class Clock extends EventEmitter {
  ticking = false;
  period: number;
  beat = 0;

  constructor(period: number) {
    super();
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
