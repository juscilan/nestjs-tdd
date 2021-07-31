import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST', 'localhost'),
        port: Number(configService.get('PORT', 3307)),
        username: configService.get('USERNAME', 'root'),
        password: configService.get('PASSWORD', 'root'),
        database: configService.get('DATABASE', 'nestjs_tdd'),
        entities: [],
        synchronize: true,   
    })
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
