"use client";

import React, { useState, useCallback, memo, useEffect } from "react";
import Image from "next/image";

const AchievementCard = memo(({ description, id, imageUrl, onClick }) => (
    <div
        className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105"
        data-testid={`achievement-card-${id}`}
        onClick={onClick}
    >
        <div className="relative h-48 bg-gray-100 flex items-center justify-center">
            {imageUrl ? (
                <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI}${imageUrl}`}
                    alt="Achievement"
                    layout="fill"
                    objectFit="cover"
                    className="object-cover"
                />
            ) : (
                <span className="text-gray-500 text-sm">Image Not Available</span>
            )}
        </div>
        <div className="p-4">
            <p className="text-gray-700 text-sm text-justify line-clamp-3">{description}</p>
        </div>
    </div>
));
AchievementCard.displayName = "AchievementCard";

const AchievementListItem = memo(({ achievement, index, onClick }) => (
    <div 
        className="p-3 border-l-4 border-yellow-900 bg-yellow-50 rounded-r-md cursor-pointer hover:bg-yellow-100 transition-colors"
        onClick={onClick}
    >
        <div className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-yellow-900 text-white text-xs font-medium">
                {index + 1}
            </div>
            <div className="ml-3">
                <p className="text-gray-800 text-sm">{achievement}</p>
            </div>
        </div>
    </div>
));
AchievementListItem.displayName = "AchievementListItem";

export default function CSEDepartmentAchievements() {
    const [activeTab, setActiveTab] = useState("featured");
    const [showAllAchievements, setShowAllAchievements] = useState(false);
    const [featuredAchievements, setFeaturedAchievements] = useState([]);
    const [otherAchievements, setOtherAchievements] = useState([]);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI}/api/cse-depts?filters[Dept_name][$eq]=CSE&populate[Achivements][populate]=Images`
            );
            const json = await res.json();
            const data = json?.data?.[0]?.Achivements || [];

            const featured = data.filter((item) => item.Featured);
            const others = data.filter((item) => !item.Featured);

            setFeaturedAchievements(featured);
            setOtherAchievements(others);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setSelectedAchievement(null);
            }
        };
        
        if (selectedAchievement) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [selectedAchievement]);

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    const toggleShowAllAchievements = useCallback(() => {
        setShowAllAchievements((prev) => !prev);
    }, []);

    const displayedAchievements = showAllAchievements
        ? otherAchievements
        : otherAchievements.slice(0, 7);

    return (
        <div className="bg-white">
            <header className="relative bg-gradient-to-b from-yellow-50 to-white">
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-yellow-900/10 pattern-diagonal-lines pattern-yellow-500/20 pattern-bg-white pattern-size-4" aria-hidden="true" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
                            Department Of Computer Science Engineering
                        </h1>
                        <div className="w-24 sm:w-32 md:w-40 h-1 bg-yellow-900 mx-auto mb-4 sm:mb-6 md:mb-8" aria-hidden="true" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800">Achievements</h2>
                    </div>
                </div>
            </header>

            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-center py-3 gap-3">
                        <button
                            onClick={() => handleTabChange("featured")}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === "featured"
                                    ? "bg-yellow-900 text-white"
                                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            Featured
                        </button>
                        <button
                            onClick={() => handleTabChange("list")}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === "list"
                                    ? "bg-yellow-900 text-white"
                                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                        >
                            All Achievements
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-6">
                {activeTab === "featured" && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-yellow-900 pl-3">
                            Outstanding Achievements
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {featuredAchievements.map((item) => {
                                const imageUrl =
                                    item.Images?.[0]?.formats?.medium?.url ||
                                    item.Images?.[0]?.url ||
                                    null;
                                return (
                                    <AchievementCard
                                        key={item.id}
                                        id={item.id}
                                        description={item.Heading}
                                        imageUrl={imageUrl}
                                        onClick={() => setSelectedAchievement(item)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === "list" && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-yellow-900 pl-3">
                            Department Achievements
                        </h3>
                        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                            <div className="space-y-3">
                                {displayedAchievements.map((achievement, index) => (
                                    <AchievementListItem
                                        key={achievement.id || index}
                                        achievement={achievement.Heading}
                                        index={index}
                                        onClick={() => setSelectedAchievement(achievement)}
                                    />
                                ))}
                            </div>
                            {!showAllAchievements && otherAchievements.length > 7 && (
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={toggleShowAllAchievements}
                                        className="px-4 py-1.5 bg-yellow-900 text-white text-sm rounded-md hover:bg-yellow-800 transition-colors"
                                    >
                                        View More
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Achievement Details Modal */}
            {selectedAchievement && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedAchievement(null)}
                >
                    <div 
                        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Achievement Details</h2>
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Achievement Image */}
                            {selectedAchievement.Images && selectedAchievement.Images.length > 0 && (
                                <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-6 bg-gray-100">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_STRAPI}${
                                            selectedAchievement.Images[0]?.formats?.large?.url ||
                                            selectedAchievement.Images[0]?.formats?.medium?.url ||
                                            selectedAchievement.Images[0]?.url
                                        }`}
                                        alt="Achievement"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 768px"
                                    />
                                </div>
                            )}

                            {/* Featured Badge */}
                            {selectedAchievement.Featured && (
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-900 text-sm font-semibold rounded-full uppercase tracking-wide">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                        Featured Achievement
                                    </span>
                                </div>
                            )}

                            {/* Achievement Heading */}
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                                {selectedAchievement.Heading}
                            </h3>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="w-full sm:w-auto px-6 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}