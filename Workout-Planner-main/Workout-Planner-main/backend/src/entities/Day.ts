import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Index, JoinColumn } from "typeorm";
import { Plan } from "./Plan";
import { Exercise } from "./Exercise";

@Entity("days")
export class Day {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Index()
    @Column()
    orderIndex: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Plan, plan => plan.days, {
        onDelete: "CASCADE"
    })
    plan: Plan;

    @Column()
    planId: number;

    @OneToMany(() => Exercise, exercise => exercise.day, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    exercises: Exercise[];
} 