import { SetMetadata } from '@nestjs/common';

export const IS_ACCESS_PRODUCTION = 'IS_ACCESS_PRODUCTION';
export const IsAccessProduction = () => SetMetadata(IS_ACCESS_PRODUCTION, true);
