import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimePageModule } from './features/anime-page/anime-page.module';

/** App module. */
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule, AnimePageModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
	bootstrap: [AppComponent],
})
export class AppModule {}
