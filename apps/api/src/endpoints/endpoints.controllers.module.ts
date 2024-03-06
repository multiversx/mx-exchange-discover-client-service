import { Module } from "@nestjs/common";
import { DynamicModuleUtils } from "@mvx-monorepo/common";
import { EndpointsServicesModule } from "./endpoints.services.module";
import { HealthCheckController } from "@mvx-monorepo/common";

@Module({
  imports: [
    EndpointsServicesModule,
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
  ],
  controllers: [
    HealthCheckController,
  ],
})
export class EndpointsControllersModule { }
