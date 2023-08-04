/** Anime Source. */
export enum Sources {
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

export namespace Source {
	const TO_TITLE_MAP: Record<Sources, string> = {
		[Sources.Book]: 'Book',
		[Sources.CardGame]: 'Card game',
		[Sources.FourKomaManga]: 'Four koma manga',
		[Sources.Game]: 'Game',
		[Sources.LightNovel]: 'Light novel',
		[Sources.Manga]: 'Manga',
		[Sources.MixedMedia]: 'Mixed Media',
		[Sources.Music]: 'Music',
		[Sources.Novel]: 'Novel',
		[Sources.Original]: 'Original',
		[Sources.Other]: 'Other',
		[Sources.PictureBook]: 'Picture book',
		[Sources.WebNovel]: 'Web novel',
		[Sources.WebManga]: 'Web manga',
		[Sources.Radio]: 'Radio',
		[Sources.Unknown]: 'Unknown',
		[Sources.VisialNovel]: 'Visial novel',
	};

	export function toReadable(source: Sources): string {
		return TO_TITLE_MAP[source];
	}
}
