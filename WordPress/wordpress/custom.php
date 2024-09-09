<?php
/*--ここからcode_snipetsに転記--*/

add_filter('usces_filter_single_item', 'customize_single_item_page', 10, 3);

function customize_single_item_page($html, $post, $content) {
    // 商品のカスタムフィールドを取得して追加
    $item_custom = usces_get_item_custom($post->ID, 'list', 'return');
    $custom_html = '';

    if ($item_custom) {
        $custom_html .= '<div class="custom-field">';
        $custom_html .= $item_custom;
        $custom_html .= '</div>';
    }

    // 商品画像
    $item_image = '<div class="item-image">';
    $item_image .= '<a href="' . usces_the_itemImageURL(0, 'return') . '">';
    $item_image .= usces_the_itemImage(0, 600, 600, $post, 'return'); // 画像サイズを指定
    $item_image .= '</a>';
    $item_image .= '</div>';

    // サムネイル画像
    $sub_images = usces_get_itemSubImageNums();
    $thumbnails = '<div class="item-thumbnails">';
    foreach ($sub_images as $id) {
        $thumbnails .= '<a href="' . usces_the_itemImageURL($id, 'return') . '">';
        $thumbnails .= usces_the_itemImage($id, 100, 100, $post, 'return');
        $thumbnails .= '</a>';
    }
    $thumbnails .= '</div>';

    // 商品情報
    $item_info = '<div class="item-info">';
    $item_info .= '<p>お気に入りの写真がキラキラトレーディングカードになります! <br>愛猫、愛犬、自慢のお子様・・・なんでもお好きなものがキラキラカードに変身</p>';
    $item_info .= '<p>材質：PET</p>';
    $item_info .= '<p>寸法：86×59mm</p>';
    $item_info .= '<h3>' . esc_html(usces_the_itemName('return')) . ' (' . esc_html(usces_the_itemCode('return')) . ')</h3>'; //アイテムコード
    $item_info .= '<div class="item-price">';
    if (0 < usces_the_itemCprice('return')) {
        //$item_info .= '<div class="list-price">' . esc_html__('List price', 'usces') . ': ' . usces_the_itemCpriceCr('return') . '</div>';//定価
        $item_info .=  '<span style = "font-size:15px; color:brown;">■ 最初の1枚目（データ作成込）の価格</span>';
        $item_info .= '<div class="list-price" style = "font-size:15px; color:brown;">'. usces_the_itemCpriceCr('return') . '(税込)</div>';//定価
    }
    $item_info .= '</div>';
    $item_info .= $custom_html;
    $item_info .= $content;
    $item_info .= '</div>';

    /*================================
    増刷の価格
    welcartのオプションの値とセレクト値を取得
    ================================*/
    $options_html = '';

    if (usces_is_options()) {
        $options_html .= '<div class="item-options">';
        //$options_html .= '<h4>' . esc_html__('オプション', 'usces') . '</h4>';
        $options_html .= '<ul class="options-list"  style="list-style: none;">';
    
        while (usces_have_options()) {
            $opt_name = esc_html(usces_getItemOptName());
            // wel_get_opts()が配列を返す場合
            $opts_array = wel_get_opts($post); // オプションの配列を取得

            if (is_array($opts_array)) {
			
                foreach ($opts_array as $opt) {
                    $opt_value = $opt['value']; // オプションの値を取得する
  					//$options_html .='<p>'.print_r($opt_value, true).'</p>';//debug
                    $options_list = explode("\n", $opt_value); // 改行で分割して配列にする
                    $options_html .= '<span style = "font-size:15px; color:brown;">■ 2枚目以降（同じデザイン）増刷の価格</span>';
				    foreach ($options_list as $option) {
                	    $option_parts = explode(':', $option);

                        if (count($option_parts) === 2) {
                   		    $option_name = trim($option_parts[0]);
                            $option_value = trim($option_parts[1]);
                            $options_html .= '<li><span class="option-name" style="font-weight:bold;font-size:13px; color:brown;">' . esc_html($option_name) . 
                                             '</span>  <span class="option-value" style="font-weight:bold;font-size:21px; color:brown;">¥' . esc_html($option_value) . 
                                             '(税込）</span></li>';
                        } else {
                            // 分割できない場合のエラーメッセージ
                            $options_html .= '<li><span class="option-value">Uncollect Options!</span></li>';
                        }
                    }
			    }	
            }
	    }

        $options_html .= '</ul>';
        $options_html .= '</div>';
    }

    /*================================
    購入例
    ================================*/
    $first_card = preg_replace('/[^0-9]/', '', usces_the_itemCpriceCr('return'));
    $second_card_opts = explode(':', $options_list[1]);
    $third_card_opts = explode(':', $options_list[2]);
    $fifth_card_opts = explode(':', $options_list[4]);

    $ex_html = '';
    $ex_html .='<span>例）Aさんの絵柄・・・3枚 (初回の1枚が' .(int)$first_card .'円)+(2枚増刷×@' . $second_card_opts[1] . '円) = '. (int)$first_card + $second_card_opts[1] * 2 .'円</span><br>';
    $ex_html .='<span>例）Bさんの絵柄・・・4枚 (初回の1枚が' .(int)$first_card .'円)+(3枚増刷×@' . $third_card_opts[1] . '円) = '. (int)$first_card + $second_card_opts[1] * 3 .'円</span><br>';
    $ex_html .='<span>例）Cさんの絵柄・・・12枚 (初回の1枚が' .(int)$first_card .'円)+(11枚増刷×@' . $fifth_card_opts[1] . '円) = '. (int)$first_card + $fifth_card_opts[1] * 11 .'円</span><br>';
    $ex_html .='<span>*基本的にデータは納品後に破棄しますので、次回ご注文の際に前回のデータを使う事はできません。最初の1枚目の価格（＠'.(int)$first_card.'円）からの価格となります。</span>';


    /*================================
    入力フォーム
    ================================*/
    $form_addition_html = '

        <div id="design-forms-container">
            <div class="design-form">
                <h4>1個目のデザイン</h4>
                <div>
                <span>写真アップロード</span><br>
                <input type="file" name="design_image[]">
                </div>

                <p>名入れ文字</p>

                <div>
                <span>①種族</span><br>
                <input type="text" name="design_name[]" placeholder="例）ヒト">
                </div>

                <div>
                <span>②age</span><br>
                <input type="text" name="design_name[]" placeholder="例）02">
                </div>

                <div>
                <span>③★の数</span><br>
                <input type="text" name="design_name[]" placeholder="例）5個">
                </div>

                <div>
                <span>③★の数</span><br>
                <input type="text" name="design_name[]" placeholder="例）5個">
                </div>


                <div>
                <span>④HP</span><br>
                <input type="text" name="design_name[]" placeholder="例）150">
                </div>

                <div>
                <span>⑤好きな文字2</span><br>
                <input type="text" name="design_name[]" placeholder="例）名前： まーくん">
                </div>

                <div>
                <span>⑥好きな文字3</span><br>
                <input type="text" name="design_name[]" placeholder="例）性格: やさしい">
                </div>

                <div>
                <span>⑦好きな文字4</span><br>
                <input type="text" name="design_name[]" placeholder="例）特技: ハイハイ">
                </div>


                <div>
                <span>⑧好きな文字4</span><br>
                <input type="text" name="design_name[]" placeholder="例）星座:みずがめ座">
                </div>


                <div>
                <span>その他</span><br>
                <textarea type="text" placeholder="伝えたいことがありましたらご記入ください"></textarea>
                </div>

                <div>
                <span>このデザインの枚数：</span>
                <input type="number" min="0" max="9999">
                </div>


                <div>
                <span>合計金額：</span>
                </div>
                
                
                

                <!-- 他のフォームフィールドを追加 -->
            </div>
        </div>

        <button id="add-design-button">別のデザインを追加</button>

        <script type="text/javascript">
        jQuery(document).ready(function($) {
            var formCount = 1;
            $("#add-design-button").on("click", function(e) {
                e.preventDefault();
                formCount++;
                var newForm = $(".design-form:first").clone();
                newForm.find("input").val("");
                newForm.find("h4").text(formCount + "個目のデザイン");
                $("#design-forms-container").append(newForm);
            });
        });

        const addEventLisner = (e) ={
            const first = 1100;
            const second = 600;
            const value = e.target.value;

            swich( true ){

                CASE value  === 1:
                console.log(first);
                CASE value  > 1 && value < 6:
                console.log(second );

            }

        </script>
    ';

    // フォーム部分
    // $form_html = '<div class="skuform" align="right">';
    // if (!usces_have_zaiko()) {
    //     $form_html .= '<div class="zaiko_status">' . apply_filters('usces_filters_single_sku_zaiko_message', esc_html(usces_get_itemZaiko('name'))) . '</div>';
    // } else {
    //     $form_html .= '<div style="margin-top:10px">' . esc_html__('Quantity', 'usces') . usces_the_itemQuant('return') . esc_html(usces_the_itemSkuUnit('return')) . usces_the_itemSkuButton(esc_html__('Add to Shopping Cart', 'usces'), 0, 'return') . '</div>';
    //     $form_html .= '<div class="error_message">' . usces_singleitem_error_message($post->ID, usces_the_itemSku('return'), 'return') . '</div>';
    // }
    // $form_html .= '</div><!-- end of skuform -->';





    // HTML全体を再構築
    $html = '<div id="itempage">';
    $html .= '<form action="' . esc_url(USCES_CART_URL) . '" method="post">';
    $html .= '<div class="item-images">';
    $html .= $item_image;
    $html .= $thumbnails;
    $html .= '</div>';
    $html .= $item_info;
    $html .= $options_html; // オプション部分を追加
    $html .= $ex_html;
    $html .= $form_addition_html; // 追加フォーム部分をここに追加
    // $html .= $form_html;
    $html .= '</form>';
    $html .= '</div>';

    return $html;
}

