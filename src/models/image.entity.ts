import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity } from "typeorm";
import { BlogEntity } from "./blog.entity";

@Entity("images")
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => BlogEntity, (blog) => blog.images, { onDelete: "CASCADE" })
    blog: BlogEntity;

    @CreateDateColumn()
    createdAt: Date;
}
