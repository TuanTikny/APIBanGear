var mysql = require("mysql");

const con = mysql.createConnection({
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

//add 1 order
exports.addOder = function(
  jsonproducts,
  jsonuser,
  totalprice,
  dateoder,
  status,
  callbackInsert
) {
  connectdb();
  var sql =
    "INSERT INTO `oders` (`id`, `jsonproducts`, `jsonuser`, `totalprice`, `date`,`status`) VALUES (NULL, '" +
    jsonproducts +
    "', '" +
    jsonuser +
    "', '" +
    totalprice +
    "', '" +
    dateoder +
    "','" +
    status +
    "')";
  con.query(sql, function(err, results) {
    if (!err) {
      callbackInsert(results);
    } else {
      console.log("Error" + err);
    }
  });
};

// Select Oders
exports.getOders = function(callbackSelectOder) {
  connectdb();
  var sql = "SELECT * FROM `oders`";
  con.query(sql, function(err, results, fieds) {
    if (!err) {
      // trả về array oder
      callbackSelectOder(results);
    } else {
      console.log("ErrorGetProduct" + err);
    }
  });
};

// Update Status for Oder
exports.updateStatus = function(id, status, callbackUpdateStatus) {
  connectdb();
  var sql =
    "UPDATE `oders` SET `status` = '" +
    status +
    "' WHERE `oders`.`id` = " +
    id +
    "";
  con.query(sql, function(err, results) {
    // console.log(results);
    if (results.affectedRows === 0) {
      callbackUpdateStatus(0);
    } else {
      callbackUpdateStatus(results);
    }
  });
};
