const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

const products = require("./routes/products");
const user = require("./routes/user");

const port = 3001;

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser()); ///

app.use(express.json());

app.use("/api/products", products);
app.use("/api/user", user);


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});