const express = require("express");
const router = require("express").Router();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const sioux = require('./ttn.js')
const cors = require('cors')
const mong = require('./dbnul.js');
const { data } = require("ttn");


router.get("/sioux/:device/:smoke", cors(),  (req, res, next) => {
  sioux.smoke_signal(req.params.device, req.params.smoke)
  res.status(200).json({smoke_signal:true})
});

router.get("/sioux/lum",cors(), (req, res, next) => {
  mong.fetch()
  res.status(200).json( mong.results )
})

router.get("/sioux/vibr",cors(), (req, res, next) => {
  mong.fetch("Sioux", "last_12_hours")
  res.status(200).json( mong.results )
})

router.get("/:clust/:collec", cors(), (req, res, next)=>{
 mong.fetch(req.params.clust, req.params.collec)
  res.status(200).json(mong.results)
})

// router.post("/:clust/:collec", cors(), (req, res, next) => {
//   for (i = 0; i <= 6; i++){
//     let data = {
//       vibr: (Math.floor(Math.random()*1000)),
//       date: new Date(Date.now() - 6000 - (i * 1000) ) 
//     }
//     status = mong.addDoc(req.params.clust, req.params.collec, data)
//   }  
//   if (status) {
//     res.status(200).json(status)
//   }
// })


router.use("/images", express.static(path.join(__dirname, "images")));

module.exports = router;
