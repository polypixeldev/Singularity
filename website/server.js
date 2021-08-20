const Express = require("express");
const EventEmitter = require("events");

const apiRouter = require("./backend/router.js");

class APIClient extends EventEmitter {
  constructor(props) {
    super(props);

    props = props ?? {};

    this.type = props.type ?? "full";

    this.port = props.port ?? 5000;
    this.host = props.host ?? "localhost";

    this.app = Express();

    this.startBackend = this.startBackend.bind(this);
    this.startFrontend = this.startFrontend.bind(this);
    this.startFull = this.startFull.bind(this);

    switch (this.type) {
      case "frontend":
        this.startFrontend();
        break;
      case "backend":
        this.startBackend();
        break;
      default:
        this.startFull();
    }

    this.app.listen(this.port, this.host, () => {
      console.log(
        `${
          this.type === "frontend"
            ? "Frontend"
            : this.type === "backend"
            ? "Backend"
            : "Full"
        } Server running at http://${this.host}:${this.port}`
      );
    });
  }

  startBackend() {
    this.app.use("/api", apiRouter);
  }

  startFrontend() {
    this.app.use(
      Express.static(
        "C:/Users/samme/Documents/Programs/Singularity/website/frontend/build"
      )
    );
    this.app.use((req, res) => {
      res.sendFile("../frontend/build/index.html");
    });
  }

  startFull() {
    this.app.use(
      Express.static(
        "C:/Users/samme/Documents/Programs/Singularity/website/frontend/build"
      )
    );
    this.app.use("/api", apiRouter);
    this.app.use((req, res) => {
      res.sendFile(
        "C:/Users/samme/Documents/Programs/Singularity/website/frontend/build/index.html"
      );
    });
  }
}

module.exports = APIClient;
// module.exports = {
// 	start(type){
// 		const app = Express();

// 		if(type === 'frontend'){
// 			app.use(Express.static('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build'));
// 			app.use((req, res) => {
// 				res.sendFile('../frontend/build/index.html');
// 			})
// 		} else if(type === 'backend'){
// 			app.use('/api', apiRouter)
// 		} else {
// 			app.use(Express.static('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build'));
// 			app.get('/api/', (req, res) => {
// 				res.send('api');
// 			})
// 			app.use((req, res) => {
// 				res.sendFile('C:/Users/samme/Documents/Programs/Singularity/website/frontend/build/index.html');
// 			})
// 		}

// 		app.listen(5000, 'localhost', () => {
// 			console.log(`${type === 'frontend' ? 'Frontend': type ===  'backend' ? 'Backend' : 'Full'} Server running at http://localhost:5000`);
// 		})

// 	}
// }
