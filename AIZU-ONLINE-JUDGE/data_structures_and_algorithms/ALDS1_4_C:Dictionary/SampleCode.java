/**
 * HashMapクラスの使用方法
 * 
 * 特徴
 * ■ キーの順序は保証されない
 * ■ キーの重複は許容されていない
 * ■ 値の重複は可能
 */
import java.util.HashMap;
import java.util.Map;
public class SampleCode {

    public static void main(String[] args) {
        /**
         * 宣言
         * Map<キーの型名, 値の型名> オブジェクト名 = new HashMap<>();
         */
        Map<String, String> animal = new HashMap<>();
        
        /**
         * キーを指定して値を追加
         * オブジェクト名.put(key, value)
         */
        animal.put("monkey", "猿");
        System.out.println(animal);//{monkey=猿}

        animal.put("cat", "猫");
        animal.put("dog", "犬");

        /**
         * キーを指定して値を取得する
         * オブジェクト名.get(key)
         */
        System.out.println(animal.get("monkey"));//猿

        /**
         * キーを全て取得する（keySet)
         */
        for(String pet : animal.keySet()){
            System.out.println(pet);
            //monkey
            //cat
            //dog
        }

        /**
         * 値を全て取得する（values)
         */
        for(String pet : animal.values()){
            System.out.println(pet);
            //猿
            //猫
            //犬
        }

        /**
         * 要素数を取得する
         * オブジェクト名.size()
         */
        System.out.println(animal.size());//3

        /**
         * 指定のキーがあれなtrueを返す
         * オブジェクト名.containsKey(検索キー)
         */
        System.out.println(animal.containsKey("monkey"));//true

        /**
         * 指定の値があればtrueを返す
         * オブジェクト名.containsValue(検索値)
         */
        System.out.println(animal.containsValue("猿"));//true

        /**
         * 中身が空であればtrueを返す
         */
        System.out.println(animal.isEmpty());//false

        /**
         * 要素を順番に処理する
         */
        animal.forEach((key, value) -> System.out.println(key + " " + value ));
        //monkey 猿
        //cat 猫
        //dog 犬

        /**
         * 要素を消去
         */
        animal.clear();
    }





}
