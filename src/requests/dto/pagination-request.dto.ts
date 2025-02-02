// export class PaginationDto {
//   page?: number;
//   limit?: number;
//   languageId?: number;
//   levelId?: number;
// }


import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationDto {
  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;

  @IsString()
  @IsOptional()
  link: string;

  @IsString()
  @IsOptional()
  languageId: string;

  @IsString()
  @IsOptional()
  levelId: string;
}
