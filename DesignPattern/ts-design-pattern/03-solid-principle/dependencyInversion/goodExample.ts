export { };

class User { }

interface IUserService {
    create(user: User): User;
    findById(id: string): User;
}

class UserController {
    constructor(private userService: IUserService){
        this.userService = userService;
    }

    create(user: User): User {
        return this.userService.create(user);
    }

    findById(id: string): User {
        return this.userService.findById(id);
    }
}

interface IUserRepository {
    create(user: User): User;
    findById(id: string): User;
}

class UserService implements IUserService {
    constructor(private userRdbRepository: IUserRepository){
        this.userRdbRepository = userRdbRepository;
    }

    create(user: User): User {
        return this.userRdbRepository.create(user);
    }

    findById(id: string): User {
        return this.userRdbRepository.findById(id);
    }
}

class UserRdbRepository implements IUserRepository{
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
    const repositoruy = new UserRdbRepository();
    const service = new UserService(repositoruy);
    const userController = new UserController(service);
    userController.findById('123');
}

run();
