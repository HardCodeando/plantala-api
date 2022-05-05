import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GardenerEntity } from './gardener.entity';
import { PlantNotificationEntity } from './plant-notification.entity';
import { PlantEntity } from './plant.entity';

@Entity({ name: 'plant_registers' })
export class PlantRegisterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => PlantNotificationEntity,
    (plantNotificacion) => plantNotificacion.plantRegister,
  )
  notifications: PlantNotificationEntity[];

  @Column({ name: 'register_date' })
  registerDate: Date;

  @ManyToOne(() => PlantEntity, (plant) => plant.plantRegisters)
  @JoinColumn({ name: 'plant_id' })
  plant: PlantEntity;

  @ManyToOne(() => GardenerEntity, (gardener) => gardener.registeredPlants)
  @JoinColumn({ name: 'gardener_id' })
  gardener: GardenerEntity;
}
