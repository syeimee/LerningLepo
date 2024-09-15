### ページのルーティングの書き方
react-router-domにエラーが出るが無視でOK。以下のようにすることで、SPAを実装できる。

App.jsx`
```js
function App() {
    return (
        <div className="wrap">
            <Sidebar/>
            <Routes>
                <Route path="/add-issue" element={<AddIssue />} />
                <Route path="/" element={<Lists />} /> {/* ルートページ */}
            </Routes>     
        </div>
       );
}

export default App;
```
