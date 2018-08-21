var express = require("express");
var bodyParser = require("body-parser");
var md5 = require("md5");
var nodemailer = require("nodemailer");
var productconnect = require("./Database/products");
var userconnect = require("./Database/users");
var oderconnect = require("./Database/oders");

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Phần người dùng

// http://localhost:3000/gearapi/addUser
app.post("/gearapi/addUser", urlencodedParser, function(req, res) {
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
            var resultNotInsert = {
              status: false,
              ketqua: "Đăng Ký Thất Bại! Vui lòng thử lại"
            };
            res.json(resultNotInsert);
          } else {
            var resultOK = {
              status: true,
              ketqua: "Đăng ký tài khoản thành công"
            };
            res.json(resultOK);
          }
        });
      }
    } else {
      var result = { status: false, ketqua: "Email Tài Khoản Đã Tồn Tại" };
      res.json(result);
    }
  });
});

//http://localhost:3000/gearapi/loginUser
app.post("/gearapi/loginUser", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  var _pass = md5(req.body.pass);
  console.log(_email + " : " + _pass);
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

//http://localhost:3000/gearapi/forgotPass
app.post("/gearapi/forgotPass", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  var transporter = nodemailer.createTransport(
    "smtps://buituanbapkdeveloper%40gmail.com:qitxmisndawanihz@smtp.gmail.com"
  );
  userconnect.forgotPass(_email, function(resultQuery) {
    if (resultQuery === 0) {
      var resultNotInsert = {
        status: false,
        ketqua: "Không Tồn Tại Email này"
      };
      res.json(resultNotInsert);
    } else {
      var resultOK = {
        status: true,
        ketqua: "Vui Lòng Kiểm tra Email Để Lấy Mã"
      };
      var mailOptions = {
        from: '"Khôi Phục Mật Khẩu" <foo@blurdybloop.com>',
        to: "" + _email + "",
        subject: "MÃ KHÔI PHỤC TÀI KHOẢN",
        text: "Mã xác thực mật khẩu",
        html:
          "<p>Vui lòng nhập đoạn mã sau để khôi phục mật khẩu của bạn :</p></br><b><h2>" +
          resultQuery[0].password +
          "</h2></b>"
      };
      transporter.sendMail(mailOptions, function(err, infor) {
        if (err) {
          return console.log(err);
        }
        console.log("Message sent:" + infor.response);
        res.json(resultOK);
      });
    }
  });
});

// http://localhost:3000/gearapi/updatePasswithCode
app.post("/gearapi/updatePasswithCode", urlencodedParser, function(req, res) {
  var _email = req.body.email;
  var _keycode = req.body.keycode;
  var _newpass = md5(req.body.newpass);
  if (req.body.newpass === "" || req.body.newpass === undefined) {
    var resultNotInsert = {
      status: false,
      ketqua: "Bạn Chưa Nhập Password Mới"
    };
    // console.log(resultNotInsert);
    res.send(resultNotInsert);
  } else {
    userconnect.updatePass(_email, _keycode, _newpass, function(resultQuery) {
      if (resultQuery.affectedRows === 0) {
        var resultNotInsert = {
          status: false,
          ketqua: "Mã Xác Thực Không Chính Xác"
        };
        res.json(resultNotInsert);
      } else {
        var resultOK = { status: true, ketqua: "Cập Nhật Mật Khẩu Thành Công" };
        res.json(resultOK);
      }
    });
  }
});

// http://localhost:3000/gearapi/updatePass
app.post("/gearapi/updatePass", urlencodedParser, function(req, res) {
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
        var resultNotInsert = { status: false, ketqua: "Cập " };
        res.json(resultNotInsert);
      } else {
        var resultOK = { status: true, ketqua: "Update Thanh Cong" };
        res.json(resultOK);
      }
    });
  }
});

// http://localhost:3000/gearapi/updateUserInfor
app.post("/gearapi/updateUserInfor", urlencodedParser, function(req, res) {
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

// http://localhost:3000/gearapi/Listproducts
app.get("/gearapi/Listproducts", function(req, res) {
  productconnect.getproducts(function(resultQuery) {
    res.json(resultQuery);
  });
});

// http://localhost:3000/gearapi/Findproducts?name=Chu
app.get("/gearapi/Findproducts", function(req, res) {
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

//http://localhost:3000/gearapi/updateQuatity
app.post("/gearapi/updateQuatity", urlencodedParser, function(req, res) {
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

//http://localhost:3000/gearapi/addOder
app.post("/gearapi/addOder", urlencodedParser, function(req, res) {
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

// http://localhost:3000/gearapi/getOders
app.get("/gearapi/getOders", function(req, res) {
  oderconnect.getOders(function(resultQuery) {
    res.json(resultQuery);
  });
});

// http://localhost:3000/gearapi/updateStatus
app.post("/gearapi/updateStatus", urlencodedParser, function(req, res) {
  var _id = req.body.id;
  var _status = req.body.status;

  oderconnect.updateStatus(_id, _status, function(resultQuery) {
    if (resultQuery === 0) {
      var resultNotInsert = {
        status: false,
        ketqua: "Cap nhat status Fail"
      };
      res.json(resultNotInsert);
    } else {
      var resultOK = {
        status: true,
        ketqua: "Cap nhat status Success"
      };
      res.json(resultOK);
    }
  });
});

app.listen(3000);
