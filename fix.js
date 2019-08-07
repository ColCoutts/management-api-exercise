function (user, context, callback) {
  const request = require('request');
  
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
            client_id: 'uEtn1qd7KjrlPRSZYtWBFKTFiCq4lEQg',
            client_secret: '7CvxeFMx_P_P3kTB1kKz2rL76nUr8Jz0ls1txvDNuDPfxo3hBVzg8UrLLPVyxN5_',
            audience: 'https://management-exercise.auth0.com/api/v2/'
          }
        };
        
      request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let parsedData = JSON.parse(body);
      console.log('PARSED JSON', parsedData.access_token);
        
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
            console.log(body, 'bodddyyyyy');
            return body;
        });
        }
        
      });
        
  }

  callback(null, user, context);
}