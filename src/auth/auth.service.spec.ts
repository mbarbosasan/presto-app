import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('AuthService', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .useMocker((token) => {
        const results = ['signUp', 'signIn', 'getProfile'];
        if (token === AuthService) {
          return {
            signUp: jest.fn(),
            signIn: jest.fn(),
            getProfile: jest.fn(),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('should return an access token', async () => {
      const result = {
        access_token: 'test',
      };

      const user: User = {
        id: 1,
        email: 'email4335@mail.com',
        password: 'password',
        name: 'name',
        lastname: 'lastname',
        city: 'city',
        state: 'state',
        gender: 'M',
      };

      jest.spyOn(authService, 'signIn').mockImplementation(async () => result);

      expect(await authController.signIn(user)).toBe(result);
    });
  });
});
