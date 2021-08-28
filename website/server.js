const Express = require("express");
const EventEmitter = require("events");
const bodyParser = require("body-parser");

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
    this.app.use(bodyParser.json());
    this.app.use("/api", apiRouter(this));
  }

  startFrontend() {
    this.app.use(Express.static("./frontend/build/"));
    this.app.use((req, res) => {
      res.sendFile(__dirname + "./frontend/build/index.html");
    });
  }

  startFull() {
    this.app.use(Express.static(__dirname + "/frontend/build/"));

    this.app.use("/api", apiRouter(this));

    this.app.use((req, res) => {
      res.sendFile(__dirname + "/frontend/build/index.html");
    });
  }
}

module.exports = APIClient;
