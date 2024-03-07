import { Injectable, NotFoundException } from "@nestjs/common";
import { BinaryUtils, OriginLogger } from "@multiversx/sdk-nestjs-common";
import { TaskCost } from "./dtos/task.cost";
import { TaskCostResponse } from "./dtos/task.cost.response";
import { UserTask } from "./dtos/user.task";
import { UserTaskResponse } from "./dtos/user.task.response";
import { TaskCompletionResponse } from "./dtos/task.completion.response.";
import { Address } from "@multiversx/sdk-core/out";
import { ApiConfigService, SignerService } from "@mvx-monorepo/common";

const COMPLETTION_PREFIX = 'xExchangeGrowthV1TaskCompleted';

@Injectable()
export class TasksService {
  private readonly logger: OriginLogger = new OriginLogger(TasksService.name);

  constructor(
    private readonly apiConfigService: ApiConfigService,
    private readonly signerService: SignerService
  ) { }

  async getCostForWeek(week: number): Promise<TaskCostResponse> {
    this.logger.log(`Returning task cost for week ${week}`);

    // this can be static or data pulled from a db
    const taskCost = this.staticTasksCost(week);

    const response = new TaskCostResponse({
      money: taskCost.money,
      time: taskCost.time,
      isFinal: true,
      week: week,
      version: 2,
    });

    const signature = await this.signerService.signPayload(TaskCostResponse.serializeForSigning(response));
    response.signature = signature.toString('hex');

    return response;
  }

  async getUserTaskForWeek(address: string, week: number): Promise<UserTaskResponse> {
    this.logger.log(`Returning user ${address} task for week ${week}`);

    // this can be static or data pulled from a db
    const userTask = this.staticUserTasks(address, week);

    const response = new UserTaskResponse({
      url: userTask.url,
      description: userTask.description,
      address: address,
      week: week,
      isFinal: true,
      version: 2,
    });

    const signature = await this.signerService.signPayload(UserTaskResponse.serializeForSigning(response));
    response.signature = signature.toString('hex');

    return response;
  }

  async getTaskCompletionForWeek(address: string, week: number): Promise<TaskCompletionResponse> {
    this.logger.log(`Returning user ${address} task for week ${week}`);

    const userTask = this.staticUserTasks(address, week);
    const taskCompleted = await this.checkUserCompletedTask(address, userTask);

    let completion = '';
    let completionSignature = '';

    if (taskCompleted) {
      completion = this.getCompletionPayload(address, userTask);
      const completionSigBuffer = await this.signerService.signPayload(completion);
      completionSignature = completionSigBuffer.toString('hex');
    }

    const response = new TaskCompletionResponse({
      completion: completion,
      address: address,
      completionSignature: completionSignature,
      version: 2,
      week: week,
    });

    const signature = await this.signerService.signPayload(TaskCompletionResponse.serializeForSigning(response));
    response.signature = signature.toString('hex');

    return response;
  }

  private getCompletionPayload(address: string, task: UserTask): string {
    const prefixBuffer = Buffer.from(BinaryUtils.stringToHex(COMPLETTION_PREFIX), 'hex');

    const projectId = this.apiConfigService.getDiscoverProjectId();
    const projectBuffer = Buffer.alloc(4, undefined, 'hex');
    projectBuffer.writeUInt32BE(projectId, 0);

    const addressBuffer = Buffer.from(Address.fromString(address).hex(), 'hex');

    const weekBuffer = Buffer.alloc(4, undefined, 'hex');
    weekBuffer.writeUInt32BE(task.week, 0);

    const noteBuffer = Buffer.from(BinaryUtils.stringToHex(task.identifier), 'hex');

    const message: Buffer = Buffer.concat([prefixBuffer, projectBuffer, weekBuffer, addressBuffer, noteBuffer]);

    return message.toString('hex');
  }

  private async checkUserCompletedTask(address: string, task: UserTask): Promise<boolean> {
    this.logger.log(
      `Performing task ${task.identifier} completion check for ${address} in week ${task.week}`
    );

    // logic for establishing whether the user has completed the task

    return await Promise.resolve(true);
  }

  private staticTasksCost(week: number): TaskCost {
    const allWeeksCost = [
      {
        week: 1,
        money: 2,
        time: 5,
      },
      {
        week: 2,
        money: 1,
        time: 5,
      },
      {
        week: 3,
        money: 4,
        time: 10,
      },
      {
        week: 4,
        money: 4,
        time: 10,
      },
    ];

    const currentWeekCost = allWeeksCost.find(elem => elem.week === week);

    if (!currentWeekCost) {
      throw new NotFoundException(`Task cost for week ${week} not found`);
    }

    return currentWeekCost;
  }

  private staticUserTasks(address: string, week: number): UserTask {
    const allWeeksTasks: UserTask[] = [
      {
        week: 1,
        identifier: '3f5Gc8',
        url: '<TASK_URL_HERE>',
        description: '<DESCRIPTION>',
      },
      {
        week: 2,
        identifier: 'bS19kl',
        url: '<TASK_URL_HERE>',
        description: '<DESCRIPTION>',
      },
      {
        week: 3,
        identifier: 'yv5NL2',
        url: '<TASK_URL_HERE>',
        description: '<DESCRIPTION>',
      },
      {
        week: 4,
        identifier: 'mU76pP',
        url: '<TASK_URL_HERE>',
        description: '<DESCRIPTION>',
      },
    ];

    const currentWeekTask = allWeeksTasks.find(elem => elem.week === week);

    if (!currentWeekTask) {
      throw new NotFoundException(`Task for user ${address} on week ${week} not found`);
    }

    return currentWeekTask;
  }
}
