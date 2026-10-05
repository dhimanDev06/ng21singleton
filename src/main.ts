import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { isDevMode, enableProfiling } from '@angular/core';

if (isDevMode()) {
  enableProfiling(); 
}
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
