import { Module } from '@nestjs/common';
import { SignerService } from './signer.service';

@Module({
  imports: [],
  providers: [SignerService],
  exports: [SignerService],
})
export class SignerModule { }
