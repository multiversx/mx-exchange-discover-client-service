import { ApiProperty } from '@nestjs/swagger';

export class UserTask {
  @ApiProperty()
  identifier: string = '';

  @ApiProperty()
  week: number = 0;

  @ApiProperty()
  url: string = '';

  @ApiProperty()
  description: string = '';

  constructor(init?: Partial<UserTask>) {
    Object.assign(this, init);
  }
}
