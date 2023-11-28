import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// bootstrapApplication(AppComponent, {
//     providers: [    
//       importProvidersFrom(HttpClientModule),
//       importProvidersFrom(HttpClientJsonpModule),
//     ]
//   });