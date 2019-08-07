// const express = require('express');
// const app = express();
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');
// const cors = require('cors');
// const request = require("request");
// require('dotenv').config();

// if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
//   throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
// }

// const corsOptions =  {
//   origin: 'http://localhost:3000'
// };

// app.use(cors(corsOptions));

// const checkJwt = jwt({
//   // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),

//   // Validate the audience and the issuer.
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// });

// // Management API routes

//     let options = {
//         method: 'POST',
//         url: 'https://management-exercise.auth0.com/oauth/token',
//         headers: {'content-type': 'application/json'},
//         form: {
//             grant_type: 'client_credentials',
//             client_id: 'uEtn1qd7KjrlPRSZYtWBFKTFiCq4lEQg',
//             client_secret: '7CvxeFMx_P_P3kTB1kKz2rL76nUr8Jz0ls1txvDNuDPfxo3hBVzg8UrLLPVyxN5_',
//             audience: 'https://management-exercise.auth0.com/api/v2/'
//           }
//         };

//     let getClients = {
//       method: 'GET',
//       url: 'https://management-exercise.auth0.com/api/v2/clients',
//       audience: 'https://management-exercise.auth0.com/api/v2/',
//       headers: {'content-type': 'application/json', authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5rVkVOVVkyTUVZd05FVTVSa1ZETkVVMFFqTkNOVFZFTVVZM01qWkZRa0l4TkRSQlEwVTVSUSJ9.eyJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtZXhlcmNpc2UuYXV0aDAuY29tLyIsInN1YiI6InVFdG4xcWQ3S2pybFBSU1pZdFdCRktURmlDcTRsRVFnQGNsaWVudHMiLCJhdWQiOiJodHRwczovL21hbmFnZW1lbnQtZXhlcmNpc2UuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1NjUxMjExOTUsImV4cCI6MTU2NTIwNzU5NSwiYXpwIjoidUV0bjFxZDdLanJsUFJTWll0V0JGS1RGaUNxNGxFUWciLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.ZtLh1P3RAOk6yTgvgkPoHeUeb-9lIdWbLAQHYMaHBG0KIlkXLmw1ibz4Thd2awv2QruzdqI_Yw3Q8eJkPpYqMhO-uW72au2wJVkd_rmhqz-3A4EicwWzKSPA5a9Ynxr2q-pc8flFFAS7wxKL-umNtgAvoSn2TQfhXk9ahUy3hRozuw9YGMfApPITiol4NOhgyRV75g6JmA-k74QRUYkl6m995UPgkTTovO6pJjI3k1QJmLw8IdhbNIaR2UR6TXBM6LMs9nAFFII75y7mACPnwWuxzTB-zgGO-dy35aNAS9xhcGuk8uTGPloVjhPyGFqoBs7P4EqnZt3o3w5gVYYxhQ'}
//     };

//     let mappedObj = new Map();
    
//     request(options, function (error, response, body) {
//       if (error) throw new Error(error);
//       let parsedData = JSON.parse(body)
//       });

//     request(getClients, function(error, response, body) {
//       if (error) throw new Error(error);
//       let clientData = JSON.parse(body);
//       for(let i = 0; i < clientData.length; i++) {

//       console.log('client data =============', clientData[i].name, clientData[i].client_metadata);

//       mappedObj.set(clientData[i].name, clientData[i].client_metadata);
//       }
//       console.log('mapped OBJ-------', mappedObj);
//     });


// app.listen(3010);
// console.log('Listening on http://localhost:3010');