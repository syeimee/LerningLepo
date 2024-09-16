# キーボード入力の実装

```c#
void Update(){
    float x = Input.GetAxis("Horizontal");//水平方向
    float y = Input.GetAxis("Vertical");//垂直方向
    Debug.Log(x+","+y);

    bool onSpace = Input.GetKey("space");
    if(onSpace){
        Debug.Log("攻撃");
    }
}
```
horizontal(水平方向)などのパラメータはunity上で確認ができる
<img src = "./img/horizontal.png">

# Playerの動かし方

### 動かし方　その１
```c#
transform.position = new Vector(0.1f, 0, 0);
```

### 動かし方　その２
コンポーネント　RigidBodyを使う
物理演算で使うやつ
<img src = "./img/rigidbody.png">

useGravityにチェックを入れると重力の影響を受ける

```c#
Rigidbody rigidbody;
void Start(){
    rigidbody = GetComponent<Rigidbody>();
}

void Update(){
    rigidbody.velocity = new Vector3(1f, 0, 0);
}
```
### 動かし方3
力を加える

```c#
Rigidbody rigidbody;
void Start(){
    rigidbody = GetComponent<Rigidbody>();
}

void Update(){
    rigidbody.AddForce(new Vector3(1f, 0, 0));
}
```

これらを合わせることで、入力キーに対して、オブジェクトを動かすことができる

```c#
Rigidbody rigidbody;

void Start(){
    rigidbody = GetComponent<Rigidbody>();
}
void Update(){
    float x = Input.GetAxis("Horizontal");//水平方向
    float y = Input.GetAxis("Vertical");//垂直方向

    rigidbody.velocity = new Vector3(x, y, 0);
}
```

# 当たり判定の実装
CubeにRegidbodyをつける
Panelにcoliderがついていると当たり判定がつく

