const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const db = require("./models");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/billboards", require("./routes/billboardRoutes"));
app.use("/seats", require("./routes/seatRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use("/customers", require("./routes/customerRoutes"));
app.use("/movies", require("./routes/movieRoutes"));
app.use("/rooms", require("./routes/roomRoutes"));


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
