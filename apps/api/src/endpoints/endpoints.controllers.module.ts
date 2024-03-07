import { Module } from "@nestjs/common";
import { DynamicModuleUtils } from "@mvx-monorepo/common";
import { EndpointsServicesModule } from "./endpoints.services.module";
import { HealthCheckController } from "@mvx-monorepo/common";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    EndpointsServicesModule,
    TasksModule,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
  ],
  controllers: [
    HealthCheckController,
  ],
})
export class EndpointsControllersModule { }
