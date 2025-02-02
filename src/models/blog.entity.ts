import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./image.entity";

@Entity("blogs")

export class BlogEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string


    @Column()
    content: string

    @OneToMany(() => Image, image => image.blog, {
        cascade: true,
        eager: true   
    })
    images: Image[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}