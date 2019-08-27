// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/API/timestamp/:date_string?", function (req, res) {
  const date_string = req.params.date_string
  const date_obj = new Date(date_string)
  
  if (!date_string){
  //console.log('empty')
    return res.json({unix: new Date().getTime(),
                    utc: new Date().toUTCString()
                    })
}
  // Date.parse() on an invalid date object will return nan, falsey
  else if (!Date.parse(new Date(date_string))){
    return res.json({error: "Invalid Date"})
  }
  else{
    res.json({
      unix: date_obj.getTime() ,
      utc: date_obj.toUTCString()   
    })
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});