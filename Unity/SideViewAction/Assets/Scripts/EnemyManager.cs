using UnityEngine;
public class EnemyManager : MonoBehaviour
{
    // [SerializeField] GameManager gameManager;
    [SerializeField] LayerMask blockLayer;
    // 方向は列挙型で定義
    public enum DIRECTION_TYPE {
        STOP,
        RIGHT,
        LEFT
    }
    Rigidbody2D rigidbody2D; // プレイヤーの移動はRigidbodyで管理
    DIRECTION_TYPE direction = DIRECTION_TYPE.STOP;
    float speed = 0;

    private void Start() {
        // Rigidbody2D コンポーネントを取得
        rigidbody2D = GetComponent<Rigidbody2D>();

        // 右方向へ移動
        direction = DIRECTION_TYPE.RIGHT;

    }

    private void Update() {
        //鼻先の垂直ベクトルが地面と接していなければ方向を180度変える
        if(!IsGround()){
            ChangeDirection();
        }

    }

    
    // FixedUpdateは定期的に呼ばれる。物理計算はここで行う。
    private void FixedUpdate() {
        // 方向に応じて速さを定義する
        switch (direction) {
            case DIRECTION_TYPE.STOP:
                speed = 0;
                break;
            case DIRECTION_TYPE.RIGHT:
                speed = 3;
                transform.localScale = new Vector3(1, 1, 1);//向きを右へ
                break;
            case DIRECTION_TYPE.LEFT:
                speed = -3;
                transform.localScale = new Vector3(-1, 1, 1);//向きを左へ
                break;
        }
        // Rigidbody2Dの速度を更新
        rigidbody2D.velocity = new Vector2(speed, rigidbody2D.velocity.y);
    }


    bool IsGround(){
        Vector3 startVec = transform.position + transform.right * 0.5f * transform.localScale.x;
        Vector3 endVec = transform.position - transform.up* 0.5f;
        Debug.DrawLine(startVec,endVec);
        return Physics2D.Linecast(startVec,endVec,blockLayer);

    }

    void ChangeDirection(){
        if(direction == DIRECTION_TYPE.RIGHT){
            direction = DIRECTION_TYPE.LEFT;
        }else if(direction == DIRECTION_TYPE.LEFT){
            direction = DIRECTION_TYPE.RIGHT;
        }
    }
}
