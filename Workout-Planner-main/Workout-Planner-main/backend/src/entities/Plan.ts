import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Index, JoinColumn } from "typeorm";
import { Day } from "./Day";

@Entity("plans")
export class Plan {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Index()
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Day, day => day.plan, {
        cascade: true,
        eager: true
    })
    @JoinColumn()
    days: Day[];
} 