import { Injectable } from "@nestjs/common";
import { TaskCost } from "./dtos/task.cost";
import { OriginLogger } from "@multiversx/sdk-nestjs-common";
import { UserTask } from "./dtos/user.task";
import { TaskCompletion } from "./dtos/task.completion";

@Injectable()
export class TasksService {
  private readonly logger: OriginLogger = new OriginLogger(TasksService.name);

  async getCostForWeek(week: number): Promise<TaskCost> {
    this.logger.log(`Returning task cost for week ${week}`);

    // todo: move to a static json || db
    return await Promise.resolve(new TaskCost({
      money: 1,
      time: 5,
    }));
  }

  async getUserTaskForWeek(address: string, week: number): Promise<UserTask> {
    this.logger.log(`Returning user ${address} task for week ${week}`);

    // todo: move to a static json || db
    return await Promise.resolve(new UserTask({
      url: '<task_url>',
      description: 'lorem ipsum',
    }));

  }

  async getTaskCompletionForWeek(address: string, week: number): Promise<TaskCompletion> {
    this.logger.log(`Returning user ${address} task for week ${week}`);

    // logic for establishing is the user has completed the task

    return await Promise.resolve(new TaskCompletion({
      completion: true,
    }));
  }
}
