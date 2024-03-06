import { ApiProperty } from '@nestjs/swagger';

export class TaskCompletion {
  @ApiProperty()
  completion: boolean = false;

  constructor(init?: Partial<TaskCompletion>) {
    Object.assign(this, init);
  }
}
