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

  console.log('context', context);

  if (context.clientName === 'API Explorer Application') {
      const date = new Date();
      const d = date.getDay();

      if (d === 0 || d === 6) {
        return callback(new UnauthorizedError('This app is available during the week'));
      }
    
    //start of PATCH HTTP request once clientName has been verified//
    
      context.clientMetadata = context.clientMetadata || {};

      if (context.clientName === 'API Explorer Application') {
        let options = {
          method: 'POST',
          url: 'https://management-exercise.auth0.com/oauth/token',
          headers: {'content-type': 'application/json'},
          form: {
            grant_type: 'client_credentials',
            client_id: `${context.clientID}`,
            client_secret: '7CvxeFMx_P_P3kTB1kKz2rL76nUr8Jz0ls1txvDNuDPfxo3hBVzg8UrLLPVyxN5_',
            audience: 'https://management-exercise.auth0.com/api/v2/'
          }
        };
        
      request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let parsedData = JSON.parse(body);
        
        let patchClients = {
          method: 'PATCH',
          url: 'https://management-exercise.auth0.com/api/v2/clients/uEtn1qd7KjrlPRSZYtWBFKTFiCq4lEQg',
          audience: 'https://management-exercise.auth0.com/api/v2/',
          body: {client_metadata: { "rule2": "Allow Access during weekdays for a specific App" } },
          json: true,
          headers: {'content-type': 'application/json', authorization: `Bearer ${parsedData.access_token}`}
        };
        
        request(patchClients, function (error, response, body) {
          if (error) throw new Error(error);
            console.log(body);
            return body;
        });
        
      });    
    }
    callback(null, user, context);
  }



const checkScopes = jwtAuthz(['read:messages']);
      
app.get('/api/public', function(req, res) {


  res.json({
    projects: `${JSON.stringify(clientIdObj)}`
  });
});

app.listen(3010);
console.log('Listening on http://localhost:3010');
