import { Test, TestingModule } from '@nestjs/testing';
import { SignerService } from '../signer.service';
import { join } from 'path';
import { UserVerifier } from '@multiversx/sdk-wallet/out';
import { Address } from '@multiversx/sdk-core/out';
import { ApiConfigService } from '@mvx-monorepo/common/config';

const PEM_PATH = join(__dirname, './mock.signer.pem');

describe('SignerService', () => {
  let service: SignerService;
  let mockApiConfigService: Partial<ApiConfigService>;

  beforeEach(async () => {
    mockApiConfigService = {
      getDiscoverSignerPemPath: jest.fn().mockImplementation(() => PEM_PATH),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignerService,
        {
          provide: ApiConfigService,
          useValue: mockApiConfigService,
        },
      ],
    }).compile();

    service = module.get<SignerService>(SignerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should read PEM file and initialize userSigner and signerAddress', () => {
    expect(service.getAddress()).toEqual('erd1fxws0ralu6jkg563gzkhrsmuzwxn97t4wt4mphy598hwnakz6guqlqmve4');
    expect(service.getSigner()).toBeDefined();
  });

  it('should generate a correct signature', async () => {
    const payload = 'test';
    const expectedSignature =
      // eslint-disable-next-line max-len
      '7d664a006df0b52d8d3136afb9264ec270e5f551826848409d804b6ba1880782c04637be38ca3c214dd4f99dec2886d5f18d0dfbc2a31095efdb11c1b3bf0900';

    const verifier = UserVerifier.fromAddress(
      Address.fromString('erd1fxws0ralu6jkg563gzkhrsmuzwxn97t4wt4mphy598hwnakz6guqlqmve4'),
    );

    const signedMessage = await service.signPayload(payload);

    expect(signedMessage).toEqual(Buffer.from(expectedSignature, 'hex'));
    expect(verifier.verify(
      Buffer.from('test', 'utf-8'),
      signedMessage),
    ).toBe(true);
  });
});
