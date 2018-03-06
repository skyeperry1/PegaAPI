//process.env.NODE_CONFIG_DIR = process.env["LAMBDA_TASK_ROOT"];
var AWS = require("aws-sdk");
request = require('request-json');

exports.handler = (event, context, callback) => {

    //Initialize Client
    var client = request.createClient(SYS_URL);


    //Case class and properties(Content)
    var data = {
              "caseTypeID" : process.env.PEGA_API_ENDPOINT,
              "processID" : "pyStartCase",
              "content" : { "pyNote": process.env.CASE_PROP_PYNOTE ? process.env.CASE_PROP_PYNOTE : "Service Case",
                            "pyLabel": process.env.CASE_PROP_PYLABEL ? process.env.CASE_PROP_PYLABEL : "pyLabel" }
               };

    //Set up basic Pega API auth
    client.setBasicAuth( process.env.OPERATOR_ID, process.env.OPERATOR_PWD);

    //POST to create case
      client.post('/prweb/api/v1/cases', data, function(err, res, body) {
          context.succeed();
          console.log(res);
          context.done();            
      });
};x