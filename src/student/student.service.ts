import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetStudentDto } from './dto/get-student-dto';
import { CreateStudentDto } from './dto/create-student-dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getStudents(filterDto: GetStudentDto): Promise<{
    data: Student[];
    pageCount: number;
    total: number;
    count: number;
  }> {
    const {
      firstName,
      age,
      favoriteBooks,
      totalSpentOnBooks,
      search,
      page,
      pageSize,
    } = filterDto;

    const query: SelectQueryBuilder<Student> =
      this.studentRepository.createQueryBuilder('student');

    if (firstName) {
      query.andWhere('LOWER(student.firstName) LIKE LOWER(:firstName)', {
        firstName: `%${firstName}%`,
      });
    }

    if (age) {
      query.andWhere('student.age = :age', { age });
    }

    if (favoriteBooks) {
      query.andWhere(
        'LOWER(student.favoriteBooks) LIKE LOWER(:favoriteBooks)',
        { favoriteBooks: `%${favoriteBooks}%` },
      );
    }

    if (totalSpentOnBooks) {
      query.andWhere('student.totalSpentOnBooks = :totalSpentOnBooks', {
        totalSpentOnBooks,
      });
    }

    if (search) {
      query.andWhere(
        'LOWER(student.firstName) LIKE LOWER(:search) OR LOWER(student.age) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    // Pagination
    if (page && pageSize) {
      query.skip((page - 1) * pageSize).take(pageSize);
    }

    const [data, total] = await query.getManyAndCount();

    const pageCount = pageSize ? Math.ceil(total / pageSize) : 1;

    return {
      data,
      pageCount,
      total,
      count: data.length,
    };
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const {
      firstName,
      lastName,
      email,
      age,
      favoriteBooks,
      totalSpentOnBooks,
    } = createStudentDto;

    const student = this.studentRepository.create({
      firstName,
      lastName,
      email,
      age,
      favoriteBooks,
      totalSpentOnBooks,
    });
    const studentByEmail = await this.studentRepository.findOne({
      where: { email },
    });

    if (studentByEmail) {
      throw new ConflictException('Student already exists');
    } else {
      await this.studentRepository.save(student);
    }

    return student;
  }
}
