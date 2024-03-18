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
  signature?: string = '';

  constructor(init?: Partial<UserTaskResponse>) {
    Object.assign(this, init);
  }

  static serializeForSigning(userTaskResponse: UserTaskResponse): string {
    delete userTaskResponse.signature;

    const sortedKeys = Object.keys(userTaskResponse).sort();
    const sortedObject: { [key: string]: any } = {};
    sortedKeys.forEach(key => {
      sortedObject[key] = userTaskResponse[key as keyof UserTaskResponse];
    });

    return JSON.stringify(sortedObject);
  }
}
