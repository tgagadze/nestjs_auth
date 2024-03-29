import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './schemas/post.schema';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/user/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from 'src/user/user.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postSevice: PostService,
    private readonly userService: UserService,
  ) {}
  @Query(() => [Post])
  getPosts() {
    return this.postSevice.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  createPost(@CurrentUser() user: User, @Args('post') post: CreatePostDto) {
    return this.postSevice.create(post, user);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post) {
    return this.userService.findById(post.user);
  }
}
