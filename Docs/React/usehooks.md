## まえがき


React Hooks の自分用ざっくりまとめです。<br>
誤りなどがあればご指摘頂けると幸いです。

## useState


`useState()` は関数コンポーネントでの状態(state)を管理するためのフック。<br>
`const [state, state更新関数] = useState(初期値)` のように定義する。




<a href="https://camo.qiitausercontent.com/71f0469c1afe2403ae3c3ad3d1f4997bcef94ae4/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f30663866353839622d613831382d373666322d303363322d3464633330656163636666312e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F0f8f589b-a818-76f2-03c2-4dc30eaccff1.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=14e55ef5bc1f0582efaef2c9f4acb0ca" alt="useState.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/0f8f589b-a818-76f2-03c2-4dc30eaccff1.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F0f8f589b-a818-76f2-03c2-4dc30eaccff1.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=55d0636bebb28edf4d62b2825a61faa6 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/usestate-lv8sf0?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useState.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F0f8f589b-a818-76f2-03c2-4dc30eaccff1.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=14e55ef5bc1f0582efaef2c9f4acb0ca)


## useEffect


`useEffect()` は第1引数に渡された関数(副作用関数)の実行タイミングをレンダリング後まで遅らせるフック。<br>
第2引数に依存配列を渡すことで副作用関数の実行タイミングを制御できる。



<a href="https://camo.qiitausercontent.com/9e06d7cb44e1d6175c712cd4fad4d44252413095/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f36353264313437322d396230302d653539302d646630652d3565313030393966623830312e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F652d1472-9b00-e590-df0e-5e10099fb801.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=2212dc04dabfd2135c2b9e78c2b3a1ec" alt="useEffect.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/652d1472-9b00-e590-df0e-5e10099fb801.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F652d1472-9b00-e590-df0e-5e10099fb801.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=41f90e4c434739b6153abc3fb33a91a8 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/useeffect-forked-6lxyjl?file=/src/App.jsx" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useEffect.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F652d1472-9b00-e590-df0e-5e10099fb801.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=2212dc04dabfd2135c2b9e78c2b3a1ec)


### useEffect + Dependency Array


useEffect に依存配列を指定すると、<br>
指定した値に変更があった場合に副作用関数を実行する。


<a href="https://camo.qiitausercontent.com/5f38abd3bc4507a292ec5410cd5b9e1828e21bba/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f38636231373962392d376332612d633265392d616139662d3831626364383937363765392e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F8cb179b9-7c2a-c2e9-aa9f-81bcd89767e9.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=33cdbbf0f38a371ea0c5713f1e8f7416" alt="useEffect(DependencyArray).gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/8cb179b9-7c2a-c2e9-aa9f-81bcd89767e9.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F8cb179b9-7c2a-c2e9-aa9f-81bcd89767e9.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=a64f0a0aaa297ff2ca9b9d7dc0eea739 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/useeffect-dependencyarray-forked-hywy8z?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useEffect(DependencyArray).gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F8cb179b9-7c2a-c2e9-aa9f-81bcd89767e9.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=33cdbbf0f38a371ea0c5713f1e8f7416)


### useEffect + Cleanup Function


`useEffect()` の副作用関数内で `return` を書くことでクリーンアップ関数を作成できる。<br>
クリーンアップ関数を `return` することで2回目以降のレンダリング時に前回実行した<br>
副作用を打ち消すことができ、タイマーのキャンセルやイベントリスナーの削除などで利用できる。







<a href="https://camo.qiitausercontent.com/98146fc441a946755c6fed18d96a0f889434f7f7/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f38336163626161352d363164332d663764352d336438632d3464663465333332313465642e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F83acbaa5-61d3-f7d5-3d8c-4df4e33214ed.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=75c0f7461ea1924c78a641540bb0e542" alt="useEffect(CleanUp).gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/83acbaa5-61d3-f7d5-3d8c-4df4e33214ed.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F83acbaa5-61d3-f7d5-3d8c-4df4e33214ed.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=256b16bb0d5a6d1285b7cfe6fe8f3b4b 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/useeffect-cleanup-forked-dt36qt?from-embed=&amp;file=/src/App.jsx:0-320" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useEffect(CleanUp).gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F83acbaa5-61d3-f7d5-3d8c-4df4e33214ed.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=75c0f7461ea1924c78a641540bb0e542)


