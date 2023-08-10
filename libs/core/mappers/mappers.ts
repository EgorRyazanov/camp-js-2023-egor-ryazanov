import { ValidationErrorDto } from '../../core/dtos/error.dto';
import { EntityValidationErrors } from '../models/app-error';

/** Mapper of DTO to domain model. */
export interface MapperFromDto<TDto, TDomain> {

	/** Maps from DTO to Domain model. */
	fromDto(data: TDto): TDomain;
}

/** Mapper of domain model to DTO. */
export interface MapperToDto<TDto, TDomain> {

	/** Maps from Domain to DTO model. */
	toDto(data: TDomain): TDto;
}

/** Mapper of errors of DTO to domain model errors. */
export interface ValidationErrorMapper<TDomain> {

	/** Map validation error DTO to error for domain model.
	 * @param errorDto Error DTO.
	 */
	validationErrorFromDto(errorDto: ValidationErrorDto[]): EntityValidationErrors<TDomain>;
}
