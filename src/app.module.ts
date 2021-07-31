import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'nestjs_tdd',
    entities: [],
    synchronize: true,
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
