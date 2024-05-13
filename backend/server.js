const express = require("express");
const dotenv = require("dotenv").config();
const {errorHandler} = require("./middleware/errorMiddleware");
const colors = require("colors");
const cors = require('cors');

const connectDB = require("./config/db");
connectDB()

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tournaments", require("./routes/tournamentRoutes"))
app.use("/api/athletes", require("./routes/athleteRoutes"))

app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
