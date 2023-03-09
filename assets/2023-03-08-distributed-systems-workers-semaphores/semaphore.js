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

self.addEventListener('message', (event) => self[event.data.state](event.data));

self["start"] = (data) => 
   (new SemaphoreProducer(new Monitor(new Int32Array(data.sharedMemory)),new self[data.color]())).run();


class Monitor {
  mapper = {
    "Red": 0,
    "Yellow": 1,
    "Green": 2
  };
  constructor(sharedMemory) {
   this.sharedMemory  = sharedMemory;
   log(` SHARED MEMORY: ${sharedMemory}`);
  }
  produce(state) {
    console.group(`${threadName} PRODUCTION`);
    log('. SET-STATE (previous):' + this.state);
    this.state = state.constructor.name;
    Atomics.store(this.sharedMemory, 0, this.mapper[this.state]);
    log('. SET-STATE (after):' + this.state);
    console.groupEnd();
    self.postMessage({state: this.state});
    Atomics.notify(this.sharedMemory, 0);
  }
}

class State {
  constructor() {
    this.time = 0;
  }

  async execute(monitor) {
    monitor.produce(this);
    return Thread.sleep(this.time).then(_ => this.transitToNewState());
  }

  transitToNewState() {}
}



self["Red"] = class Red extends State {
  constructor() {
    super();
    this.time = 10 * 1000;
  }
  transitToNewState() {
    return new self.Green();
  }
}

self["Green"] = class Green extends State {
  constructor() {
    super();
    this.time = 8 * 1000;
  }
  transitToNewState() {
    return new self.Yellow();
  }
}

self["Yellow"] = class Yellow extends State {
  constructor() {
    super();
    this.time = 2 * 1000;
  }
  transitToNewState() {
    return new self.Red();
  }
}

class SemaphoreProducer {
  constructor(monitor, state) {
    this.state = state;
    this.monitor = monitor;
  }
  async run() {
    while (true) {
      this.state = await this.state.execute(this.monitor);
    }
  }
}
