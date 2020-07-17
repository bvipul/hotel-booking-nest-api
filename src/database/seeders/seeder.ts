import { Injectable, Logger } from "@nestjs/common";
import { UsersSeederService } from "./users/users.service";
import { HotelsSeederService } from "./hotels/hotels.service";
import { RoomsSeederService } from "./rooms/rooms.service";

@Injectable()
export class Seeder {
    constructor(private readonly logger: Logger, private readonly usersSeederService: UsersSeederService, private readonly hotelsSeederService: HotelsSeederService, private readonly roomsSeederService: RoomsSeederService) { }

    async seed() {
        await this.createUsers()
            .then(completed => {
                this.logger.debug('Users Successfully seeded');

                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding users');

                Promise.reject(error);
            })

        await this.createHotels()
            .then(completed => {
                this.logger.debug('Hotels Successfully seeded');

                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding hotels');

                Promise.reject(error);
            })

        await this.createRooms()
            .then(completed => {
                this.logger.debug('Rooms Successfully seeded');

                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding rooms');

                Promise.reject(error);
            })
    }

    async createUsers() {
        return await Promise.all(this.usersSeederService.create())
            .then(createdUsers => {
                this.logger.debug('Number of users created: ' + createdUsers.filter(d => d).length);
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async createHotels() {
        return await Promise.all(this.hotelsSeederService.create())
            .then(createdHotels => {
                this.logger.debug('Number of hotels created: ' + createdHotels.filter(d => d).length);
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async createRooms() {
        return await Promise.all(this.roomsSeederService.create())
            .then(createdRooms => {
                this.logger.debug('Number of rooms created: ' + createdRooms.filter(d => d).length);
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }
}