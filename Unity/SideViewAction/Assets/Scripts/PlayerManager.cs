using UnityEngine;
public class PlayerManager : MonoBehaviour
{
    [SerializeField] GameManager gameManager;
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
    float jumpPower = 300;



    private void Start() {
        // Rigidbody2D コンポーネントを取得
        rigidbody2D = GetComponent<Rigidbody2D>();
    }

    private void Update() {
        // 入力に基づいてxの値を取得
        float x = Input.GetAxis("Horizontal");

        // 方向を決める
        if (x == 0) {
            // 静止
            direction = DIRECTION_TYPE.STOP;
        } else if (x > 0) {
            // 右方向
            direction = DIRECTION_TYPE.RIGHT;
        } else if (x < 0) {
            // 左方向
            direction = DIRECTION_TYPE.LEFT;
        }

        //スペースが押されたらjumpする(GetKeyDownは１回押し込んだ時のみ発動)
        if(IsGround() && Input.GetKeyDown("space")) {
            Debug.Log("飛んだよ");
            Jump();
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

    void Jump(){
       //上に力を加える(AddForce)
       rigidbody2D.AddForce(Vector2.up * jumpPower);
    }

    bool IsGround(){
        //Playerにベクトルを引き、それが地面と接している時はTrueを返す
        Vector3 leftStartPoint = transform.position - Vector3.right * 0.2f; //左に始点をずらす
        Vector3 rightStartPoint = transform.position + Vector3.right * 0.2f;//右に始点をずらす
        Vector3 endPoint = transform.position - Vector3.up * 0.1f; //終点を下にずらす

        Debug.DrawLine(leftStartPoint, endPoint);//ベクトルの描画
        Debug.DrawLine(rightStartPoint, endPoint);//ベクトルの描画

        //始点-終点ベクトルがblockに接触しているかを判定
        return Physics2D.Linecast(leftStartPoint, endPoint, blockLayer) || Physics2D.Linecast(rightStartPoint, endPoint, blockLayer);    
    }

    private void OnTriggerEnter2D(Collider2D collision){
        if(collision.gameObject.tag == "TRAP"){
            Debug.Log("GAME OVER");
            gameManager.GameOver();
        }
        if(collision.gameObject.tag == "Finish"){
            Debug.Log("CLEAR");
            gameManager.GameClear();
        }

        if(collision.gameObject.tag == "Item"){
            //アイテムの取得
            collision.gameObject.GetComponent <ItemManager>().GetItem();
        }

    }

}
