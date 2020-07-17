import { NestFactory } from "@nestjs/core";
import { SeederModule } from "src/database/seeders/seeder.module";
import { Logger } from "@nestjs/common";
import { Seeder } from "src/database/seeders/seeder";

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then(appContext => {
            const logger = appContext.get(Logger);
            const seeder = appContext.get(Seeder);

            seeder
                .seed()
                .then(() => {
                    logger.debug('Seeding Complete')
                })
                .catch(error => {
                    logger.error('Seeding Failed')

                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        })
}

bootstrap();