### useEffect + Cleanup + EventListener


`addEventListerner()` でイベントをバインドした場合、マウントのたびにイベントが多重にバインドされてしまわないようにするため、 `removeEventListerner()` をクリーンアップ時に実行する。



<a href="https://camo.qiitausercontent.com/6ce1c4a1bf1c1ce0757f4db283285f5142159c19/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f30396332633536622d313533352d326164372d653864622d3636383336626135633665622e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F09c2c56b-1535-2ad7-e8db-66836ba5c6eb.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=d74fd71ebe9b0c6322e63c9da09ddf13" alt="useEffect(CleanUpEventListener).gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/09c2c56b-1535-2ad7-e8db-66836ba5c6eb.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F09c2c56b-1535-2ad7-e8db-66836ba5c6eb.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=7a794ba42ff7d53fdbed9c3932a698bb 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/useeffect-eventlistener-y84mky?from-embed=&amp;file=/src/App.jsx" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useEffect(CleanUpEventListener).gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F09c2c56b-1535-2ad7-e8db-66836ba5c6eb.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d74fd71ebe9b0c6322e63c9da09ddf13)


### useEffect + async/await


`useEffect()` の第1引数の副作用関数は戻り値無し or クリーンアップ関数を設定する必要があり、<br>
非同期関数を設定すると戻り値が Promise型 となりエラーになるため、<br>
副作用関数内で非同期関数を定義して利用するか、非同期の即時関数を使って実装する。




<a href="https://camo.qiitausercontent.com/7d06c16c10aa0280bc60da50ba6104425b28eb3a/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f32323064333037622d396537652d396632622d393333302d3262353430383361346531322e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F220d307b-9e7e-9f2b-9330-2b54083a4e12.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=66c3a67de1a4a10d99b7cd62605a9398" alt="useEffect(asyncAwait).gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/220d307b-9e7e-9f2b-9330-2b54083a4e12.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F220d307b-9e7e-9f2b-9330-2b54083a4e12.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=368770924f92474286243a12c4abcc6d 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/useeffect-async-await-forked-6ps7mw?from-embed=&amp;file=/src/App.jsx:0-923" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useEffect(asyncAwait).gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F220d307b-9e7e-9f2b-9330-2b54083a4e12.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=66c3a67de1a4a10d99b7cd62605a9398)


## useRef


`useRef()` は画面の要素への参照を実行し、再レンダリングを行わずに保持している値を更新することができる。(stateの更新時は再レンダリングされる)


<a href="https://camo.qiitausercontent.com/eff8149d8d471760e3810b6b267b2f871677c9ed/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f37313031643335342d336663652d393932312d376461322d3735323264626230346264302e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F7101d354-3fce-9921-7da2-7522dbb04bd0.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=cf4974299f2f15d5e57fed9ae4c3dcfd" alt="useRef.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/7101d354-3fce-9921-7da2-7522dbb04bd0.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F7101d354-3fce-9921-7da2-7522dbb04bd0.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=08e4a6e0b341851627d8cf184efd5227 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/useref-m8eife?from-embed=&amp;file=/src/App.jsx:0-627" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useRef.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F7101d354-3fce-9921-7da2-7522dbb04bd0.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=cf4974299f2f15d5e57fed9ae4c3dcfd)


### useRef + useState



