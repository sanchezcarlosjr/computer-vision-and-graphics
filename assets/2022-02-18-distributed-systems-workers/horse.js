let position = 0;
self.addEventListener('message', (event) => {
  if (event.data.state === "setup") {
    setup(event.data.position);
  }
  if (event.data.state === "start") {
    start();
  } 
});

function setup(index) {
   position = index;
}

function start() {
  while(true) {
     self.postMessage({position, distance: Math.floor(Math.random() * 10) + 1});
  }
}
