class SubUser extends SuperUser{

}

const subUser = new SubUser("subUser",17);
console.log(subUser.getName());
console.log(subUser.getAge());