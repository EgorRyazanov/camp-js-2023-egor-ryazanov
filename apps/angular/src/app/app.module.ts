import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import { ApiKeyInterceptor } from '../core/interceptors/api-key.interceptor';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ErrorPageComponent } from './features/error-page/error-page.component';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { RefreshTokenInterceptor } from '../core/interceptors/refresh-token.interceptor';
import { BasePageComponent } from './features/base-page/base-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/** App module. */
@NgModule({
	declarations: [AppComponent, ErrorPageComponent, BasePageComponent],
	imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule, MatIconModule, MatButtonModule],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
