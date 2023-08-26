import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import { ApiKeyInterceptor } from '../core/interceptors/api-key.interceptor';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { RefreshTokenInterceptor } from '../core/interceptors/refresh-token.interceptor';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './features/error-page/error-page.component';
import { BasePageComponent } from './features/base-page/base-page.component';

/** App module. */
@NgModule({
	declarations: [AppComponent, ErrorPageComponent, BasePageComponent],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
