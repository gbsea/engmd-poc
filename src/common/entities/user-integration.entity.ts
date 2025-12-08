import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn, Column } from "typeorm";
import { Integration } from "./integration.entity";
import { User } from "./user.entity";

@Entity({ name: "user_integrations" })
@Unique(["user", "integration"])
export class UserIntegration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Integration, (integration) => integration.userIntegrations, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "integrationId" })
  integration: Integration;

  @ManyToOne(() => User, (user) => user.integrations, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @Column({ type: "varchar", length: 150, nullable: true })
  createdBy: string | null;

  @UpdateDateColumn({ type: "timestamptz" })
  modifiedAt: Date;

  @Column({ type: "varchar", length: 150, nullable: true })
  modifiedBy: string | null;
}
