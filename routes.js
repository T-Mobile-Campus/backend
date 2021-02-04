const express = require("express");
const router = require("express").Router();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const sioux = require('./ttn.js')
const mess = require('./sms.js')
const cors = require('cors')
const mong = require('./dbnul.js');
const { data } = require("ttn");

router.get("/sms/:tonum/:mess", cors(), (req, res, next) =>{
  sioux.message(req.params.tonum, req.params.mess)
  res.status(200).json(req.params.tonum)
})

router.get("/sioux/lum",cors(), (req, res, next) => {
  mong.fetch()
  res.status(200).json( mong.results )
})

router.get("/sioux/:collec", cors(), async (req, res, next)=>{
  await mong.fetch("Sioux", req.params.collec)
  res.status(200).json(mong.results)
})

router.get("/sioux/threshold/:value", cors(), async (req, res) =>{
  value = req.params.value
  result = await mong.addDoc("Sioux", "threshold", value)
  sioux.getTreshold()
  res.status(201).json(result)
})

router.get("/sioux/:device/:smoke", cors(),  (req, res, next) => {
  sioux.smoke_signal(req.params.device, req.params.smoke)
  res.status(200).json({smoke_signal:true})
});

router.use("/images", express.static(path.join(__dirname, "images")));

module.exports = router;
