import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());
const prisma = new PrismaClient({
    log: ['query'] // ログを表示するオプション
});

/**
 * ユーザー一覧を取得するエンドポイント
 * 
 * @route GET /users
 * @returns {Array<Object>} ユーザーのリスト
 * @throws {500} サーバーエラーが発生した場合
 */
app.get('/users',async(req: Request, res: Response) => {
    try{
        const users = await prisma.user.findMany();
        return res.json(users);
    }catch(error){
        return res.status(500).json({ error: 'ユーザーが見つかりません' });
    }
});

/**
 * ユーザーの登録を行うエンドポイント
 * 
 * @route POST /users
 * @param {Object} req.body ユーザー情報
 * @param {string} req.body.name ユーザーの名前
 * @param {string} req.body.email ユーザーのメールアドレス
 * @returns {Object} 登録されたユーザー情報
 * @status 200 ユーザー登録成功
 * @status 400 すでに登録されているユーザー
 * @throws {Error} その他のエラー
 */
app.post('/users',async(req: Request, res: Response) => {
    const {name, email} = req.body;

    if (typeof name !== 'string' || typeof email !== 'string') {
        return res.status(400).json({ error: '型が不適切' });
    }

    try{
        const user = await prisma.user.create({
            data:{
                name,
                email
            },
            // select: {
            //     name: true, // 返却される JSON に `name` を含める
            //     email: false // `email` を除外する
            // }
        });
        return res.json(user);
    }catch(error){
        return res.status(400).json({error: 'すでに登録されているユーザーです'});
    }
});

/**
 * ユーザーの更新を行うエンドポイント
 * 
 * @route PUT /users/:id
 * @param {string} id URLパラメータに含まれるユーザーID
 * @param {Object} req.body ユーザー更新情報
 * @param {string} req.body.name 更新するユーザー名
 * @param {string} req.body.email 更新するユーザーのメールアドレス
 * @returns {Object} 更新されたユーザー情報
 * @status 200 ユーザー情報の更新に成功
 * @status 500 ユーザー情報の更新に失敗
 */
app.put('/users/:id', async(req: Request, res: Response) =>{
    try{
        const { id } = req.params; 
        const {name,email} = req.body;
        const updatedUser = await prisma.user.update({
            where:{ id: Number(id)},
            data:{name,email}
        })
        return res.json(updatedUser);
    }catch(error){
        return res.status(500).json({error: 'ユーザー情報の更新に失敗しました'})
    }
})

/**
 * ユーザーを削除するエンドポイント
 * 
 * @route DELETE /users/:id
 * @param {string} id URLパラメータに含まれるユーザーID
 * @returns {Object} 削除されたユーザー情報
 * @status 200 ユーザーの削除に成功
 * @status 500 サーバーエラーが発生した場合
 */
app.delete('/users/:id', async(req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const deletedUser = await prisma.user.delete({
            where: {id: Number(id)},
        })
        return res.json(deletedUser)
    
    }catch(error){
        return res.status(500).json({error: 'ユーザーの削除に失敗しました'})
    }
})


app.listen(port, () => console.log(`サーバー起動！`));