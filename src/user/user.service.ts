import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, isValidObjectId } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

type ObjectId = mongoose.Schema.Types.ObjectId;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.email === 'admin@admin.com') {
      throw new BadRequestException('Invalid Email');
    }

    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    return this.userModel.create(createUserDto);
  }

  async findById(id: mongoose.Schema.Types.ObjectId): Promise<User> {
    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Id is invalid');
    }
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  findAll() {
    return this.userModel.find().populate('posts');
  }

  findOne(id: string) {
    return this.userModel.findById(id).select(['email']);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async addPost(userId: ObjectId, postId: ObjectId): Promise<void> {
    const user = await this.userModel.findById(userId);
    user.posts.push(postId);
    await user.save();
  }
}
