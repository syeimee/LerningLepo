import { PAGE_META } from "@/constants/common/meta"
import BodyWrapper from "./BodyWrapper"

export default function AboutDetails() {
    return (
        <>
            <div className="max-w-3xl mx-auto px-4 py-8 font-sans text-gray-900">
                <BodyWrapper>

                    <h1 className="font-lato text-2xl font-bold text-center mt-6">{PAGE_META.about.title}.</h1>
                    <div className="mt-8 leading-6">
                        <p>前職の塾講師時代、</p>
                        <p>GASでの業務効率化経験からエンジニアに転職。</p>
                        <p>現在は、岡山でWebエンジニアをしています。</p>
                        <p>数学・プログラミングを愛する一児の父。</p>
                        <br></br>
                        <p>生年月日； 1993.11.17</p>
                        <p>趣味: ゲーム、ギター</p>
                    </div>

                    <div className="mt-8">
                        <h2 className="font-lato text-xl font-bold">Languages, Frameworks, and Libraries</h2>
                        <div className="flex flex-wrap gap-4">
                            <img className="pt-2" src="https://skillicons.dev/icons?i=ruby,rails,java,spring,js,ts,next,react,threejs,html,css,tailwind" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="font-lato text-xl font-bold">Infrastructure and Database</h2>
                        <div className="flex flex-wrap gap-4">
                            <img className="pt-2" src="https://skillicons.dev/icons?i=postgres,mysql,linux,docker" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="font-lato text-xl font-bold">Tools</h2>
                        <div className="flex flex-wrap gap-4">
                            <img className="pt-2" src="https://skillicons.dev/icons?i=postman,figma,vscode,eclipse,blender" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="font-lato text-xl font-bold">License</h2>
                        <div className="flex flex-wrap gap-4">
                            <img className="pt-2 h-14" src="https://unofficial-ipa-exam-badges.vercel.app/en/icon/fe/2024/october" />
                            <img className="pt-2 h-14" src="https://unofficial-ipa-exam-badges.vercel.app/en/icon/ap/2025/april" />
                        </div>
                    </div>
                </BodyWrapper>
            </div>
        </>
    )
}
