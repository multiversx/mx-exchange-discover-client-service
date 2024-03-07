import { ApiProperty } from '@nestjs/swagger';

export class TaskCostResponse {
  @ApiProperty()
  time: number = 0;

  @ApiProperty()
  money: number = 0;

  @ApiProperty()
  week: number = 0;

  @ApiProperty()
  isFinal: boolean = false;

  @ApiProperty()
  version: number = 2;

  @ApiProperty()
  signature: string = '';

  constructor(init?: Partial<TaskCostResponse>) {
    Object.assign(this, init);
  }
}
