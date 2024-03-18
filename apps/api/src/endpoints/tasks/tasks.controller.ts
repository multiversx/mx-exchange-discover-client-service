import { Controller, Get, Param, ParseIntPipe, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { ParseAddressPipe } from "@multiversx/sdk-nestjs-common";
import { TaskCostResponse } from "./dtos/task.cost.response";
import { UserTaskResponse } from "./dtos/user.task.response";
import { TaskCompletionResponse } from "./dtos/task.completion.response.";

@Controller('projects')
@ApiTags('Discover projects')
@UsePipes(new ValidationPipe())
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
  ) { }

  @Get("/:projectId/xexchange-growth/tasks-cost")
  @ApiResponse({
    status: 200,
    description: 'Returns task cost for a specific week',
    type: TaskCostResponse,
  })
  async tasksCost(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('week', ParseIntPipe) week: number
  ): Promise<TaskCostResponse> {
    return await this.tasksService.getCostForWeek(projectId, week);
  }

  @Get("/:projectId/xexchange-growth/task")
  @ApiResponse({
    status: 200,
    description: 'Returns a task for a user and a specific week',
    type: UserTaskResponse,
  })
  async task(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('address', ParseAddressPipe) address: string,
    @Query('week', ParseIntPipe) week: number
  ): Promise<UserTaskResponse> {
    return await this.tasksService.getUserTaskForWeek(projectId, address, week);
  }

  @Get("/:projectId/xexchange-growth/task-completion")
  @ApiResponse({
    status: 200,
    description: 'Returns completion status for a task',
    type: TaskCompletionResponse,
  })
  async taskCompletion(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query('address', ParseAddressPipe) address: string,
    @Query('week', ParseIntPipe) week: number
  ): Promise<TaskCompletionResponse> {
    return await this.tasksService.getTaskCompletionForWeek(projectId, address, week);
  }
}
