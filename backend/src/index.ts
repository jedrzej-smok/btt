import * as dotenv from "dotenv";
dotenv.config();
import * as express from "express";
import {sequelize} from "./db/sequelize";
import * as methodOverride from "method-override";
import * as cookieParser from "cookie-parser";
import {static as eStatic, urlencoded} from "express";
//local requires
import {dbConnectionTest, dbCreate, dbSyncForceAndFill, dbSyncModel} from "./db/db-utils";
import {handleError} from "./utils/errors";
import {mealRouter} from "./routes/meal";
import { seed } from "./db/seeders/demo-seed";


//config app
const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(eStatic('public'));
app.use(express.json());
app.use(cookieParser());

//routers
app.get("/", (req, res) => {
    res.send("haha<h1>haha</h1");
  });

//listen app
app.use(handleError);

app.use('/meal', mealRouter);
const port = process.env.NODE_DOCKER_PORT || 3000;

(async () => {
    await dbSyncModel(sequelize);
    // const res  = await seed();
    // console.log(res);
    app.listen(port, () => {
        console.log(`Server is running on port ${process.env.NODE_LOCAL_PORT || 3000}.`);
        console.log(`Listening on http://localhost:${process.env.NODE_LOCAL_PORT || 3000}`);
    });
})();