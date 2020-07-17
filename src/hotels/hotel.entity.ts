import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Moment } from 'moment';

@Entity({ name: 'hotels' })
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    pincode: string;

    @Column()
    phone: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Moment;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Moment;
}
