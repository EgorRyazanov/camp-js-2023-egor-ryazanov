import { Pipe, PipeTransform } from '@angular/core';
import { StudioMapper } from '@js-camp/core/mappers/studio/studio.mapper';
import { Studio } from '@js-camp/core/models/studio/studio';

/** Studios pipe. */
@Pipe({
	name: 'readableStudios',
})
export class ReadableStudiosPipe implements PipeTransform {
	/**
	 * Makes studios readable.
	 * @param value Array of studio.
	 */
	public transform(value: readonly Studio[]): string {
		return StudioMapper.toReadable(value);
	}
}
