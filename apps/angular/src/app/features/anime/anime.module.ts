import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AnimeComponent } from './anime.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@js-camp/angular/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
	declarations: [AnimeComponent],
	imports: [
		HttpClientModule,
		CommonModule,
		SharedModule,
		MatTableModule,
		NgIf,
		MatProgressSpinnerModule,
		MatSortModule,
		MatPaginatorModule,
	],
})
export class AnimeModule {}
