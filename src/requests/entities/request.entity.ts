import { Language } from "src/language/entities/language.entity";
import { Level } from "src/level/entities/level.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    link: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Language, (language) => language.requests)
    @JoinColumn({ name: 'language_id' })
    language: Language;

    @ManyToOne(() => Level, (level) => level.requests)
    @JoinColumn({ name: 'level_id' })
    level: Level;

    @ManyToOne(() => User, (user) => user.requests)
    @JoinColumn({ name: 'user_id' })
    user: User;

}
