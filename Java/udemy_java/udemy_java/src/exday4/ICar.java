package exday4;
 
//  自動車インターフェース
public interface ICar {
    public String TYPE_NAME = "car";//インターフェースの変数は値の変更ができないので定数と同じ
    //  移動メソッド
    public void move();
}