let options = { 
  method: 'POST',
  url: 'https://management-exercise.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"uEtn1qd7KjrlPRSZYtWBFKTFiCq4lEQg","client_secret":"7CvxeFMx_P_P3kTB1kKz2rL76nUr8Jz0ls1txvDNuDPfxo3hBVzg8UrLLPVyxN5_","audience":"https://management-exercise.auth0.com/api/v2/","grant_type":"client_credentials"}' };

    // let options = { 
    //   method: 'POST',
    //   url: 'https://management-exercise.auth0.com/oauth/token',
    //   headers: { 'content-type': 'application/json' },
    //   body: '{"client_id":"uEtn1qd7KjrlPRSZYtWBFKTFiCq4lEQg","client_secret":"7CvxeFMx_P_P3kTB1kKz2rL76nUr8Jz0ls1txvDNuDPfxo3hBVzg8UrLLPVyxN5_","audience":"https://management-exercise.auth0.com/api/v2/","grant_type":"client_credentials"}' };

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
    data = JSON.parse(body).access_token;
  });

  request(getRules, function(error, context, body) {
    if (error) throw new Error(error);
    ruleData = JSON.parse(body);
    let parsedRuleContext = context.toJSON();
    console.log('rule data', parsedRuleContext);
  });

  request(getClients, function(error, context, body) {
    if (error) throw new Error(error);
    clientData = JSON.parse(body);
    console.log('client data', clientData);
    parsedContext = context.toJSON();
    console.log('context', parsedContext.body.toJSON());
  });


  request(getRules, function(error, response, body) {
    if (error) throw new Error(error);
    // let parsedRuleContext = response.toJSON();
    // let gettingBodyfromRes = parsedRuleContext.body;
    // let parsedBody = JSON.parse(gettingBodyfromRes);
    // console.log('rule data', ruleData);
    // console.log('parsed context', parsedRuleContext);
    // console.log('rule context', ruleName);
    let ruleData = JSON.parse(body);
    let ruleName = ruleData[0].name;
    console.log('rule context', ruleName);
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


       for(let clientIds of newClientObj.values()) {
          for(let i = 0; i < ruleIdArray.length; i++) {
            console.log('rule id in for loop',ruleIdArray[i]);
            if(clientIds === ruleIdArray[i]) {
              fitleredObj.set(clientIds, ruleIdArray[i]);
            } console.log('no match found');
          }
        }

             // for(let clientIds of newClientObj.values()) {
        //   // console.log('clientIds for map', clientIds);
        //   for(let i = 0; i < ruleIdArray.length; i++) {
        //     // console.log('rulesCLientId', rulesClientId[1]);
        //     if(clientIds === ruleIdArray[i]) {
        //       // console.log('GETTING THERE', clientIds, rulesClientId);
        //       // filteredObj.set(clientIds, ruleData[i].name);
        //     } console.log('No matching Ids');
        //   }
        // }
 
        // console.log('filtered oBJ', filteredObj);
        // return filteredObj;