// src/app/app.config.ts
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

export const appRoutingProviders = [];

export const AppRoutingModule = importProvidersFrom(RouterModule.forRoot(routes));
