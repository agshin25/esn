import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { BlogEntity } from "./blog.entity";

@Entity("images")
export class Image {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    url: string;

    @ManyToOne(() => BlogEntity, (blog) => blog.images, { onDelete: "CASCADE" })
    blog: BlogEntity;

    @CreateDateColumn()
    createdAt: Date;
}
