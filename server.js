const express = require("express");
const morgan = require("morgan");
const got = require("got");
const cors = require("cors");
require("dotenv").config();
const app = express();

const { router } = require("./contact");

const PORT = process.env.PORT || 5050;
const BASE_URL = "http://api.weatherbit.io/v2.0/current";
const KEY = process.env.KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(cors());
app.use("/", router);

app.get("/api/weather", async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City parameter is mandatory" });
    }
    const response = await got(BASE_URL, {
      searchParams: {
        key: KEY,
        lang: "ru",
        city,
      },
      responseType: "json",
    });
    res.json({ weather: response.body });

    // const [weatherData] = response.body.data;
    // const {
    //   city_name,
    //   timezone,
    //   weather: { description },
    //   temp,
    // } = weatherData;

    // res.json({ city_name, timezone, description, temp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at server launch", err);
  }
  console.log(`Server works at http://localhost:${PORT}`);
});
