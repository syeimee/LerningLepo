import java.util.*;

public class Main {
    static Map<String, Products> products = new LinkedHashMap<>();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        while(true){
            System.out.println("#######メニュー#######");
            System.out.println("1: 商品追加");
            System.out.println("2: 一覧表示");
            System.out.println("0: 終了");  
            System.out.print("選択してください: ");       
        
            String input = sc.nextLine();

            switch(input){
                case "1" :
                    addProduct(sc);
                    break;
                case "2" :
                    showProducts();
                    break;
                case "0" :
                    System.out.println("終了します。");
                    return;
                default:
                    System.out.println("入力値が不正です。");
            }        
        } 
    }

    /**
     * ユーザーから価格と発売日を入力として受け取り、新しい商品を登録する。
     * 
     * @params ユーザーから入力を受け取るためのScannerオブジェクト
     */
    public static void addProduct(Scanner sc){
        System.out.println("整数値で価格を入力してください。");
        int price;
        try{
            price = Integer.parseInt(sc.nextLine());
        }catch(NumberFormatException e){
            System.out.println("価格は整数値のみです。");
            return;
        }

        System.out.println("発売日を入力してください(入力例:2025-06-03)");
        String releaseDate = sc.nextLine();

        //UUIDで商品コード生成
        String productCd = UUID.randomUUID().toString();

        Products product = new Products(productCd, price, releaseDate);
        products.put(productCd, product);

        System.out.println("商品コード" + productCd + "の商品を追加しました" );
    }
  
    /**
     * 登録されたすべての商品をコンソールに一覧表示する。
     */
    public static void showProducts(){
        if(products.isEmpty()){
            System.out.println("商品リストは空です");
            return;
        }

        System.out.println("#######商品リスト#######");
        int count = 1;
        for(Products p: products.values()){
            System.out.println(count + "個目の商品");
            System.out.println("商品コード: " + p.productCd);
            System.out.println("価格: " + p.price);
            System.out.println("発売日: " + p.releaseDate);
            System.out.println("########################");
            count++;
        }
    }

}
class Products {
    String productCd;
    int price;
    String releaseDate;

    public Products(String productCd, int price, String releaseDate) {
        this.productCd = productCd;
        this.price = price;
        this.releaseDate = releaseDate;
    }
}
