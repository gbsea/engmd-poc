import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';
import { UserIntegration } from './user-integration.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  remId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emrId: string | null;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 150, nullable: true })
  createdBy: string | null;

  @UpdateDateColumn({ type: 'timestamptz' })
  modifiedAt: Date;

  @Column({ type: 'varchar', length: 150, nullable: true })
  modifiedBy: string | null;

  @OneToMany(() => UserIntegration, (userIntegration) => userIntegration.user)
  integrations: UserIntegration[];
}
