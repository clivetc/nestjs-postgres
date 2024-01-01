import { IsEmail } from 'class-validator';

export class CreateStudentDto {
  firstName: string;
  lastName: string;
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
  age: number;
  favoriteBooks: string[];
  totalSpentOnBooks: number;
}
