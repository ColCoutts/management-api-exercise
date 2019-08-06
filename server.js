const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const request = require("request");
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

const corsOptions =  {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});


// Management API routes

let options = {
    method: 'POST',
    url: 'https://management-exercise.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    form: {
        grant_type: 'client_credentials',
        client_id: 'uEtn1qd7KjrlPRSZYtWBFKTFiCq4lEQg',
        client_secret: '7CvxeFMx_P_P3kTB1kKz2rL76nUr8Jz0ls1txvDNuDPfxo3hBVzg8UrLLPVyxN5_',
        audience: 'https://management-exercise.auth0.com/api/v2/'
      }
    };

    let getRules = {
      method: 'GET',
      url: 'https://management-exercise.auth0.com/api/v2/rules',
      audience: 'https://management-exercise.auth0.com/api/v2/',
      headers: {'content-type': 'application/json', authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVkVOVVkyTUVZd05FVTVSa1ZETkVVMFFqTkNOVFZFTVVZM01qWkZRa0l4TkRSQlEwVTVSUSJ9.eyJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtZXhlcmNpc2UuYXV0aDAuY29tLyIsInN1YiI6InVFdG4xcWQ3S2pybFBSU1pZdFdCRktURmlDcTRsRVFnQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21hbmFnZW1lbnQtZXhlcmNpc2UuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1NjUwMzIyOTMsImV4cCI6MTU2NTExODY5MywiYXpwIjoidUV0bjFxZDdLanJsUFJTWll0V0JGS1RGaUNxNGxFUWciLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.DIaV8_OhmFHr7p2QMwB7xzLgEBUH8k30mYMAS6H2Pae8iJmPYl2IA1EZ7N5jaL3ES1EDh4A7lp5rDtG85ZGmw0PuEvn1U244wRThOwhh23lTOrbzpsUho3N5tsAyocD87BvEriUFBYyKDDP881WgdX5AbRJHWJ4y8Sv1zYZ0JNUxkZByNBUFKZSmaqIxKpagI_xnSY_Ec6DiMq5fMqQDjMUS4WsEtCCXAU5xvb12DqHsIkFimh0dnh8P-aVYrhB4gVWwIqUv_NplQWVPSPO_ud5kt8ss_l3WZVVvk8JqhOT1QlItv-uqCrDF8mWxg-uMy1JeZgqLdkFGo0ENp6V_Rw'}
    }

    let getClients = {
      method: 'GET',
      url: 'https://management-exercise.auth0.com/api/v2/clients',
      audience: 'https://management-exercise.auth0.com/api/v2/',
      headers: {'content-type': 'application/json', authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVkVOVVkyTUVZd05FVTVSa1ZETkVVMFFqTkNOVFZFTVVZM01qWkZRa0l4TkRSQlEwVTVSUSJ9.eyJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtZXhlcmNpc2UuYXV0aDAuY29tLyIsInN1YiI6InVFdG4xcWQ3S2pybFBSU1pZdFdCRktURmlDcTRsRVFnQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21hbmFnZW1lbnQtZXhlcmNpc2UuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1NjUwMzIyOTMsImV4cCI6MTU2NTExODY5MywiYXpwIjoidUV0bjFxZDdLanJsUFJTWll0V0JGS1RGaUNxNGxFUWciLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.DIaV8_OhmFHr7p2QMwB7xzLgEBUH8k30mYMAS6H2Pae8iJmPYl2IA1EZ7N5jaL3ES1EDh4A7lp5rDtG85ZGmw0PuEvn1U244wRThOwhh23lTOrbzpsUho3N5tsAyocD87BvEriUFBYyKDDP881WgdX5AbRJHWJ4y8Sv1zYZ0JNUxkZByNBUFKZSmaqIxKpagI_xnSY_Ec6DiMq5fMqQDjMUS4WsEtCCXAU5xvb12DqHsIkFimh0dnh8P-aVYrhB4gVWwIqUv_NplQWVPSPO_ud5kt8ss_l3WZVVvk8JqhOT1QlItv-uqCrDF8mWxg-uMy1JeZgqLdkFGo0ENp6V_Rw'}
    }

    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let parsedData = JSON.parse(body)
        // console.log('body parsed', parsedData);
      });
      

    // request(getRules, function(error, response, body) {
    //   if (error) throw new Error(error);
    //   let ruleData = JSON.parse(body);
    //   let regex = /(?<=\-\s)(.*)/gm;
    //   let clientArray = new Map();

    //   for(let i = 0; i < ruleData.length; i++) {
    //     let string = ruleData[i].name;
    //     let ruleClientIds = string.match(regex);
    //     // clientArray.push(ruleClientIds.join());
    //     clientArray.set(ruleData[i].name, ruleClientIds.join());
    //   }
    //   console.log('rulesObj', clientArray)
    // });

    request(getClients, function(error, response, body) {
      if (error) throw new Error(error);
      clientData = JSON.parse(body);
      let newClientObj = new Map();
      let newRuleObj = new Map();
      let filteredObj = new Map();

      // let clientArray = [];
      for(let i = 0; i < clientData.length; i++) {
        newClientObj.set(clientData[i].name, clientData[i].client_id);
        // clientArray.push(clientData[i].client_id);
      }
      console.log('newClientObj', newClientObj);

      request(getRules, function(error, response, body) {
        if (error) throw new Error(error);
        let ruleData = JSON.parse(body);
        let regex = /(?<=\-\s)(.*)/gm;
        // let ruleArray = [];
        // console.log('newclientobjtest', newClientObj);
        for(let i = 0; i < ruleData.length; i++) {
          let string = ruleData[i].name;
          let ruleClientIds = string.match(regex);
          ruleClientIds.join();
          // ruleArray.push(ruleClientIds[i]);
          
          // newRuleObj.push(ruleClientIds.join());
          newRuleObj.set(ruleData[i].name, ruleClientIds.join());
        }

        for(let clientIds of newClientObj.values()) {
          console.log('clientIds for map', clientIds);
          for(let rulesClientId of newRuleObj) {
            console.log('rulesCLientId', rulesClientId[1]);
            if(clientIds === rulesClientId[1]) {
              console.log('GETTING THERE', clientIds, rulesClientId);
              filteredObj.set(clientIds, rulesClientId[0]);
            } console.log('nope');
          }
        }
        // console.log('newRuleObj', newRuleObj);
        // console.log('the CLIENT OBJ', newClientObj);
        console.log('filtered oBJ', filteredObj);
      });

    });

      


//examples of public/protected routes

const checkScopes = jwtAuthz(['read:messages']);
      
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

app.listen(3010);
console.log('Listening on http://localhost:3010');
