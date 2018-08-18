var express = require("express");
var bodyParser = require("body-parser");
var md5 = require("md5");
var productconnect = require("./Database/products");
var userconnect = require("./Database/users");
var oderconnect = require("./Database/oders");

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Phần người dùng

// http://localhost:3000/addUser
app.post("/addUser", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  var _pass = md5(req.body.pass);
  userconnect.checkUser(_email, function(resultQuery) {
    if (resultQuery === 0) {
      if (
        _email === "" ||
        _email === undefined ||
        req.body.pass === "" ||
        req.body.pass === undefined
      ) {
        var resultNotInsert = {
          status: false,
          ketqua: "Insert ERROR Trường bị rỗng"
        };
        //   console.log(resultNotInsert);
        res.send(resultNotInsert);
      } else {
        userconnect.insertUser(_email, _pass, function(resultQuery) {
          // console.log(resultQuery);
          if (resultQuery === 0) {
            var resultNotInsert = { status: false, ketqua: "Insert That Bai" };
            res.json(resultNotInsert);
          } else {
            var resultOK = { status: true, ketqua: "Insert Thanh Cong" };
            res.json(resultOK);
          }
        });
      }
    } else {
      var result = { status: false, ketqua: "Email Da ton tai" };
      res.json(result);
    }
  });
});

//http://localhost:3000/loginUser
app.post("/loginUser", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  var _pass = md5(req.body.pass);
  if (
    _email === "" ||
    _email === undefined ||
    req.body.pass === "" ||
    req.body.pass === undefined
  ) {
    var resultNotInsert = {
      status: false,
      ketqua: "Insert ERROR Trường bị rỗng"
    };
    //   console.log(resultNotInsert);
    res.send(resultNotInsert);
  } else {
    userconnect.loginUser(_email, _pass, function(resultQuery) {
      if (resultQuery === 0) {
        var resultNotInsert = { status: false, ketqua: "Login Fail" };
        res.json(resultNotInsert);
      } else {
        var inforUser = {
          id: resultQuery[0].id,
          email: resultQuery[0].email,
          name: resultQuery[0].name,
          birthday: resultQuery[0].birthday,
          phone: resultQuery[0].phone
        };
        var resultOK = { status: true, inforUser: inforUser };
        res.json(resultOK);
      }
    });
  }
});

// http://localhost:3000/updatePass
app.post("/updatePass", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  var _oldpass = md5(req.body.oldpass);
  var _newpass = md5(req.body.newpass);

  if (
    _email === "" ||
    _email === undefined ||
    req.body.oldpass === "" ||
    req.body.oldpass === undefined ||
    req.body.newpass === "" ||
    req.body.newpass === undefined
  ) {
    var resultNotInsert = {
      status: false,
      ketqua: "UpdatePass ERROR Trường bị rỗng"
    };
    // console.log(resultNotInsert);
    res.send(resultNotInsert);
  } else {
    userconnect.updatePass(_email, _oldpass, _newpass, function(resultQuery) {
      //console.log(resultQuery.affectedRows);
      if (resultQuery.affectedRows === 0) {
        var resultNotInsert = { status: false, ketqua: "Update That Bai" };
        res.json(resultNotInsert);
      } else {
        var resultOK = { status: true, ketqua: "Update Thanh Cong" };
        res.json(resultOK);
      }
    });
  }
});

// http://localhost:3000/updateUserInfor
app.post("/updateUserInfor", urlencodedParser, function(req, res) {
  var _id = req.body.id;
  var _name = req.body.name;
  var _birthday = req.body.birthday;
  var _phone = req.body.phone;

  if (_phone === "" || _phone === undefined) {
    var resultNotInsert = {
      status: false,
      ketqua: "Số điện thoại là bắt buộc "
    };
    res.send(resultNotInsert);
  } else {
    userconnect.updateUserInfor(_id, _name, _birthday, _phone, function(
      resultQuery
    ) {
      if (resultQuery === 0) {
        var resultNotInsert = { status: false, ketqua: "Update That Bai" };
        res.json(resultNotInsert);
      } else {
        var resultOK = { status: true, ketqua: "Update Thanh Cong" };
        res.json(resultOK);
      }
    });
  }
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
  var _name = req.query.name;
  productconnect.findProducts(_name, function(resultQuery) {
    if (resultQuery.lengh === 0) {
      // trả về không có tên sản phẩm này
      var resultNotFind = { status: false, notarr: [] };
      res.json(resultNotFind);
    } else {
      var resultOK = { status: true, resultQuery };
      // console.log(resultOK);
      res.json(resultOK);
    }
  });
});

//http://localhost:3000/updateQuatity
app.post("/updateQuatity", urlencodedParser, function(req, res) {
  var _id = req.body.id;
  var _quatiy = req.body.quatity;
  productconnect.updateQuatity(_id, _quatiy, function(resultQuery) {
    if (resultQuery === 0) {
      var resultNotInsert = {
        status: false,
        ketqua: "Cap nhat so luong that bai"
      };
      res.json(resultNotInsert);
    } else {
      var resultOK = {
        status: true,
        ketqua: "Cap nhat so luong Success"
      };
      res.json(resultOK);
    }
  });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>> Phần Order

//http://localhost:3000/addOder
app.post("/addOder", urlencodedParser, function(req, res) {
  var _jsonproducts = req.body.jsonproducts;
  var _jsonuser = req.body.jsonuser;
  var _totalprice = req.body.totalprice;
  var _dateoder = req.body.dateoder;
  var _status = req.body.status;

  oderconnect.addOder(
    _jsonproducts,
    _jsonuser,
    _totalprice,
    _dateoder,
    _status,
    function(resultQuery) {
      if (resultQuery === 0) {
        var resultNotInsert = { status: false, ketqua: "InsertOder That Bai" };
        res.json(resultNotInsert);
      } else {
        var resultOK = { status: true, ketqua: "InsertOder Thanh Cong" };
        res.json(resultOK);
      }
    }
  );
});

app.listen(3000);
