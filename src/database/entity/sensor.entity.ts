import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Gardener } from './gardener.entity';

@Entity({ name: 'sensors' })
export class Sensor {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'bonding_date', type: 'timestamptz', nullable: true })
  bondingDate: Date;

  @Column()
  synchronized: boolean;

  //   @Column({ name: 'sync_time', type: 'timestamptz', nullable: true })
  //   syncTime: Date;

  @ManyToOne(() => Gardener, (gardener) => gardener.reports)
  @JoinColumn({ name: 'gardener_id' })
  gardener: Gardener;
}
