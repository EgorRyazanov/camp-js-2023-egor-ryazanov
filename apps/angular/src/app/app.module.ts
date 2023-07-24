import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import { ApiKeyInterceptor } from '../core/interceptors/api-key.interceptor';
import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ErrorPageComponent } from './features/error-page/error-page.component';
import { AnimeModule } from './features/anime/anime.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/** App module. */
@NgModule({
	declarations: [AppComponent, ErrorPageComponent],
	imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule, AnimeModule],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
