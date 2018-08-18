var express = require("express");
var bodyParser = require("body-parser");
var md5 = require("md5");
var productconnect = require("./Database/products");
var userconnect = require("./Database/users");

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Phần người dùng

// http://localhost:3000/addUser
app.post("/addUser", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  var _pass = md5(req.body.pass);

  if (_email === undefined || req.body.pass === undefined) {
    var resultNotInsert = {
      status: false,
      ketqua: "Insert ERROR Trường bị rỗng"
    };
    console.log(resultNotInsert);
    res.send(resultNotInsert);
  } else {
    userconnect.insertUser(_email, _pass, function(resultQuery) {
      if (resultQuery === 0) {
        var resultNotInsert = { status: false, ketqua: "Insert That Bai" };
        res.json(resultNotInsert);
      } else {
        var resultOK = { status: true, ketqua: "Insert Thanh Cong" };
        res.json(resultOK);
      }
    });
  }
});

// http://localhost:3000/updatePass
app.post("/updatePass", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  var _oldpass = req.body.oldpass;
  var _newpass = req.body.newpass;

  if (
    _email === undefined ||
    req.body.oldpass === undefined ||
    req.body.newpass === undefined
  ) {
    var resultNotInsert = {
      status: false,
      ketqua: "UpdatePass ERROR Trường bị rỗng"
    };
    console.log(resultNotInsert);
    res.send(resultNotInsert);
  } else {
    userconnect.updatePass(_email, _oldpass, _newpass, function(resrultUpdate) {
      if (resrultUpdate === 0) {
        var resultNotInsert = { status: false, ketqua: "Update That Bai" };
        res.json(resultNotInsert);
      } else {
        var resultOK = { status: true, ketqua: "Update Thanh Cong" };
        res.json(resultOK);
      }
    });
  }
});

// đang gặp vấn đề cần khắc phục
// http://localhost:3000/checkUser
app.post("/checkUser", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  userconnect.checkUser(_email, function(resultCheck) {
    console.log(resultCheck);
    if (resultCheck === "RowDataPacket { 'count(*)': 0 }") {
      var result = { status: true, ketqua: "Email Chua ton tai" };
      res.json(result);
    } else {
      var result = { status: false, ketqua: "Email Da ton tai" };
      res.json(result);
    }
  });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>> Phần sản phẩm

// http://localhost:3000/Listproducts
app.get("/Listproducts", function(req, res) {
  productconnect.getproducts(function(resultQuery) {
    res.json(resultQuery);
  });
});

// http://localhost:3000/Findproducts?name=Chu
app.get("/Findproducts", function(req, res) {
  var name = req.query.name;
  productconnect.findProducts(name, function(resultQuery) {
    if (resultQuery.lengh === 0) {
      var notarr = [];
      // trả về không có tên sản phẩm này
      var resultNotFind = { status: false, notarr };
      res.json(resultNotFind);
    } else {
      var resultOK = { status: true, resultQuery };
      // console.log(resultOK);
      res.json(resultOK);
    }
  });
});

app.listen(3000);
