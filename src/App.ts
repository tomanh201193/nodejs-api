import * as express from 'express'
import {initDB, Product} from "./models/database";
import { Server } from "@overnightjs/core";
import * as bodyParser from "body-parser";

import {ProductControllers} from "./controllers/ProductControllers";

export class App extends Server{
  public express;

  constructor () {
    super();
    this.express = super.app;
    this.applyMiddleWares();
    this.mountRoutes();
    this.boostrap();
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', async (req, res) => {
      try {
        let products = await Product.findAll();
        return res.status(200).json({
          message: "get_all_called",
          data: products
        });

      } catch (err) {
      }
    })
    this.express.use('/', router)
  }

  private applyMiddleWares() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private async boostrap() {
    // Connect to db
    await initDB();

    super.addControllers([new ProductControllers()]);
  }
}

export default new App().express
