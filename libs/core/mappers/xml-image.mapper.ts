import { xml2js } from 'xml-js';

/** XML image mapper. */
export namespace XmlImageMapper {

	/**
	 * Takes URL of image from XML.
	 * @param xml XML.
	 */
	export function fromDto(xml: string): string | null {
		const xmlResponse = xml2js(xml, { compact: true });
		if ('PostResponse' in xmlResponse) {
			const postRespone = xmlResponse.PostResponse;
			if ('Location' in postRespone) {
				const location = postRespone.Location;
				if ('_text' in location) {
					return location._text;
				}
			}
		}

		return null;
	}
}
