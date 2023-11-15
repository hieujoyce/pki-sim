// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(process.env.DB)
//   .then(() => {
//     console.log("Connect DB success.");
//   })
//   .catch((err) => {
//     console.log("Err DB: ", err.message);
//   });

app.get("/", async (req, res) => {
  res.json({
    msg: "Hieu Joyce(Cỏ Dại) hello every body.",
  });
});

app.post("/update", async (req, res) => {
  const { urlCrl } = req.body;
  return res.json({ msg: "Success" });
  fetch(urlCrl)
    .then((re) => re.blob())
    .then((data) => data.arrayBuffer())
    .then((data) => {
      fs.writeFile(
        publicPath + "/management_ca.crl",
        Buffer.from(data),
        (err) => {
          if (!err) res.json({ msg: "Success" });
        }
      );
    });
});

app.listen(5000, async () => {
  console.log("Server is running on port 5000");
});
//http://localhost:80/ejbca/publicweb/webdist/certdist?cmd=crl&issuer=UID%3Dc-0hm5jhsoayxiftfp7%2CCN%3DManagementCA%2CO%3DEJBCA+Container+Quickstart
//https://web-get-cookie-by-hacker-hieujoyce.vercel.app/download
