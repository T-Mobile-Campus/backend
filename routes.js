const express = require("express");
const router = require("express").Router();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const sioux = require('./ttn.js')
const cors = require('cors')
const mong = require('./dbnul.js')

router.get("/sioux/:device/:smoke", cors(),  (req, res, next) => {
  sioux.smoke_signal(req.params.device, req.params.smoke)
  res.status(200).json({smoke_signal:true})
});

router.get("/sioux/lum", (req, res, next) => {
  res.status(200).json({ lum: sioux.lum })
})
  res.status(200).json( mong.results )
})

router.get("/:clust/:collec", cors(), (req, res, next)=>{
 listed =  mong.listed(req.params.clust, req.params.collec)
  res.status(200).json(listed)
})



router.use("/images", express.static(path.join(__dirname, "images")));

module.exports = router;
