import { useState, useEffect, useRef } from "react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";

export default function Carousel({ items, background, mediaField , type }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(0);
    const [visibleCards, setVisibleCards] = useState(3);
    const [isHovering, setIsHovering] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisibleCards(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCards(2);
            } else {
                setVisibleCards(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            const next = (currentIndexRef.current + 1) % items.length;
            setCurrentIndex(next);
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovering, items.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev === 0 ? items.length - 1 : prev - 1;
            currentIndexRef.current = newIndex;
            return newIndex;
        });
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = (prev + 1) % items.length;
            currentIndexRef.current = newIndex;
            return newIndex;
        });
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        currentIndexRef.current = index;
    };

    return (
        <div
            className="relative w-full overflow-hidden rounded-xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={carouselRef}
        >
            {/* Navigation buttons */}
            <div className="w-full pb-4 flex justify-end items-center gap-4">
                <button
                    className={`z-10 p-2 rounded-full ${background === "white" ? "bg-white/10" : "bg-white"} text-black hover:bg-black hover:text-white transition-all shadow-md`}
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    <HiOutlineArrowLeft size={32} />
                </button>
                <button
                    className={`z-10 p-2 rounded-full ${background === "white" ? "bg-white/10" : "bg-white"} text-black hover:bg-black hover:text-white transition-all shadow-md`}
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    <HiOutlineArrowRight size={32} />
                </button>
            </div>

            {/* Carousel track */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="p-3 w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 rounded-xl flex flex-col items-start group"
                    >
                        <div className="bg-gray-50 w-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <div className="relative w-full h-64 md:h-72 lg:h-80">
                                <img

                                    src={ item[mediaField]? `${  process.env.NEXT_PUBLIC_STRAPI}${   item[mediaField].url || "" }` : null}
                                    alt={item.attributes?.Heading || "Event image"}
                                    width={800}
                                    height={1000}
                                    className="absolute object-cover w-full h-full object-center transition duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                                />



                                {/* Gradient overlay */}
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

                                {/* Outward Arrow */}
                                <Link
                                    href={`/${type}/${item.documentId}`}
                                    className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-black rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                    <MdOutlineArrowOutward className="w-6 h-6" />
                                </Link>
                            </div>

                            {/* Title and description */}
                            <div className="p-5">
                                {/* <Link href={`/`} className="block"> */}
                                    <h3 className="text-lg md:text-xl font-semibold mb-2 truncate hover:text-gray-700 transition-colors">
                                        {item.Heading}
                                    </h3>

                                    {item.date && (
                                        <p className="text-sm text-gray-600 mb-2">
                                            {new Date(item.date).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    )}

                                    {item.description && (
                                        <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                                    )}
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: Math.ceil(items.length / visibleCards) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index * visibleCards)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === Math.floor(currentIndex / visibleCards)
                                ? "bg-black w-6"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
