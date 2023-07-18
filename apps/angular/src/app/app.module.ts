import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimeModule } from './features/anime/anime.module';

/** App module. */
@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, SharedModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, AnimeModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
