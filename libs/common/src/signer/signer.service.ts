import { Address } from '@multiversx/sdk-core/out';
import { UserSigner, UserVerifier } from '@multiversx/sdk-wallet/out';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { ApiConfigService } from '../config';

@Injectable()
export class SignerService {
  private userSigner: UserSigner | undefined;
  private signerAddress: string | undefined;

  constructor(
    private readonly apiConfigService: ApiConfigService,
  ) {
    const pemFilePath = this.apiConfigService.getDiscoverSignerPemPath();
    if (pemFilePath === '') {
      return;
    }

    const pemFileContent = readFileSync(pemFilePath, 'utf8');

    this.userSigner = UserSigner.fromPem(pemFileContent);
    this.signerAddress = this.userSigner.getAddress().bech32();
  }

  async signPayload(payload: string, encoding: BufferEncoding = 'utf-8'): Promise<Buffer> {
    if (!this.userSigner) {
      return Buffer.from('');
    }
    const message = Buffer.from(payload, encoding);

    return await this.userSigner.sign(message);
  }

  payloadIsValid(payload: Buffer, signerAddress: string, signature: Buffer): boolean {
    const verifier = UserVerifier.fromAddress(Address.fromString(signerAddress));

    return verifier.verify(payload, signature);
  }

  getAddress(): string | undefined {
    return this.signerAddress;
  }

  getSigner(): UserSigner | undefined {
    return this.userSigner;
  }
}
