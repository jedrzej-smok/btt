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
import {userRouter} from "./routes/user";


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
    res.json({ message: "app.js" });
  });

//listen app
app.use(handleError);

app.use('/user', userRouter);
const port = process.env.NODE_DOCKER_PORT || 3000;

(async () => {
    //await dbCreate();
    await dbSyncModel(sequelize);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
        console.log(`Listening on http://localhost:${port}`);
        
    });
})();