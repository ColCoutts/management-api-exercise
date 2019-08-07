//CUSTOM WHITE LIST RULE

function CustomWhitelistRule (user, context, callback) {
  const request = require('request');
  
  if(context.clientName !== 'API Explorer Application'){
    return callback(null, user, context);
  }
  // Access should only be granted to verified users.
  if (!user.email) {
    return callback(new UnauthorizedError('Access denied.'));
  }

  const whitelist = [ 'user1@example.com' ]; //authorized users
  const userHasAccess = whitelist.some(
    function (email) {
      return email === user.email;
    });

  if (!userHasAccess) {
    return callback(new UnauthorizedError('Access denied.'));
  }
  
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

    let mappedObj = new Map();
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let parsedData = JSON.parse(body);
    
      let getClients = {
      method: 'GET',
      url: 'https://management-exercise.auth0.com/api/v2/clients',
      audience: 'https://management-exercise.auth0.com/api/v2/',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${parsedData.access_token}`
      }
    };
      
      request(getClients, function(error, response, body) {
        if (error) throw new Error(error);
        let clientData = JSON.parse(body);
        for(let i = 0; i < clientData.length; i++) {
        mappedObj.set(clientData[i].name, (clientData[i].client_metadata ? clientData[i].client_metadata : {}));
        }
        console.log(mappedObj);
        return mappedObj;
    });
  });
  
  callback(null, user, context);
}
