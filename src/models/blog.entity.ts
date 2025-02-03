import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Image } from "./image.entity";

@Entity("blogs")

export class BlogEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string


    @Column()
    content: string

    @Column({nullable: true})
    slug: string

    @OneToMany(() => Image, image => image.blog, {
        cascade: true,
        eager: true   
    })
    images: Image[];

    @CreateDateColumn()
    createdAt: Date

    @Column({nullable: true})
    authorName: string

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    createSlug(){
        if(!this.slug && this.title){
            this.slug = this.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .substring(0, 255)
        }
    }

}