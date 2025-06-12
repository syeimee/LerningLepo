
## MyBatisとは


DB（データベース）にアクセスできるフレームワークのこと。<br>
Spring bootには他にもSpring data JpaやJPQLといったSQLを扱うライブラリやクエリ言語があるが、大きな違いとしては以下の通り。

①SQLをガッツリ書く必要がある。<br>
②DBMSを意識する必要がある。（DBMSによってかけるSQLが異なるから）<br>
③①、②を意識するためにSQLの知識が必要。


特にSpring Data Jpaは自動生成なのでほとんどSQLを意識することなくデータの取得等を行うことができる（※ORM）が、型が決まっていたりキーワードを組み合わせたりと、柔軟性がかけるところがある。逆にMyBatisは全てコードを記入する分面倒だが、より複雑なSQLも実行することができる利点がある。
※ORM = Object Relational Mappingの略。オブジェクトとデータベースをマッピングすることができ、SQLを直接書かなくてもオブジェクトのメソッドでDB操作ができる。<br>
MyBatisもORMに含まれるが、完全なORMではない。

## 実際に書いてみた


手順は以下の通り。
①Modelクラスの作成<br>
②Mapperの作成<br>
③Serviceの作成<br>
④Controllerの作成<br>
⑤DBの設定




## ①Model（User.java）　の作成
```java
package dev.itboot.mb.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
	
	private Long id;
	
	@NotBlank
	@Size(max = 60)
	private String userName;
	
	@NotBlank
	@Email
	@Size(max = 254)
	private String email;

}

```


## ②Mapper（UserMapper.java）の作成
```java
package dev.itboot.mb.repository;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import dev.itboot.mb.model.User;

@Mapper
public interface UserMapper {
	
	//全件取得
	@Select("SELECT * FROM user")
	List<User> selectAll();
	
	
	//１件取得
	@Select({"SELECT * FROM user",
			 "WHERE id = #{id}"
		})
	User selectByPrimaryKey(Long id);
	
	
	//登録
	@Insert({
		"INSERT INTO user(user_name, email)",
		"VALUES(#{userName}, #{email})"
	})
	int insert(User record);
	
	
	//更新
	@Update({
		"UPDATE user",
		"SET user_name = #{userName}, email = #{email}",
		"WHERE id = #{id}"
	})
	int updateByPrimaryKey(User record);
	
	
	//削除
	@Delete({
		"DELETE FROM user",
		"WHERE id = #{id}"
	})
	int deleteByPrimaryKey(Long id);
}

```


## ③Service（UserService.java）の作成
```java
package dev.itboot.mb.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import dev.itboot.mb.model.User;
import dev.itboot.mb.repository.UserMapper;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class UserService {

	private final UserMapper mapper;
	
	//全件取得
	public List<User> selectAll(){
		return mapper.selectAll();
	}
	
	//１件取得
	public Teacher selectByPrimaryKey(Long id) {
		return mapper.selectByPrimaryKey(id);
	}
	
	//更新
	public void save(User user) {
		if(user.getId() == null) {
			mapper.insert(user);
		}else {
			mapper.updateByPrimaryKey(user);
		}
	}
	
	//削除
	public void deleteByPrimaryKey(Long id) {
		mapper.deleteByPrimaryKey(id);
	}
}

```


## ④Controllerの作成
```java
package dev.itboot.mb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import dev.itboot.mb.model.User;
import dev.itboot.mb.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class UserController {
	
	private final UserService service;
	
	//全件取得
	@GetMapping("/")
	public String getAllUsers(Model model) {
		
		model.addAttribute("page", service.selectAll());
		
		return "list";
	}
	
	@GetMapping("/add")
	public String addUser(@ModelAttribute User user) {
		return "form";
	}
	
	@PostMapping("/process")
	public String process(@Validated @ModelAttribute User user, BindingResult result) {
		if(result.hasErrors()) {
			return "form";
		}
		service.save(User);
		
		return "redirect:/";
	}
	
	@GetMapping("/edit/{id}")
	public String editUser(@PathVariable Long id, Model model) {
		model.addAttribute("user", service.selectByPrimaryKey(id));
		return "form";
	}
	
	@GetMapping("/delete/{id}")
	public String deleteUser(@PathVariable Long id) {
		service.deleteByPrimaryKey(id);
		return "redirect:/";
	}

}


```


