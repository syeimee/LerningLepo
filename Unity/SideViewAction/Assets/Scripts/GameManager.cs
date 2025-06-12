using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    [SerializeField] GameObject gameOverText;
    [SerializeField] GameObject gameClearText;
    [SerializeField] Text scoreText;
    Rigidbody2D rigidbody2D; 

    //scoreの更新用関数
    const int MAX_VALUE = 9999;
    int score = 0;
    //GameStart時のScoreを0にする
    public void Start(){
        scoreText.text = score.ToString(); //intを文字列に変換
    }
    public void addscore(int val){
        score +=val;
        if(score > MAX_VALUE){
            score = MAX_VALUE;
        }
        scoreText.text = score.ToString(); //intを文字列に変換
    }

    public void GameOver(){
        gameOverText.SetActive(true);
        Invoke("Restart",1.5f); //1.5秒後にRestartを実行する
    }

    public void GameClear(){
        gameClearText.SetActive(true);
        Invoke("Restart",1.5f);
    }
    

    void Restart(){
        Scene thisScene = SceneManager.GetActiveScene();
        SceneManager.LoadScene(thisScene.name);
    }
}
