import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlantRegister } from './plant-register.entity';

@Entity({ name: 'plant_notifications' })
export class PlantNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @Column()
  reason: string;

  @ManyToOne(
    () => PlantRegister,
    (plantRegister) => plantRegister.notifications,
  )
  @JoinColumn({ name: 'plant_register_id' })
  plantRegister: PlantRegister;
}
