export default function AboutDetails(){
    return(
        <div className="ml-8">  
            <h1 className="font-lato text-2xl font-bold">■ ABOUT Syeimee</h1>
            <div className="mt-8">
                <h2 className="font-lato text-xl font-bold">Profile</h2>
                <p>2024年から岡山でWebエンジニアをしています。</p>
                <p>プログラミングが大好き。</p>
                <p>前職は塾の先生で、教えることも好き。</p>
                <p>居住地： 岡山県</p>
                <p>出身地； 広島県</p>
                <p>生年月日； 1993.11.17</p>
                <p>趣味: ゲーム、ギター</p>
            </div>

            <div className="mt-8">
            <h2 className="font-lato text-xl  font-bold">Languages, Frameworks, and Tools</h2>
                <img className="pt-2" src="https://skillicons.dev/icons?i=ruby,rails,js,java,postgres,sqlite,html,css,github,docker" /> 
                <img className="pt-2" src="https://skillicons.dev/icons?i=figma,vscode,blender,py,jquery,linux,threejs,unity,cs,wordpress" /> 
                <img className="pt-2" src="https://skillicons.dev/icons?i=php,react,cs" />
            </div>
        </div>
    )
}