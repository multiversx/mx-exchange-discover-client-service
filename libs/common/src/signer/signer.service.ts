import { Address } from '@multiversx/sdk-core/out';
import { UserSigner, UserVerifier } from '@multiversx/sdk-wallet/out';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { ApiConfigService } from '../config';

@Injectable()
export class SignerService {
  private userSigner: UserSigner;
  private signerAddress: string;

  constructor(
    private readonly apiConfigService: ApiConfigService,
  ) {
    const pemFilePath = this.apiConfigService.getDiscoverSignerPemPath();
    const pemFileContent = readFileSync(pemFilePath, 'utf8');

    this.userSigner = UserSigner.fromPem(pemFileContent);
    this.signerAddress = this.userSigner.getAddress().bech32();
  }

  async signPayload(payload: string): Promise<Buffer> {
    console.log(payload);
    const message = Buffer.from(payload, 'utf-8');

    return await this.userSigner.sign(message);
  }

  payloadIsValid(payload: Buffer, signerAddress: string, signature: Buffer): boolean {
    const verifier = UserVerifier.fromAddress(Address.fromString(signerAddress));

    return verifier.verify(payload, signature);
  }

  getAddress(): string {
    return this.signerAddress;
  }

  getSigner(): UserSigner {
    return this.userSigner;
  }
}
