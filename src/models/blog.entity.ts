import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("blogs")

export class BlogEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}