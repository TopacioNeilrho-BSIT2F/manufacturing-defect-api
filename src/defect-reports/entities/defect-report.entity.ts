import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity.js';
import { User } from '../../users/entities/user.entity.js';

@Entity('defect_reports')
export class DefectReport {
  @PrimaryGeneratedColumn({ name: 'report_id' })
  report_id!: number;

  @Column({ name: 'product_id', type: 'int' })
  product_id!: number;

  @ManyToOne(() => Product, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ name: 'reported_by', type: 'int' })
  reported_by!: number;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'reported_by' })
  reporter!: User;

  @Column({ name: 'defect_description', type: 'text' })
  defect_description!: string;

  @Column({
    name: 'severity',
    type: 'enum',
    enum: ['Low', 'Medium', 'High'],
  })
  severity!: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  })
  status!: string;

  @Column({
    name: 'report_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  report_date!: Date;
}