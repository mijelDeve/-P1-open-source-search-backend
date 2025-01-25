import { IsNotEmpty, IsString } from "class-validator";

export class CreateRequestDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsString()
    link: string;

    @IsString()
    userId: string;

    @IsString()
    languageId: string;
    
    @IsString()
    levelId: string;
}
