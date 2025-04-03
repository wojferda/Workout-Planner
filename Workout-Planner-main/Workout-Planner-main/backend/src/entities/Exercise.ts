import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import { Day } from "./Day";

@Entity("exercises")
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    sets: number;

    @Column()
    repetitions: number;

    @Column({ nullable: true })
    notes: string;

    @Index()
    @Column()
    orderIndex: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Day, day => day.exercises, { onDelete: "CASCADE" })
    day: Day;

    @Column()
    dayId: number;
} 