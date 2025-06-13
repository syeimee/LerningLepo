using UnityEngine;

public class ItemManager : MonoBehaviour
{
    GameManager gameManager;

    void Start(){
        gameManager = GameObject.Find("GameManager").GetComponent<GameManager>();//ヒエラルキーからGameManagerを探す
    }
    public void GetItem(){
        gameManager.addscore(100);
        Destroy(this.gameObject);
    }
}
