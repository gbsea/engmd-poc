import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserIntegration } from "./user-integration.entity";

@Entity({ name: "integrations" })
@Unique(["name"])
export class Integration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150, unique: true })
  codebaseKey: string;

  @Column({ type: "varchar", length: 150 })
  name: string;

  @Column({ type: "varchar", length: 2000, nullable: true })
  iconUrl: string | null;

  @Column({ type: "varchar", length: 2000, nullable: true })
  description: string | null;

  @Column({ type: "varchar", length: 1000, nullable: true })
  launchUrl: string | null;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Column({ type: "varchar", length: 150, nullable: true })
  createdBy: string | null;

  @UpdateDateColumn({ type: "timestamptz" })
  modifiedAt: Date;

  @Column({ type: "varchar", length: 150, nullable: true })
  modifiedBy: string | null;

  @OneToMany(() => UserIntegration, (userIntegration) => userIntegration.integration)
  userIntegrations: UserIntegration[];
}
