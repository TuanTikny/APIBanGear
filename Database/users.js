var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbgear"
});

var connectdb = function() {
  con.connect(function(err) {
    if (!err) {
      console.log("Database is connected ...");
    } else {
      //  console.log(err);
    }
  });
};

// check sự tồn tại của email
exports.checkUser = function(email, callbackCheck) {
  connectdb();
  var sql = "SELECT * FROM `users` WHERE `email` = '" + email + "'";
  con.query(sql, function(err, result) {
    if (result != "") {
      callbackCheck(result);
    } else {
      callbackCheck(0);
    }
  });
};

// sign up mail with pass
exports.insertUser = function(email, pass, callbackInsert) {
  connectdb();

  var sql =
    "INSERT INTO `users` (`id`, `email`, `password`, `name`, `roles`, `birthday`, `phone`) VALUES (NULL, '" +
    email +
    "', '" +
    pass +
    "', NULL, '', NULL, NULL)";
  con.query(sql, function(err, results) {
    if (!err) {
      callbackInsert(results);
    } else {
      console.log("Error" + err);
    }
  });
};

// update pass
exports.updatePass = function(email, passold, passnew, callbackUpdate) {
  connectdb();
  var sql =
    "UPDATE `users` SET `password` = '" +
    passnew +
    "' WHERE `users`.`email`='" +
    email +
    "' and `password`='" +
    passold +
    "';";
  con.query(sql, function(err, results, fieds) {
    if (!err) {
      callbackUpdate(results);
      console.log(results);
    } else {
      console.log("Error" + err);
    }
  });
};

// Update User infor
exports.updateUserInfor = function(
  id,
  name,
  birthday,
  phone,
  callbackUpdateInfor
) {
  connectdb();
  var sql =
    "UPDATE `users` SET `name` = '" +
    name +
    "', `birthday` = '" +
    birthday +
    "', `phone` = '" +
    phone +
    "' WHERE `users`.`id` = " +
    id +
    "";
  con.query(sql, function(err, results, fieds) {
    if (results.affectedRows === 0) {
      callbackUpdateInfor(0);
    } else {
      callbackUpdateInfor(results);
    }
  });
};

// select and login
//SELECT * FROM `users` WHERE email like 'buianhtuan' and `password` like '222222'

exports.loginUser = function(email, pasword, callbackLogin) {
  connectdb();
  var sql =
    "SELECT * FROM `users` WHERE email like '" +
    email +
    "' and `password` like '" +
    pasword +
    "'";
  con.query(sql, function(err, result) {
    // console.log(result);
    if (result != "") {
      callbackLogin(result);
    } else {
      callbackLogin(0);
    }
  });
};