## ⑤DBの設定
```java
spring.datasource.url=jdbc:h2:mem:testdb

```

application.properties　に下記を記載。（今回はh2データベースを使用。）

schema.sql　ファイルを作成。下記を記載。

```java
create table if not exists user (
	id bigint not null auto_increment primary key,
	user_name varchar(60) not null,
	email varchar(254) not null
);

```
data.sql　ファイルを作成。下記を記載。
```java
insert into user(user_name, email)
values('user', 'user@example.com');

```

## MyBatis作成時のポイント


### ポイント①


アノテーションの使い方は以下の通り。
<table data-sourcepos="240:1-246:27">
<thead>
<tr data-sourcepos="240:1-240:88">
<th style="text-align: center" data-sourcepos="240:57-240:79">アノテーション</th>
<th style="text-align: center" data-sourcepos="240:81-240:87">用途</th>
</tr>
</thead>
<tbody>
<tr data-sourcepos="243:1-243:27">
<td style="text-align: center" data-sourcepos="243:2-243:8"><a href="/Select" class="user-mention js-hovercard" title="Select" data-hovercard-target-type="user" data-hovercard-target-name="Select">@Select</a></td>
<td style="text-align: center" data-sourcepos="243:10-243:26">データ取得</td>
</tr>
<tr data-sourcepos="244:1-244:27">
<td style="text-align: center" data-sourcepos="244:2-244:8"><a href="/Insert" class="user-mention js-hovercard" title="Insert" data-hovercard-target-type="user" data-hovercard-target-name="Insert">@Insert</a></td>
<td style="text-align: center" data-sourcepos="244:10-244:26">データ登録</td>
</tr>
<tr data-sourcepos="245:1-245:27">
<td style="text-align: center" data-sourcepos="245:2-245:8"><a href="/Update" class="user-mention js-hovercard" title="Update" data-hovercard-target-type="user" data-hovercard-target-name="Update">@Update</a></td>
<td style="text-align: center" data-sourcepos="245:10-245:26">データ更新</td>
</tr>
<tr data-sourcepos="246:1-246:27">
<td style="text-align: center" data-sourcepos="246:2-246:8"><a href="/Delete" class="user-mention js-hovercard" title="Delete" data-hovercard-target-type="user" data-hovercard-target-name="Delete">@Delete</a></td>
<td style="text-align: center" data-sourcepos="246:10-246:26">データ削除</td>
</tr>
</tbody>
</table>




















---

### ポイント②


SQL内で変数を渡すときは、
```java
"#{変数名}"
```
で宣言する。メソッドの引数の変数名と合わせると、メソッドで渡ってきた引数の値がSQLに反映される。
```java
@Select({"SELECT * FROM user",
			 "WHERE id = #{id}"
		})
	User selectByPrimaryKey(Long id);
```
クラスの中身を渡すときは、
```java
"#{フィールド名}"
```
と宣言する。これにより、メソッドの引数で渡ってきたインスタンスのフィールドにアクセスできる。
```	java
@Insert({
		"INSERT INTO user(user_name, email)",
		"VALUES(#{userName}, #{email})"
	})
	int insert(User record);

```

### ポイント③


改行をするときは、配列　{}　か文字列連結　+　で行う。
```
// 配列{}の場合
@Select({"SELECT * FROM user",
			 "WHERE id = #{id}"
		})
	
//+の場合
@Select({"SELECT * FROM user"
			+ "WHERE id = #{id}"
		})
```

以上でMyBatis側の設定は完了になります。<br>
あとはHtmlを作成し、うまく表示できれば完了です。<br>
※今回はMyBatisの設定方法をまとめたので、Htmlは省略。


簡単なCRUD操作のみであればSpring Data Jpa、複雑なSQLが必要であればMyBatisで使い分けていけば良いかと思いました。<br>
SQLとSpring bootをどちらも並行して学ぶのであれば、やはりMyBatisを利用していくのが良いかと思いました。
