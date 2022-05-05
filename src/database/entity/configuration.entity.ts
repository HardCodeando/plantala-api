import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'configurations' })
export class ConfigurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'text' })
  name: string;

  @Column({ name: 'value', type: 'text' })
  value: string;
}
