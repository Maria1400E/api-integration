import { IsString, IsEmail } from 'class-validator';

export class CreateApiDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly lastname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly profession: string;
}
