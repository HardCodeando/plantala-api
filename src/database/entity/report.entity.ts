import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Gardener } from './gardener.entity';

@Entity({ name: 'reports' })
export class Report {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @ManyToOne(() => Gardener, (gardener) => gardener.reports)
  @JoinColumn({ name: 'gardener_id' })
  gardener: Gardener;
}
