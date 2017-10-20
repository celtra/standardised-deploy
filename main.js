var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var ID = process.env.GOOGLE_SHEET_ID
var CREDENTIALS = {
  client_email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_SHEET_PRIVATE_KEY
}

var sheet = new GoogleSpreadsheet(ID)

function exit(err) {
  console.log(err.message);
  process.exit(1);
}

var schema_row;
sheet.useServiceAccountAuth(CREDENTIALS, function(err) {
  if (err) exit(err);
  sheet.getInfo(function(err, info) {
    info.worksheets[0].getRows({}, function(err, rows) {
      if (err) exit(err);

      rows.forEach(function(row) {
        if (!schema_row) schema_row = row;
        console.log(row.appname)
      });
      rows[rows.length -1].appname = "modified by node script";
      rows[rows.length -1].save();
    });
    info.worksheets[0].addRow({appname: "added by the same script"}, function(err, row) {;});
  });
});
