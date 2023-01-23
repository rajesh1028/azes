const express = require("express");
const { connection } = require("./configs/db")
const { userRouter } = require("./routes/user.Route")
const { menRouter } = require("./routes/men.Route")
const { womenRouter } = require("./routes/women.Route")
const { cartRouter } = require("./routes/cart.Route")
const { adminRouter } = require("./routes/admin.Route")
const cors = require("cors");
require("dotenv").config()
const { authenticate } = require("./middlewares/authenticate.middleware");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page");
})
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use(authenticate)

app.use("/men", menRouter)
app.use("/women", womenRouter)
app.use("/cart", cartRouter)


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at ${process.env.port}`);
})
