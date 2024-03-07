import { ApiProperty } from '@nestjs/swagger';

export class UserTaskResponse {
  @ApiProperty()
  url: string = '';

  @ApiProperty()
  description: string = '';

  @ApiProperty()
  week: number = 0;

  @ApiProperty()
  address: string = '';

  @ApiProperty()
  isFinal: boolean = false;

  @ApiProperty()
  version: number = 2;

  @ApiProperty()
  signature: string = '';

  constructor(init?: Partial<UserTaskResponse>) {
    Object.assign(this, init);
  }
}
