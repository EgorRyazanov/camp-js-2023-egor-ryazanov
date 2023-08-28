import { xml2js } from 'xml-js';

/** XML response. */
interface XmlResponse {

	/** Post response. */
	readonly ['PostResponse']: {

		/** Location. */
		readonly ['Location']: {

			/** Text. */
			readonly ['_text']: string;
		};
	};
}

/** XML image mapper. */
export namespace XmlImageMapper {

	/**
	 * Takes URL of image from XML.
	 * @param xml XML.
	 */
	export function fromDto(xml: string): string | null {
		const xmlResponse = xml2js(xml, { compact: true }) as XmlResponse;
		return xmlResponse.PostResponse.Location._text;
	}
}
