import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'configurations' })
export class Configuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'value' })
  value: string;
}
