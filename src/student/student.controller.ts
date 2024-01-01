import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { GetStudentDto } from './dto/get-student-dto';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student-dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  getStudents(@Query() filterDto: GetStudentDto): Promise<{
    data: Student[];
    pageCount: number;
    total: number;
    count: number;
  }> {
    return this.studentService.getStudents(filterDto);
  }

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }
}
