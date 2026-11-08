
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('defect_reports')
export class DefectReport {
  @PrimaryGeneratedColumn({ name: 'report_id' })
  report_id!: number;

  @Column({ name: 'product_id', type: 'int' })
  product_id!: number;

  @Column({ name: 'reported_by', type: 'int' })
  reported_by!: number;

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
