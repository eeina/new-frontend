import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";

interface Goal {
    id: string;
    title: string;
    description: string;
    progress: number;
    target: string;
    currentValue: number;
    targetValue: number;
    unit: string;
    color: string;
    bgColor: string;
    progressColor: string;
    icon: React.ComponentType<any>;
    active: boolean;
    startDate: string;
    targetDate: string;
    category: "weight" | "fitness" | "health" | "lifestyle";
    progressHistory: Array<{
        date: string;
        value: number;
        note?: string;
    }>;
    milestones: Array<{
        value: number;
        label: string;
        achieved: boolean;
        achievedDate?: string;
    }>;
}

interface GoalsSectionProps {
    userGoals: Goal[];
    language: string;
    t: any;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({ userGoals, language, t }) => {
    // Generate localized path
    const getLocalizedPath = (path: string) => {
        return language === "ar" ? `/ar${path === "/" ? "" : path}` : path;
    };

    // Calculate days remaining
    const getDaysRemaining = (targetDate: string) => {
        const today = new Date();
        const target = new Date(targetDate);
        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    };

    return (
        <div className="mb-6 sm:mb-8 px-4 sm:px-0">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {language === "ar" ? "أهدافي" : "My Goals"}
                </h2>
                <Link to={getLocalizedPath("/goals")}>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs sm:text-sm"
                    >
                        {t.common.view_all}
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {userGoals.slice(0, 2).map((goal) => (
                    <Card key={goal.id} className="overflow-hidden">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${goal.bgColor}`}
                                >
                                    <goal.icon
                                        className={`w-4 h-4 sm:w-5 sm:h-5 ${goal.color}`}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base sm:text-lg text-gray-900">
                                        {goal.title}
                                    </h3>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        {goal.description}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="text-lg sm:text-2xl font-bold text-[#22ae4b]">
                                        {goal.progress}%
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {language === "ar" ? "مكتمل" : "Complete"}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full bg-[#22ae4b] transition-all duration-500"
                                        style={{
                                            width: `${Math.min(
                                                goal.progress,
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                                <span>
                                    {goal.currentValue}
                                    {goal.unit} / {goal.targetValue}
                                    {goal.unit}
                                </span>
                                <span>
                                    {getDaysRemaining(goal.targetDate)}{" "}
                                    {language === "ar" ? "يوم متبقي" : "days left"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};