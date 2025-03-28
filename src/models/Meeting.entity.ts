import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User.entity";
import { Booking } from "./Booking.entity";

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("timestamp")
  date: Date;

  @ManyToOne(() => User, (user) => user.meetings, { eager: true })
  consultant: User;

  @OneToMany(() => Booking, (booking) => booking.meeting)
  bookings: Booking[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
