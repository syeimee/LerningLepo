package exday4;

public class CellPhone implements IPhone,IEmail {
    //メールアドレスと電話番号
    private String mailAddress;
    private String number;

    //コンストラクタ
    public CellPhone(String mailAddress, String number){
        this.number = number;
        this.mailAddress = mailAddress;
    }
    //指定したメールアドレスにメールを送信する
    public void sendMail(String address){
        System.out.println(address+"に、 "+this.mailAddress+"からメールを出します。");
    }

    public void call(String number){
        System.out.println(number+"に、 "+this.number+"から電話をかけます");
    }


}
