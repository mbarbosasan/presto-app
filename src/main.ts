import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {PrismaService} from "./prisma/PrismaService";
import {json, urlencoded} from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.enableCors()
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
