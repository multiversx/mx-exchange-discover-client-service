import { Controller, Get, ParseIntPipe, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { TaskCost } from "./dtos/task.cost";
import { TasksService } from "./tasks.service";
import { UserTask } from "./dtos/user.task";
import { TaskCompletion } from "./dtos/task.completion";
import { ParseAddressPipe } from "@multiversx/sdk-nestjs-common";

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
    type: TaskCost,
  })
  async tasksCost(
    @Query('week', ParseIntPipe) week: number
  ): Promise<TaskCost> {
    return await this.tasksService.getCostForWeek(week);
  }

  @Get("/task")
  @ApiResponse({
    status: 200,
    description: 'Returns a task for a user and a specific week',
    type: UserTask,
  })
  async task(
    @Query('address', ParseAddressPipe) address: string,
    @Query('week', ParseIntPipe) week: number
  ): Promise<UserTask> {
    return await this.tasksService.getUserTaskForWeek(address, week);
  }

  @Get("/task-completion")
  @ApiResponse({
    status: 200,
    description: 'Returns completion status for a task',
    type: TaskCompletion,
  })
  async taskCompletion(): Promise<TaskCompletion> {
    return await this.tasksService.getTaskCompletionForWeek('s', 1);
  }
}
