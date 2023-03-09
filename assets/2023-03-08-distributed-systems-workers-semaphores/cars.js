const threadName =  `${self.location.pathname}[${self.name}]`;
function log(text) {
   console.log(`${threadName}${text}`);
}
log(" Starting...");

class Thread {
  // time in ms
  static sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}

function random(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

self.addEventListener('message', (event) => self[event.data.state](event.data));

self["start"] = (data) =>  (new TrafficConsumer(new Monitor(new Int32Array(data.sharedMemory)))).run()

class Monitor {
  constructor(sharedMemory) {
    this.sharedMemory = sharedMemory;
    log(` SHARED MEMORY: ${sharedMemory}`);
    this.state = this.sharedMemory[0];
  }
  consume() {
    const obj = Atomics.waitAsync(this.sharedMemory, 0, this.state);
    if (obj.async){
      return obj.value.then(() => {
           console.group(`${threadName} CONSUMPTION`);
           log(` GET-STATE (previous): ${this.state} `);
           this.state = this.sharedMemory[0];
           log(` GET-STATE (after): ${this.state} `);
           console.groupEnd();
           return this.state;
      });
    }
    throw new Error(`${threadName} Something wrong happened!`);
  }
}


class TrafficConsumer {
  actions = {
     0: () => {
       this.accumulateCars();
       self.postMessage({carLocations: new Array(this.cars).fill().map(_ => [random(10,40), random(10,40)])});
       return Thread.sleep(700);
     },
     1: () => {
       this.decreaseCars();
       self.postMessage({carLocations: new Array(this.cars).fill().map(_ => [random(10,40), random(10,40)])});
       return Thread.sleep(1000);
     },
     2: () => {
       this.decreaseCars();
       self.postMessage({carLocations: new Array(this.cars).fill().map(_ => [random(10,40), random(10,40)])});
       return Thread.sleep(2 * 1000);
     }
  };
  constructor(monitor, name) {
    this.monitor = monitor;
    this.cars = 0;
    this.state =  monitor.state;
  }
  async run() {
    const consume = () => this.monitor.consume().then(state => {
      this.state = state;
      consume();
    });
    consume();
    while (true) {
      await this.actions[this.state]();
    }
  }
  accumulateCars() {
    log('. Accumulating cars (previous). Total=' + this.cars);
    this.cars = this.cars + random(1, 12);
    log('. Accumulating cars (after). Total=' + this.cars);
  }
  decreaseCars() {
    log('. Decreasing cars (previous). Total=' + this.cars);
    this.cars = this.cars === 0 ? this.cars : this.cars - 1;
    log('. Decreasing cars (after). Total=' + this.cars);
  }
}
