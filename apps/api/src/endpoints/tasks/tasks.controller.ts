import { Controller, Get, ParseIntPipe, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { ParseAddressPipe } from "@multiversx/sdk-nestjs-common";
import { TaskCostResponse } from "./dtos/task.cost.response";
import { UserTaskResponse } from "./dtos/user.task.response";
import { TaskCompletionResponse } from "./dtos/task.completion.response.";

@Controller('xexchange-growth')
@ApiTags('xexchange-growth')
@UsePipes(new ValidationPipe())
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
  ) { }

  @Get("/tasks-cost")
  @ApiResponse({
    status: 200,
    description: 'Returns task cost for a specific week',
    type: TaskCostResponse,
  })
  async tasksCost(
    @Query('week', ParseIntPipe) week: number
  ): Promise<TaskCostResponse> {
    return await this.tasksService.getCostForWeek(week);
  }

  @Get("/task")
  @ApiResponse({
    status: 200,
    description: 'Returns a task for a user and a specific week',
    type: UserTaskResponse,
  })
  async task(
    @Query('address', ParseAddressPipe) address: string,
    @Query('week', ParseIntPipe) week: number
  ): Promise<UserTaskResponse> {
    return await this.tasksService.getUserTaskForWeek(address, week);
  }

  @Get("/task-completion")
  @ApiResponse({
    status: 200,
    description: 'Returns completion status for a task',
    type: TaskCompletionResponse,
  })
  async taskCompletion(
    @Query('address', ParseAddressPipe) address: string,
    @Query('week', ParseIntPipe) week: number
  ): Promise<TaskCompletionResponse> {
    return await this.tasksService.getTaskCompletionForWeek(address, week);
  }
}
