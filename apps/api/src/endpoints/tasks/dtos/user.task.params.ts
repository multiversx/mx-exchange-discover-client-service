import { ApiProperty } from '@nestjs/swagger';

export class UserTaskParams {
  @ApiProperty()
  address: string = '';

  @ApiProperty()
  description: string = '';

  constructor(init?: Partial<UserTaskParams>) {
    Object.assign(this, init);
  }
}
