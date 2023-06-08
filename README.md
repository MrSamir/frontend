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

