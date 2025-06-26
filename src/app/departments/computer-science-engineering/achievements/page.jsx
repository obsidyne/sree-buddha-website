"use client";

import React, { useState, useCallback, memo, useEffect } from "react";
import Image from "next/image";

const AchievementCard = memo(({ description, id, imageUrl }) => (
    <div
        className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300"
        data-testid={`achievement-card-${id}`}
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
            <p className="text-gray-700 text-sm">{description}</p>
        </div>
    </div>
));
AchievementCard.displayName = "AchievementCard";

const AchievementListItem = memo(({ achievement, index }) => (
    <div className="p-3 border-l-4 border-yellow-900 bg-yellow-50 rounded-r-md">
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
            setOtherAchievements(others.map((item) => item.Heading));
        };

        fetchData();
    }, []);

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
                                        key={index}
                                        achievement={achievement}
                                        index={index}
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
        </div>
    );
}
