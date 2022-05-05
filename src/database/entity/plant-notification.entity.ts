import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlantRegisterEntity } from './plant-register.entity';

@Entity({ name: 'plant_notifications' })
export class PlantNotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @Column()
  reason: string;

  @ManyToOne(
    () => PlantRegisterEntity,
    (plantRegister) => plantRegister.notifications,
  )
  @JoinColumn({ name: 'plant_register_id' })
  plantRegister: PlantRegisterEntity;
}
