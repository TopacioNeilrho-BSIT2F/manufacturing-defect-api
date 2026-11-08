
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  product_id: number;

  @Column({ name: 'product_name', type: 'varchar', length: 100 })
  product_name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;
}
