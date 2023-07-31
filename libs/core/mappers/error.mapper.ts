import { ErrorDto } from '../dtos/error.dto';
import { AppError } from '../models/app-error';

export namespace ErrorMapper {
	export function fromDto(errors: ErrorDto[]): AppError[] {
		return errors.map((error) => new AppError(error.detail, error.attr, error.code));
	}
}
