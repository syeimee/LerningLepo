export const getAllPokemon = (URL) =>{
    return new Promise((resolve, reject) =>{
        /*-------------------------
        fetchでデータを取得
        ↓
        取得できたら、jsonで返す
        ↓
        jsonをデータで返す
        Promise（約束）が果たされるまでAwait（まつ）
        -------------------------*/
        fetch(URL)
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
}

export const getPokemon = (url) => {
    return new Promise((resolve, reject) =>{
        fetch(url)
            .then((res) => res.json())
            .then((data) => resolve(data))
    })


}


