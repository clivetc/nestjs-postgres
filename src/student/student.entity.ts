import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  firstName: string;
  @Column()
  age: number;
  @Column()
  lastName: string;
  @Column('text', { array: true })
  favoriteBooks: string[];
  @Column()
  totalSpentOnBooks: number;
}
