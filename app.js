const express = require("express");
const body_parser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

port = 3000;
// this line is very important to load any local files like css and images as they are static in this case
app.use(express.static("public"));
// this also is important to get the data from the html page
app.use(body_parser.urlencoded({ extended: true }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/signup.html");
});

app.post("/", function (request, main_response) {
  var first_name = request.body.fname;
  var last_name = request.body.lname;
  var user_email = request.body.email;
  // var user_password = request.body.password;

  var data = {
    members: [
      {
        email_address: user_email,
        status: "subscribed",
        merge_fields: {
          FNAME: first_name,
          LNAME: last_name,
        },
      },
    ],
  };

  const json_data = JSON.stringify(data);
  // console.log(json_data);
  // console.log(
  //   first_name + " " + last_name + " " + user_email + " " + user_password
  // );
  const url = "https://us14.api.mailchimp.com/3.0/lists/b170ddf41b";
  const options = {
    method: "POST",
    auth: "abdelrahman1:eee886a1a4498a4f604208fc35a762d2-us14",
  };
  const request_2 = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      main_response.sendFile(__dirname + "/sucess.html");
    } else {
      main_response.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request_2.write(json_data);
  request_2.end();
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || port, function () {
  console.log("Now I am Listening!!");
});

// my API Key
// eee886a1a4498a4f604208fc35a762d2-us14

// our Unique ID
// b170ddf41b
