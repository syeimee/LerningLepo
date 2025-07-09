'use client';
import { SlideCanvas } from '@/components/SlideCanvas';
import BodyWrapper from '@/components/BodyWrapper';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import Image from 'next/image';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { worksData } from '@/data/worksData';


export default function Work() {
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const work = clickedIndex ? worksData[clickedIndex] : null;

  const handleSlideClick = (index: number) => {
    setClickedIndex(index + 1);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setClickedIndex(null);
  };

  return (
    <div className="h-[60vh] relative">
      <BodyWrapper>
        <SlideCanvas onSlideClick={handleSlideClick} />
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <div className="flex justify-between">
            {/* 左側：縦並び & スペース分配 */}
            <div className="flex flex-col justify-between w-[40%]">
              <div>

                <button
                  onClick={handleCloseModal}
                  className="relative overflow-hidden flex items-center border-2 border-black bg-white text-black px-4 py-2 group"
                >
                  <ChevronLeftIcon className="w-4 h-4 mr-2 text-black group-hover:text-white z-10" />
                  <span className="relative z-10 text-sm transition-colors duration-500 group-hover:text-white">
                    back to works top
                  </span>
                  <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                </button>
                <div className="flex items-center space-x-4 mt-8">
                  <p className="text-2xl">{work ? work.title : ""}</p>
                </div>
                <div className="flex items-center space-x-4 mt-16">
                  <p className="text-sm">Category</p>
                  <div className="bg-cyan-900 text-white px-4 py-1 rounded">{work ? work.category : ""}</div>
                </div>
                <div className="flex items-center space-x-4 mt-4 flex-wrap">
                  <p className="text-sm">Tag</p>
                  {work ? work.tags.map((tag, i) => (
                    <div key={i} className="bg-cyan-900 text-white px-4 py-1 rounded">{tag}</div>
                  )) : ""}
                </div>
              </div>

              {work?.url ?
                (
                  <a href={work.url}>
                    <button className="relative overflow-hidden w-full px-4 py-2 mt-10 border-2 border-cyan-900 bg-white text-black group">
                      <span className="relative z-10 text-xl transition-colors duration-500 group-hover:text-white">visit site</span>
                      <span className="absolute inset-0 bg-cyan-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    </button>
                  </a>
                )
                : (<>
                  <button className="relative overflow-hidden w-full px-4 py-2 mt-10 border-2 border-cyan-900 bg-cyan-900  text-black group text-white">
                    This site is currently unavailable.
                  </button>
                </>)}
            </div>

            <Image
              src={`/images/image${clickedIndex}.jpg`}
              alt={`Slide ${clickedIndex}`}
              width={700}
              height={400}
              priority={true}
            />
          </div>
        </Modal>
      </BodyWrapper>
    </div>
  );
}
