import { ApiProperty } from '@nestjs/swagger';

export class UserTask {
  @ApiProperty()
  url: string = '';

  @ApiProperty()
  description: string = '';

  constructor(init?: Partial<UserTask>) {
    Object.assign(this, init);
  }
}
