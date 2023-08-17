import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

/** Video. */
@Component({
	selector: 'camp-video-player',
	templateUrl: './video-player.component.html',
	styleUrls: ['./video-player.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
	/**
	 * Video URL.
	 * @param url Video URL.
	 */
	@Input({ required: true })
	public set videoUrl(url: string | null) {
		if (url != null) {
			this.saveVideoUrl$.next(this.sanitizer.bypassSecurityTrustResourceUrl(url));
		}
	}

	/** Save video URL.  */
	protected readonly saveVideoUrl$ = new BehaviorSubject<SafeResourceUrl | null>(null);

	private readonly sanitizer = inject(DomSanitizer);
}
