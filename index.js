var AWS = require("aws-sdk");
var request = require("request-json");

exports.handler = (event, context, callback) => {

    //Initialize Client
    var client = request.createClient(process.env.SYS_URL);

    //Case class and properties (content)
    var data = {
              "caseTypeID" : process.env.PEGA_CASETYPE_ID,
              "processID" : "pyStartCase",
              "content" : { "pyNote": process.env.CASE_PROP_PYNOTE ? process.env.CASE_PROP_PYNOTE : "Service Case",
                            "pyLabel": process.env.CASE_PROP_PYLABEL ? process.env.CASE_PROP_PYLABEL : "pyLabel" }
               };

    //Set up basic Pega API auth
    client.setBasicAuth( process.env.OPERATOR_ID, process.env.OPERATOR_PWD);

    //POST to create case
      client.post('/prweb/api/v1/cases', data, function(err, res, body) {
          context.succeed();
          context.done();            
      });
};

