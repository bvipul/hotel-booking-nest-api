import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Moment } from 'moment';
import { Hotel } from 'src/hotels/hotel.entity';

@Entity({ name: 'rooms' })
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Hotel, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    hotel: Hotel;

    @Column()
    name: string;

    @Column()
    max_guests: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Moment;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Moment;

    constructor(partial: Partial<Room>) {
        Object.assign(this, partial);
    }
}
