import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Crud, CrudController } from "@nestjsx/crud";

@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
