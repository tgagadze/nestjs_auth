import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  const mockUserModel = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  const mockUser = {
    _id: '65dd1a667e3bcc13ed78d3ea',
    email: 'test@test.com',
    age: 22,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('create', () => {
    it('should create new user and return it if user with provided email does not exist', async () => {
      const createUserMock = {
        _id: '65dd1a667e3bcc13ed78d3ea',
        email: 'test@test.com',
        password: '123123123',
      };
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
      jest.spyOn(userModel, 'create').mockResolvedValue(createUserMock as any);
      const user = await userService.create({
        email: 'test@test.com',
        password: '123123123',
      });

      expect(user.email).toBe(createUserMock.email);
    });

    it('should throw BadRequestException if user with provided email exists', () => {
      jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser);

      expect(
        userService.create({ email: 'test@test.com', password: '12234234' }),
      ).rejects.toThrow(BadRequestException);
    });

    it.only('should throw BadRequestException if provided email is admin@admin.com', () => {
      expect(
        userService.create({ email: 'admin@admin.com', password: '234234234' }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findById', () => {
    it('shoud return user object when correct id is passed', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(mockUser);
      const user = await userService.findById(mockUser._id);
      console.log('user', user);
      expect(user._id).toBe(mockUser._id);
    });

    it('should thow BadRequestExeption when invalid id is passed', async () => {
      const invalidId = 'invalid-id';
      jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(false);
      await expect(userService.findById(invalidId)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should thow NotFountException when user is not found', async () => {
      jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
      jest.spyOn(userModel, 'findById').mockResolvedValue(null);

      await expect(userService.findById(mockUser._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
