'use server'
interface FormState{
    error: String;
}


export const createTask = async (taskId: number, state: FormState, FormData: FormData) =>{
    //DBにタスクを作成する
    console.log("タスクを作成しました");
    console.log(FormData.get("name"));
    console.log(taskId);
    state.error = "エラーが発生しました";
    return state;
}