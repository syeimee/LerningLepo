import BodyWrapper from "@/components/BodyWrapper";
import { PAGE_META } from "@/constants/common/meta";

export default function Contact() {
    return (
        <>
            <div className="max-w-3xl mx-auto px-4 py-8 font-sans text-gray-900">
                <BodyWrapper>
                    <h1 className="font-lato text-2xl font-bold text-center mt-6">{PAGE_META.preparation.title}</h1>
                </BodyWrapper>
            </div>
        </>
    )
}