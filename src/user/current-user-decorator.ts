import { createParamDecorator, ExecutionContext} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export  const CurrentUser = createParamDecorator(( _ , contex: ExecutionContext) =>{

    const ctx = GqlExecutionContext.create(contex)
    const {req} =ctx.getContext()
    return req.user
})