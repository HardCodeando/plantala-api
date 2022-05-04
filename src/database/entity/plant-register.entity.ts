import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gardener } from './gardener.entity';
import { PlantNotification } from './plant-notification.entity';
import { Plant } from './plant.entity';

@Entity({ name: 'plant_registers' })
export class PlantRegister {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => PlantNotification,
    (plantNotificacion) => plantNotificacion.plantRegister,
  )
  notifications: PlantNotification[];

  @Column({ name: 'register_date' })
  registerDate: Date;

  @ManyToOne(() => Plant, (plant) => plant.plantRegisters)
  @JoinColumn({ name: 'plant_id' })
  plant: Plant;

  @ManyToOne(() => Gardener, (gardener) => gardener.registeredPlants)
  @JoinColumn({ name: 'gardener_id' })
  gardener: Gardener;
}
