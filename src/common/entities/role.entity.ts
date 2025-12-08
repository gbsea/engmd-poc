import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 150, nullable: true })
  createdBy: string | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  modifiedAt: Date;

  @Column({ type: 'varchar', length: 150, nullable: true })
  modifiedBy: string | null;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
