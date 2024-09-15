
<img src=".\img/regex_page-0001.jpg" alt="regex page 0001">
<img src=".\img/regex_page-0002.jpg" alt="regex page 0002">
<img src=".\img/regex_page-0003.jpg" alt="regex page 0003">
<img src=".\img/regex_page-0004.jpg" alt="regex page 0004">
<img src=".\img/regex_page-0005.jpg" alt="regex page 0005">
<img src=".\img/regex_page-0006.jpg" alt="regex page 0006">
<img src=".\img/regex_page-0007.jpg" alt="regex page 0007">
<img src=".\img/regex_page-0008.jpg" alt="regex page 0008">
<img src=".\img/regex_page-0009.jpg" alt="regex page 0009">
<img src=".\img/regex_page-0010.jpg" alt="regex page 0010">
<img src=".\img/regex_page-0011.jpg" alt="regex page 0011">
<img src=".\img/regex_page-0012.jpg" alt="regex page 0012">
<img src=".\img/regex_page-0013.jpg" alt="regex page 0013">
<img src=".\img/regex_page-0014.jpg" alt="regex page 0014">
<img src=".\img/regex_page-0015.jpg" alt="regex page 0015">
<img src=".\img/regex_page-0016.jpg" alt="regex page 0016">
<img src=".\img/regex_page-0017.jpg" alt="regex page 0017">
<img src=".\img/regex_page-0018.jpg" alt="regex page 0018">
<img src=".\img/regex_page-0019.jpg" alt="regex page 0019">
<img src=".\img/regex_page-0020.jpg" alt="regex page 0020">
<img src=".\img/regex_page-0021.jpg" alt="regex page 0021">
<img src=".\img/regex_page-0022.jpg" alt="regex page 0022">
<img src=".\img/regex_page-0023.jpg" alt="regex page 0023">
<img src=".\img/regex_page-0024.jpg" alt="regex page 0024">
<img src=".\img/regex_page-0025.jpg" alt="regex page 0025">
<img src=".\img/regex_page-0026.jpg" alt="regex page 0026">
<img src=".\img/regex_page-0027.jpg" alt="regex page 0027">
<img src=".\img/regex_page-0028.jpg" alt="regex page 0028">
<img src=".\img/regex_page-0029.jpg" alt="regex page 0029">
<img src=".\img/regex_page-0030.jpg" alt="regex page 0030">
<img src=".\img/regex_page-0031.jpg" alt="regex page 0031">
<img src=".\img/regex_page-0032.jpg" alt="regex page 0032">
<img src=".\img/regex_page-0033.jpg" alt="regex page 0033">
<img src=".\img/regex_page-0034.jpg" alt="regex page 0034">
<img src=".\img/regex_page-0035.jpg" alt="regex page 0035">
<img src=".\img/regex_page-0036.jpg" alt="regex page 0036">
<img src=".\img/regex_page-0037.jpg" alt="regex page 0037">
<img src=".\img/regex_page-0038.jpg" alt="regex page 0038">
<img src=".\img/regex_page-0039.jpg" alt="regex page 0039">
<img src=".\img/regex_page-0040.jpg" alt="regex page 0040">
<img src=".\img/regex_page-0041.jpg" alt="regex page 0041">
<img src=".\img/regex_page-0042.jpg" alt="regex page 0042">
<img src=".\img/regex_page-0043.jpg" alt="regex page 0043">
<img src=".\img/regex_page-0044.jpg" alt="regex page 0044">
<img src=".\img/regex_page-0045.jpg" alt="regex page 0045">
<img src=".\img/regex_page-0046.jpg" alt="regex page 0046">
<img src=".\img/regex_page-0047.jpg" alt="regex page 0047">
<img src=".\img/regex_page-0048.jpg" alt="regex page 0048">

## 正規表現チェックツール
https://regex101.com/

## その1

ID:zaru
ID:mu
ID:hoge

`ID:([a-z]{4})`を`@$1`で置換すると
@zaru
ID:mu
@hoge

## その2

今は米ドル円が90円で円高だ
110円くらいになって欲しい

`([0-9]+)円`を`¥$1`で置換すると


今は米ドル円が¥90で円高だ
¥110くらいになって欲しい

# その３

$userを$customerに置換する
ただし$userListはそのままにする

$user = 'zaru';
$userList = ['mu','zaru'];

\$user(?!List)を$customerで置換すると

$customer = 'zaru';
$userList = ['mu','zaru'];

