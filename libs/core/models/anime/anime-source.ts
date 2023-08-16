/** Anime Source. */
export enum Source {
	FourKomaManga = 'FourKomaManga',
	Book = 'Book',
	CardGame = 'CardGame',
	Game = 'Game',
	LightNovel = 'LightNovel',
	Manga = 'Manga',
	MixedMedia = 'MixedMedia',
	Music = 'Music',
	Novel = 'Novel',
	Original = 'Original',
	PictureBook = 'PictureBook',
	Radio = 'Radio',
	VisialNovel = 'VisualNovel',
	WebManga = 'WebManga',
	WebNovel = 'WebNovel',
	Other = 'Other',
	Unknown = 'Unknown',
}

/** Source. */
export namespace Source {
	const TO_TITLE_MAP: Record<Source, string> = {
		[Source.Book]: 'Book',
		[Source.CardGame]: 'Card game',
		[Source.FourKomaManga]: 'Four koma manga',
		[Source.Game]: 'Game',
		[Source.LightNovel]: 'Light novel',
		[Source.Manga]: 'Manga',
		[Source.MixedMedia]: 'Mixed Media',
		[Source.Music]: 'Music',
		[Source.Novel]: 'Novel',
		[Source.Original]: 'Original',
		[Source.Other]: 'Other',
		[Source.PictureBook]: 'Picture book',
		[Source.WebNovel]: 'Web novel',
		[Source.WebManga]: 'Web manga',
		[Source.Radio]: 'Radio',
		[Source.Unknown]: 'Unknown',
		[Source.VisialNovel]: 'Visial novel',
	};

	/**
	 * Makes source readable.
	 * @param source Source.
	 */
	export function toReadable(source: Source | null): string | null {
		if (source != null) {
			return TO_TITLE_MAP[source];
		}

		return null;
	}
}
