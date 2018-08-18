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
  var sql = "SELECT count(*) FROM `users` WHERE `email` LIKE '" + email + "'";
  con.query(sql, function(err, result) {
    if (!err) {
      callbackCheck(result);
    } else {
      callbackCheck(result[0]);
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
exports.updatePass = function(email, passold, passnew, callbackInsert) {
  connectdb();
  var sql =
    "UPDATE `users` SET `password` = '" +
    passnew +
    "' WHERE `users`.`email`='" +
    email +
    "' and `password`='" +
    passold +
    "';";
  con.query(sql, function(err, results) {
    if (!err) {
      callbackInsert(results);
    } else {
      console.log("Error" + err);
    }
  });
};