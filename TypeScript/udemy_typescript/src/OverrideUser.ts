class OverrideUser extends SuperUser{
    role: String = '管理者';
    constructor(name: String, age: number, role: String){
        super(name, age);//コンストラクタのオーバーライド
        this.role = role;
    }
}

const overrideUser = new OverrideUser("admin", 20, "一般");
console.log(overrideUser.getName());
console.log(overrideUser.getAge());
console.log(overrideUser.role);