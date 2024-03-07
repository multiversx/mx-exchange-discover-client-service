import { ApiProperty } from '@nestjs/swagger';

export class TaskCost {
  @ApiProperty()
  time: number = 0;

  @ApiProperty()
  money: number = 0;

  constructor(init?: Partial<TaskCost>) {
    Object.assign(this, init);
  }
}
