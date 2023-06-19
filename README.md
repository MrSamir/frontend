# To Create component in common /Core library

1- Open Terminal, change the directory to library project.
    cd .\workspace\projects\shared-features-lib\src\lib\

2- We will follow a pattern of adding one component per module - this will allow a consuming application to import only the modules of the library which it is interested in, and then for all other modules to be tree shaken during the build process. also it will really make a difference to the size of your application bundles as the library grows. 

ng generate module components/Login
ng generate component components/Login

3- now, We need to update public_api.ts to export any files in the library that we wish to expose to a consuming application:
export * from './lib/components/login-demo/login-demo.module';
export * from './lib/components/login-demo/login-demo.component';

4- Next we must add each of the components we created to the exports of its module:

Sample:-
go to assets-demo.module.ts file and add the following lines after imports tags 
exports:[
    AssetsDemoComponent
  ]

4- Now all we have to do is rebuild the library, and it will be ready to consume the library from an application.
ng build --project=shared-features-lib


5- for Consuming our Angular library, go to app.module.ts file of the consuming application and add the common component in imports tag.

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginDemoComponent,
    AssetsDemoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



###########################################################################################################################################
##  Configure Angular proxy server
  
  Get a full fake REST API with __zero coding

# Install and Configure JSON server

1- Install json-server : json-server is a JavaScript library for mocking REST APIs. You can install it with the following command.
**
 npm install -g json-server** 

2- To spin a full-fledged fake backend service, you need to create a .js file for the server (e.g. server.js) and a .json file for your database(db.json)

```c#
//server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('apps/fake-backend/src/json-server-backend/db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
//server.get('/api/suggestion', (req, res) => res.status(500).jsonp({}));
server.use(jsonServer.rewriter({
   '/api/suggestion': '/suggestion',
   '/v1/*': '/bitcoinMarketData',
   })
);
// Use default router
server.use(router);
server.listen(3000, () => {
   console.log('Fake-Backend Server is running');
});
```

3- build Your fake resposne and it should provide mock responses for the routed requests.

```c#
//db.json
{
"suggestion": ["SELL"],
"bitcoinMarketData": [
   {
      "currency": "EUR",
      "high": null,
      "latest_trade": 1566979086,
      "weighted_price": null,
      "bid": 9173.0,
      "volume": 0,
      "ask": 9219.89,
      "low": null,
      "duration": 90181,
      "close": 9282.49,
      "avg": null,
      "symbol": "btcdeEUR - fake data from JSON Server",
      "currency_volume": 0
   },
   {...}
 ]
}
```

# Running JSON Server

Start JSON server by executing the following command

`json-server –watch db.json`



# Setting up proxies for Angular application

1- Create a file proxy.conf.json in your project's src/ folder.

2- Add the following content to the new proxy file:

```c#
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```

3- In the CLI configuration file, angular.json, add the proxyConfig option to the serve target:

```c#

…
  "architect": {
    "serve": {
      "builder": "@angular-devkit/build-angular:dev-server",
      "options": {
        "browserTarget": "your-application-name:build",
        "proxyConfig": "src/proxy.conf.json"
      },
…
```

4- To run the development server with this proxy configuration, call ng serve.

## references 
https://angular.io/guide/build#proxying-to-a-backend-server
https://kaustubhtalathi.medium.com/mock-data-for-angular-5-applications-with-json-server-part-1-d377eced223b
https://medium.com/ngconf/fake-it-till-you-make-it-or-how-to-mock-backend-response-in-an-angular-application-95ac3a9caf40


###########################################################################################################################################
