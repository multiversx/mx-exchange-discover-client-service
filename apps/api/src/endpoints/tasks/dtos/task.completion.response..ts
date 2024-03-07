import { ApiProperty } from '@nestjs/swagger';

export class TaskCompletionResponse {
  @ApiProperty()
  completion: string = '';

  @ApiProperty()
  week: number = 0;

  @ApiProperty()
  address: string = '';

  @ApiProperty()
  completionSignature: string = '';

  @ApiProperty()
  version: number = 2;

  @ApiProperty()
  signature?: string = '';

  constructor(init?: Partial<TaskCompletionResponse>) {
    Object.assign(this, init);
  }

  static serializeForSigning(taskCompletionResponse: TaskCompletionResponse): string {
    delete taskCompletionResponse.signature;

    const sortedKeys = Object.keys(taskCompletionResponse).sort();
    const sortedObject: { [key: string]: any } = {};
    sortedKeys.forEach(key => {
      sortedObject[key] = taskCompletionResponse[key as keyof TaskCompletionResponse];
    });

    return JSON.stringify(sortedObject);
  }
}
