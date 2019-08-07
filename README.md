## Auth0-Exercise: Charlie the Customer

The steps outlined below were created with the goal of having an application, which is Whitelist protected for specific users, that when signing in will render a collection of all applications within the tenant as well as the rules associated with each application.


### Documentation

To achieve this result, the user will need to both update their current rules as well as create a Whitelist rule for the specific app that we will modify to suit the needs of this scenario.\

### Create an Application

This will be very familiar territory, I'm creating a M2M Application called 'API Explorer Application' which will be the context we will check with our custom Whitelist rule to enable the rendering of the filtered information.

![rules section](/images/APIExplore1.png)

We will need the ClientId, Domain, and Client Secret of this App handy for the next steps.

![rule page](/images/APIExplore2.png)


### Updating Pre-Existing Rules

We will use an example pre-configured rule: 'Allow Access during weekdays for a specific App' which can be found once clicking on the 'Create Rule' button within the Rules section. Here I've added two important lines to the code, the ```const request = require('request');``` and the ```context.clientMetadata = context.clientMetadata || {};``` which we will use to make requests to the Management API and instantiate a clientMetadata object that we will populate with rule information.

```
function (user, context, callback) {
  const request = require('request');
  context.clientMetadata = context.clientMetadata || {};
  
  if (context.clientName === 'TheAppToCheckAccessTo') {
    const date = new Date();
    const d = date.getDay();

    if (d === 0 || d === 6) {
      return callback(new UnauthorizedError('This app is available during the week'));
    }
  }

  callback(null, user, context);
}

```
We will update the field with the name of our recently created App  ```if (context.clientName === 'TheAppToCheckAccessTo')``` and add an options object which will allow us to POST to the Management API and receive an Access_Token we will use within this rule.

```
    let options = {
      method: 'POST',
      url: 'https://[name-of-tenant].auth0.com/oauth/token',
      headers: {'content-type': 'application/json'},
      form: {
        grant_type: 'client_credentials',
        client_id: `${context.clientID}`,
        client_secret: [client-secret-of-app],
        audience: 'https://management-exercise.auth0.com/api/v2/' //this will be the domain of your app//
      }
     };
```
Next we will make an HTTP PATCH request to the Management API to update our client object with clientMetadata that includes our rules.

```
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      let parsedData = JSON.parse(body);
        
        let patchClients = {
          method: 'PATCH',
          url: 'https://[your-tenant].auth0.com/api/v2/clients/[clientId]',
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

```
This may seem like a lot but really we're just configuring this rule to create and update the clientMetadata with the rule in question. Pay particular attention to the ```patchClients``` object and the body field it's sending. Here we have the opportunity to send the name of the rule as well as what it's order is within the rule list.

The entire rule at this point should look like this:

```
function (user, context, callback) {
  const request = require('request');
      context.clientMetadata = context.clientMetadata || {};

      if (context.clientName === 'API Explorer Application') {
          const date = new Date();
          const d = date.getDay();

      if (d === 0 || d === 6) {
          return callback(new UnauthorizedError('This app is available during the week'));
      }
        
        let options = {
          method: 'POST',
          url: 'https://[your-tenant].auth0.com/oauth/token',
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
          url: 'https://[your-tenant].auth0.com/api/v2/clients/[clientId]',
          audience: 'https://[your-tenant].auth0.com/api/v2/', // this will be the domain of your app
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

```
To test this we will check that the body of the request contains an updated 'client_metadata' field with the appropriate rules. The returned body should look something like this:

![rule body](/images/ruleUpdate.png)
