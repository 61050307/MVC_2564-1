//const คือค่าที่ที่ไม่สามารถเปลี่ยนค่าได้

const express = require("express");
const app = express();
const router = require("./router");
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

//Body parser Middleware
//parse requests of content-type: application/json
app.use(express.json()); //เรียกให้ทำงาน
//parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
  console.log(
    `URL request : ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  console.log("request data :", req.body || req.params);
  next();
};

app.use(logger);
app.use("/", router);
app.use('/',swaggerUi.serve,swaggerUi.setup(swaggerDoc));

const port = process.env.PORT || 6060;

app.listen(port, () => {
  console.log(`YEyes-backend running at port ${port}`);
  console.log("[Swagger] http://localhost:" + port + "/");
});

module.exports = app;
