export class GetStudentDto {
  firstName?: string;
  age?: number;
  favoriteBooks?: string[];
  totalSpentOnBooks?: number;
  search?: string | number;
  page?: number;
  pageSize?: number;
}
