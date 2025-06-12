import java.util.*;
import java.time.*;
import java.time.format.DateTimeParseException;

public class Main {
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
                    ProductManager.addProduct(sc);
                    break;
                case "2" :
                    ProductManager.showProducts();
                    break;
                case "0" :
                    System.out.println("終了します。");
                    return;
                default:
                    System.out.println("入力値が不正です。");
            }        
        } 
    }

}

class Product {
    private String productCd;
    private String productName;
    private long price;
    private LocalDate releaseDate;

    public Product(String productCd, String productName, long price, LocalDate releaseDate) {
        this.productName = productName;
        this.productCd = productCd;
        this.price = price;
        this.releaseDate = releaseDate;
    }

    public String getProductCd() {
        return productCd;
    }

    public long getPrice() {
        return price;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public String getProductName(){
        return productName;
    }
}

class ProductManager{
    static Map<String, Product> products = new LinkedHashMap<>();

    /**
     * ユーザーから価格と発売日を入力として受け取り、新しい商品を登録する。
     * 
     * @params　ユーザーから入力を受け取るためのScannerオブジェクト
     */
    public static void addProduct(Scanner sc){
        long price;
        LocalDate releaseDate;
        String productName;

        //価格のチェック
        long minPrice = 0;
        long maxPrice = 9999999999L;
        //日付のチェック
        LocalDate minDate = LocalDate.of(1900,1,1);
        LocalDate maxDate = LocalDate.of(9999,12,31);
        
        //価格の入力
        while(true){
            System.out.println("整数値で価格を入力してください。");
            try{
                price = Integer.parseLong(sc.nextLine());
        
                if(price >= minPrice && price <= maxPrice){
                    break;
                }else{
                    System.out.println("価格は"+ minPrice + "から" + maxPrice +"までで指定してください。");
                }

            }catch(NumberFormatException e){
                System.out.println("価格は整数値のみです。");
                return;
            }
        }

        //日付の入力
        while(true){
            System.out.println("発売日を入力してください(入力例:2025-06-03)");
            try{
                releaseDate = LocalDate.parse(sc.nextLine());

                if(releaseDate.isAfter(minDate) && releaseDate.isBefore(maxDate)){
                    break;
                }else{
                    System.out.println("日付は" + minDate + "から" + maxDate +"までで指定してください。");
                }
    
            }catch(DateTimeParseException e){
                System.out.println("発売日のフォーマットが不正です。正しい形式で入力してください (例: 2025-06-03)");
                return;
            }
        }

        //商品名の入力
        while(true){
            System.out.println("商品名を入力してください。");
            productName = sc.nextLine();
            if(productName.trim().isEmpty()){
                System.out.println("商品名は必須入力です。");
            }else{
                break;
            }
        }

        //UUIDで商品コード生成
        String productCd = UUID.randomUUID().toString();

        Product product = new Product(productCd, productName, price, releaseDate);
        products.put(productCd, product);

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
        products.values().forEach(p -> {
            //%s:string, %d:decimal, %n:改行
            System.out.printf("商品コード: %s | 商品名: %s | 価格: %d | 発売日: %s%n", p.getProductCd(), p.getProductName(), p.getPrice(), p.getReleaseDate());
        });
        System.out.println("########################");
    }

}