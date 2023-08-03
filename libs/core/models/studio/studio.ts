/** Studio. */
export class Studio {
	/** ID. */
	public readonly id: number;

	/**
	 * Created date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	public readonly created: Date;

	/**
	 * Modified date.
	 * @example 2023-07-13T08:25:29.562276Z.
	 */
	public readonly modified: Date;

	/** Name. */
	public readonly name: string;

	public constructor(studioData: Studio) {
		this.id = studioData.id;
		this.created = studioData.created;
		this.modified = studioData.modified;
		this.name = studioData.name;
	}
}
