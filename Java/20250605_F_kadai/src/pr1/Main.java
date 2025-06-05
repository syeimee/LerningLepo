import java.util.*;
import java.time.*;
import java.time. format.DateTimeParseException;
 
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
                    StockController.addProduct(sc);
                    break;
                case "2" :
                    StockController.showProducts();
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

class StockController{
    private Map<String, Product> products = new LinkedHashMap<>();

    /**
     * ユーザーから価格と発売日を入力として受け取り、新しい商品を登録する。
     * 
     * @params　ユーザーから入力を受け取るためのScannerオブジェクト
     */
    public void addProduct(Scanner sc){
        long price;
        LocalDate releaseDate;
        String productName;
        String productCd;
        
        while(true){
            
            //価格の入力
            System.out.println("整数値で価格を入力してください。");
            try{
                price = Long.parseLong(sc.nextLine());
            }catch(NumberFormatException e){
                System.out.println("価格は整数値のみです。");
                return;
            }

            //日付の入力
            System.out.println("発売日を入力してください(入力例:2025-06-03)");
            try{
                releaseDate = LocalDate.parse(sc.nextLine());
            }catch(DateTimeParseException e){
                System.out.println("発売日のフォーマットが不正です。正しい形式で入力してください (例: 2025-06-03)");
                return;
            }

            //商品名の入力
            System.out.println("商品名を入力してください。");
            productName = sc.nextLine();

            //商品コードの入力
            System.out.println("商品コードを入力してください。");
            productCd = sc.nextLine();

            boolean hasError = InputValidator.validate(productCd, productName, price, releaseDate, products);
            if(!hasError){
                break;
            }
        }
        Product product = new Product(productCd, productName, price, releaseDate);
        products.put(productCd, product);

    }
    /**
     * 登録されたすべての商品をコンソールに一覧表示する。
     */
    public void showProducts(){
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

class InputValidator {
    private static final long MIN_PRICE = 0;
    private static final long MAX_PRICE = 9999999999L;
    private static final LocalDate MIN_DATE = LocalDate.of(1900, 1, 1);
    private static final LocalDate MAX_DATE = LocalDate.of(9999, 12, 31);

    public static boolean validate(
        String productCd,
        String productName,
        long price,
        LocalDate releaseDate,
        Map<String, Product> products    
    ) {

        boolean hasError = false;

        if (price < MIN_PRICE || price > MAX_PRICE) {
            System.out.println("#### ERROR:価格は" + MIN_PRICE + "から" + MAX_PRICE + "までで指定してください。####");
            hasError = true;
        }

        if (releaseDate.isBefore(MIN_DATE) || releaseDate.isAfter(MAX_DATE)) {
            System.out.println("#### ERROR:日付は" + MIN_DATE + "から" + MAX_DATE + "までで指定してください。####");
            hasError = true;
        }

        if (productName.trim().isEmpty()) {
            System.out.println("#### ERROR:商品名は必須入力です。####");
            hasError = true;
        }

        if (products.containsKey(productCd)) {
            System.out.println("#### ERROR:商品コードが重複しています。もう一度入力してください。####");
            hasError = true;
        }

        return hasError;
    }
}
