import java.util.Scanner;
public class SampleGame0020 {
	//定数
	private static int PLAYER_TYPE_HUMAN = 1;
	private static int PLAYER_TYPE_COMPUTER = 2;
	private static int PLAYER_COUNT = 2;
	
	private static int PLAYER_INDEX_NONE = -1;
	private static int PLAYER_INDEX_01	= 1;
	private static int PLAYER_INDEX_02	= 2;
	private static String PLAYER_MARK_01	= "o";
	private static String PLAYER_MARK_02	= "x";
	
	private static int BOARD_COL_SIZE = 3;
	private static int BOARD_ROW_SIZE = 3;
	
	//グローバル変数
	//プレイヤー群
	private static int[] gPlayers;
	private static Scanner gScanner;
	private static int[][] gBoard;
	
	/**
	 * 〇×ゲーム（３目並べ）
	 *
	 * ・メニュー画面
	 *
	 * ・プレイ画面
	 *
	 * ・結果画面
	 *
	 * @param args
	 */
	public static void main(String[] args) {
		//準備
		gScanner = new Scanner(System.in);
		gPlayers = new int[PLAYER_COUNT];
		gBoard = new int[BOARD_COL_SIZE][BOARD_ROW_SIZE];
		
		//-メニュー画面
		//  人間、CPの選択
		//  先攻、後攻の選択
		boolean good = executeMenu();
		
		//-プレイ画面
		if(good) {
			
		}
		
		//-結果画面
		
		
		//後始末
		gScanner.close();
	}
	/**
	 *
	 * ゲーム内容を決定する
	 * （グローバル変数に結果を格納する）
	 *
	 * @return true=ゲーム継続 false=ゲーム終了
	 */
	public static boolean executeMenu() {
		//Plyaer1は人間か？コンピューターか？
		for(int i=0;i<gPlayers.length;i++) {
			gPlayers[i] = inputValue(PLAYER_INDEX_NONE,
										Integer.toString(i+1)+"人目：人間の場合は%dを、コンピュータの場合は%dを入力してください。",
										0,1);
		}
		
		return true;
	}
	
	/**
	 * 〇×ゲームを行う
	 *
	 * @return true=ゲーム正常終了 false=ゲーム強制終了
	 */
	public static boolean executeGamePlay() {
		//ボードの初期化
		for(int col=0;col<BOARD_COL_SIZE;col++) {
			for(int row=0;row<BOARD_ROW_SIZE;row++) {
				gBoard[col][row] = 0;
			}
		}
		
		
		return true;
	}
	
	
	
	/**
	 * 画面への出力
	 *
	 * @param playerIndex 0=1番目のプレイヤー 1=2番目のプレイヤー 0未満の場合は無視される
	 * @param text
	 */
	public static void dispText(int playerIndex,String text) {
		if(playerIndex>-1) {
			System.out.println( String.format("player%d:%s", playerIndex,text) );
		}else {
			System.out.println(text);			
		}
	}
	
	/**
	 * 指定された範囲内の整数値を受け付ける
	 *
	 * @param playerIndex
	 * @param text
	 * @param min
	 * @param max
	 * @return
	 */
	public static int inputValue(int playerIndex,String text,int min,int max) {
		dispText(playerIndex,String.format(text, min,max));
		
		int value = gScanner.nextInt();
		while( value < min || max < value ) {
			dispText(playerIndex,String.format(text, min,max));
			value = gScanner.nextInt();			
		}
		
		return value;
	}
	
	public static void dispBoard() {
		for(int col=0;col<BOARD_COL_SIZE;col++) {
			for(int row=0;row<BOARD_ROW_SIZE;row++) {
				String value = "";
/*				switch (gBoard[col][row]) {
				case PLAYER_INDEX_01: {
					value = PLAYER_MARK_01;
					break;
				}
				case PLAYER_INDEX_02: {
					value = PLAYER_MARK_02;
					break;
				}
				}
*/				System.out.print(value);
			}
			System.out.print("\r\n");
		}
	}
}