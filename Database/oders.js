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

//them mot order
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
