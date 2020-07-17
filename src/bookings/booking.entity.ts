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
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/user.entity';

@Entity({ name: 'bookings' })
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Hotel, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    hotel: Hotel;

    @ManyToOne(() => Room, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    room: Room;

    @ManyToOne(() => User, {
        eager: true,
        cascade: true,
    })
    @JoinColumn()
    customer: User;

    @Column({ type: 'datetime' })
    check_in_date: Moment;

    @Column({ type: 'datetime' })
    check_out_date: Moment;

    @Column()
    guests: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Moment;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Moment;

    constructor(partial: Partial<Room>) {
        Object.assign(this, partial);
    }
}
