package exday4;

public class SampleEx401 {
    public static void main(String[] args) {
        CellPhone cp = new CellPhone("hoge","090-1234-5678");

        cp.call("011-1111-1111");
        cp.sendMail("fugafuga");

        //電話インターフェースでインスタンスにキャストしてアクセス

        IPhone phone = (IPhone)cp;
        phone.call("022-222-2222");

        IEmail mail = (IEmail)cp;
        mail.sendMail("hoge@email.com");
    

    }



}