<a href="https://camo.qiitausercontent.com/552d954941f73f7310f5f654423e1f0c4afe33bd/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f35313963626437392d313939642d313966632d393265322d3835316365383533393339632e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F519cbd79-199d-19fc-92e2-851ce853939c.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=51e2f7e691a5172e8eab5ef2b8f7cbf5" alt="useRef(useState).gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/519cbd79-199d-19fc-92e2-851ce853939c.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F519cbd79-199d-19fc-92e2-851ce853939c.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=b71dda318563f0b91e10c4a71aa0184f 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/useref-usestate-61imbh?from-embed=&amp;file=/src/App.jsx:0-552" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useRef(useState).gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F519cbd79-199d-19fc-92e2-851ce853939c.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=51e2f7e691a5172e8eab5ef2b8f7cbf5)


### useRef + form


`useRef()` でフォーム要素を参照しデータを保持/更新することで、 `useState()` を使わなくても再レンダリングを行わずにフォームを実装することができる。



<a href="https://camo.qiitausercontent.com/48c07df9f28641ff3e0c675f07691c73d7697586/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f33663139353065382d313330362d346138312d376132662d6361616437623431386537332e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F3f1950e8-1306-4a81-7a2f-caad7b418e73.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=77a2a83d0fa60792b3ab5acfe3c0e802" alt="useRef(withForm).gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/3f1950e8-1306-4a81-7a2f-caad7b418e73.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F3f1950e8-1306-4a81-7a2f-caad7b418e73.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=194ee91559b2d5d461171db6829397a5 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/form-with-useref-t4keuo?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useRef(withForm).gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F3f1950e8-1306-4a81-7a2f-caad7b418e73.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=77a2a83d0fa60792b3ab5acfe3c0e802)


## useReducer


`useReducer()` は状態管理のためのフックで、　`useState()` を内部実装している。<br>
`(state, action) =&gt; newState` という型の `reducer` を受け取り、<br>
現在の `state` とそれを更新するための `dispatch` 関数を返す。









<a href="https://camo.qiitausercontent.com/f21344565b53b814cd62fb2f633f40a3f66452c5/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f35383131333861662d663363392d366565652d333135632d6639303332646165663531332e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F581138af-f3c9-6eee-315c-f9032daef513.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=154e6bf0e1c6dd68752cbc070b14e854" alt="useReducer.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/581138af-f3c9-6eee-315c-f9032daef513.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F581138af-f3c9-6eee-315c-f9032daef513.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=bf389e5f4c65f967e32851b21b60429c 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/usereducer-32qsxv?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useReducer.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F581138af-f3c9-6eee-315c-f9032daef513.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=154e6bf0e1c6dd68752cbc070b14e854)


## useContext


`useContext()` を利用することで props を子コンポーネントにバケツリレーする必要がなくなる。<br>
Provider - データを渡す側: `createContext()` で生成し Consumer をラップする<br>
Consumer - データを受け取る側: `useContext(contextName)` でデータを利用できる








<a href="https://camo.qiitausercontent.com/f6afd11f5657ebde3b8879d1655762586525948c/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f31346131333031392d346136332d396434372d653463372d3636616334613033313963632e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F14a13019-4a63-9d47-e4c7-66ac4a0319cc.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=9231d1f2ed1d8e29031866b9f6c83101" alt="useContext.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/14a13019-4a63-9d47-e4c7-66ac4a0319cc.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F14a13019-4a63-9d47-e4c7-66ac4a0319cc.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=c2f755346e425c7805fe48d33a44a472 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/usecontext-qz18ou?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useContext.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F14a13019-4a63-9d47-e4c7-66ac4a0319cc.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=9231d1f2ed1d8e29031866b9f6c83101)


## useCallback


`useCallback()` で関数をメモ化することでコンポーネントの再レンダリング時に関数の不要な再生性を防ぐ。<br>
親コンポーネントから渡される props に変更がない場合にラップしたコンポーネントの再レンダリングをスキップすることができる　`memo()` と組み合わせて利用することで、不要なレンダリングを抑制することができる。



メモ化: 同じ結果を返す処理の結果を保持しておき、2回目以降の処理時は都度計算するのではなく保持した値を参照すること。


