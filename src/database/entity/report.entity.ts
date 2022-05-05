import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GardenerEntity } from './gardener.entity';

@Entity({ name: 'reports' })
export class ReportdEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @ManyToOne(() => GardenerEntity, (gardener) => gardener.reports)
  @JoinColumn({ name: 'gardener_id' })
  gardener: GardenerEntity;
}
