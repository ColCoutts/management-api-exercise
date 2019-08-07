# Auth0-Exercise: Charlie the Customer

The steps outlined below were created with the goal of having an application, which is Whitelist protected for specific users, that when signing in will render a collection of all applications within the tenant as well as the rules associated with each application.


## Documentation

To achieve this result, the user will need to both update their current rules as well as create a Whitelist rule for the specific app that we will modify to suit the needs of this scenario.


## Create an Application

This will be very familiar territory, I'm creating a M2M Application called 'API Explorer Application' which will be the context we will check with our custom Whitelist rule to enable the rendering of the filtered information.




## Updating Pre-Existing Rules

We will use an example pre-configured rule: 'Allow Access during weekdays for a specific App' which can be found once clicking on the 'Create Rule' button within the Rules section. 

```




```