<a href="https://camo.qiitausercontent.com/6829a49b292ffb2733937cc182770428f351d983/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f38633032313630352d363264302d333439662d363437632d6234343337646162343533322e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F8c021605-62d0-349f-647c-b4437dab4532.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=639689581f2d23fa750099e2ef861fa1" alt="useCallback.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/8c021605-62d0-349f-647c-b4437dab4532.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F8c021605-62d0-349f-647c-b4437dab4532.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=c3a6b67602f32f35233709e4241a440b 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/usecallback-vgdm4w?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useCallback.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F8c021605-62d0-349f-647c-b4437dab4532.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=639689581f2d23fa750099e2ef861fa1)


## useMemo


`useMemo()` で関数の結果をメモ化でき、不要な再計算をスキップすることでパフォーマンス向上を図れる。<br>
`useCallback()` が関数自体をメモ化するのに対して `useMemo()` は関数の結果をメモ化する。





<a href="https://camo.qiitausercontent.com/c7304b23a42ca1154abce68569e378c660550405/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f63613234643734622d336362662d626361312d373631642d6335396430303866656635332e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2Fca24d74b-3cbf-bca1-761d-c59d008fef53.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=242358363e66df36c83356f711bd4e0e" alt="useMemo.gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/ca24d74b-3cbf-bca1-761d-c59d008fef53.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2Fca24d74b-3cbf-bca1-761d-c59d008fef53.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=7a64884459f47b35b2916228dbf8b10e 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/usememo-t76v0v?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useMemo.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2Fca24d74b-3cbf-bca1-761d-c59d008fef53.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=242358363e66df36c83356f711bd4e0e)


### useMemo + memo


`useMemo()` で関数の計算結果をメモ化し、 メモ化したコンポーネントに props で渡すことで不要な再レンダリングをスキップする。



<a href="https://camo.qiitausercontent.com/c8eb99ec36fc7ec4b07da9c921256206b423378d/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f65343565643830392d646266662d306365632d336134632d3739613331343031383063332e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2Fe45ed809-dbff-0cec-3a4c-79a3140180c3.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=969984eea74467ee527bd38d34f2f521" alt="useMemo(withMemo).gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/e45ed809-dbff-0cec-3a4c-79a3140180c3.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2Fe45ed809-dbff-0cec-3a4c-79a3140180c3.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=ac5394c820ebfbbfed08309fa73640e6 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/usememo-memo-hwj2mr?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![useMemo(withMemo).gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2Fe45ed809-dbff-0cec-3a4c-79a3140180c3.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=969984eea74467ee527bd38d34f2f521)


## customHook


`use` から始まる名前でカスタムフック(自分独自のフック)を作成することで、<br>
コンポーネントからロジックを抽出して再利用可能な関数を作成できる。<br>
ここではサンプルとして画面サイズ情報取得・更新ロジックを共通化して切り出す。





<a href="https://camo.qiitausercontent.com/8725100294d2fe479191ae14dd1d8e8c93e95180/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3238333330352f30396533393739342d623639362d623766362d366535312d6236396330316534633361642e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F09e39794-b696-b7f6-6e51-b69c01e4c3ad.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=b01978a959c159126b2d634a11272a8b" alt="customHook(useResize).gif" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/283305/09e39794-b696-b7f6-6e51-b69c01e4c3ad.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F09e39794-b696-b7f6-6e51-b69c01e4c3ad.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=f64fa7622a1240100577082dd3695a6a 1x" loading="lazy"></a><br>
→ <a href="https://codesandbox.io/s/customhook-useresizehook-x51mkr?from-embed" rel="nofollow noopener" target="_blank">CodeSandBox で見る</a>

![customHook(useResize).gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F283305%2F09e39794-b696-b7f6-6e51-b69c01e4c3ad.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b01978a959c159126b2d634a11272a8b)



---

## 参考文献



- https://ja.legacy.reactjs.org/

- https://reffect.co.jp/react/react-cheetsheet

