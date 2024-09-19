using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    [SerializeField] GameObject gameOverText;
    [SerializeField] GameObject gameClearText;

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
