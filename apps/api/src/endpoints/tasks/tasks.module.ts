import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { SignerModule } from "@mvx-monorepo/common";

@Module({
  imports: [
    SignerModule,
  ],
  providers: [
    TasksService,
  ],
  controllers: [
    TasksController,
  ],
  exports: [
    TasksService,
  ],
})
export class TasksModule { }
