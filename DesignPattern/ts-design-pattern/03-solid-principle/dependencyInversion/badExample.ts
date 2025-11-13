export {};

class User {}

class UserController {
  private userService = new UserService();

  create(user: User): User {
    return this.userService.create(user);
  }

  findById(id: string): User {
    return this.userService.findById(id);
  }
}

class UserService {
  private userRepository = new UserRdbRepository();

  create(user: User): User {
    return this.userRepository.create(user);
  }

  findById(id: string): User {
    return this.userRepository.findById(id);
  }
}

class UserRdbRepository {
  create(user: User): User {
    console.log('RDBにUserを登録');
    return user;
  }

  findById(id: string): User {
    console.log(`ID: ${id}のユーザーを検索`);
    return new User();
  }
}

function run() {
  const userController = new UserController();
  userController.findById('123');
}

run();
