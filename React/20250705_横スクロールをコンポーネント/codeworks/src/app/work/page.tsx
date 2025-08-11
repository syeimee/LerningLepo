import BodyWrapper from "@/components/BodyWrapper";
import ThreeCanvas from "@/components/ThreeCanvas";
import { PAGE_META } from "@/constants/common/meta";
import { SlideCanvas } from "@/components/SlideCanvas";

export default function Work() {
    return (
        <>
            <div className="h-[60vh]">
                <BodyWrapper>
                    {/* <ThreeCanvas/> */}
                    <SlideCanvas/>
                </BodyWrapper>
            </div>
        </>
    )
}