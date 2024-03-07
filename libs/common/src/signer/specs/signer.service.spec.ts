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
    const callerAddress = 'erd1rwsq0fxjrce9955hvvl3qrpl96xmuuxch9m6wlhxx6zs0n2v3hvqyu4lm5';
    const projectId = '1';
    const week = 10;
    const expectedSignature =
      // eslint-disable-next-line max-len
      '418dc8a65f4bfe6b5d87aef6e5fbc6c0435ef963dbe882bb6cf7496f7898ca6d2314dc94f8e4f9267fa9a471abfc130c7d9e2a4e9039abd905fad2d1e1fd1006';

    const verifier = UserVerifier.fromAddress(
      Address.fromString('erd1fxws0ralu6jkg563gzkhrsmuzwxn97t4wt4mphy598hwnakz6guqlqmve4'),
    );

    const signedMessage = await service.signClaimPayload(callerAddress, projectId, week);

    expect(signedMessage).toEqual(Buffer.from(expectedSignature, 'hex'));
    expect(verifier.verify(
      Buffer.from('1ba007a4d21e3252d297633f100c3f2e8dbe70d8b977a77ee6368507cd4c8dd8000000010000000a', 'hex'),
      signedMessage),
    ).toBe(true);
  });
});
