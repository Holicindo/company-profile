import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Solution } from './solution.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('solution_product_links')
export class SolutionProductLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  solutionId: number;

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Solution, solution => solution.productLinks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'solutionId' })
  solution: Solution;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
