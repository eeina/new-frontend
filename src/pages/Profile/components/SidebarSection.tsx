import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Avatar } from "../../../components/ui/avatar";
import { 
    Plus, 
    Calendar, 
    Bookmark, 
    BarChart3, 
    Award, 
    Check 
} from "lucide-react";
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

interface Creator {
    name: string;
    avatar: string;
    followers: number;
    specialty: string;
    verified: boolean;
}

interface UserProfile {
    memberSince: string;
    accountType: string;
    verified: boolean;
    profileCompletion: number;
}

interface SidebarSectionProps {
    userGoals: Goal[];
    creators: Creator[];
    userProfile: UserProfile;
    showAllCreators: boolean;
    setShowAllCreators: (show: boolean) => void;
    newRecipeUrl: string;
    setNewRecipeUrl: (url: string) => void;
    handleImportRecipe: () => void;
    setShowGoalsModal: (show: boolean) => void;
    language: string;
    t: any;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
    userGoals,
    creators,
    userProfile,
    showAllCreators,
    setShowAllCreators,
    newRecipeUrl,
    setNewRecipeUrl,
    handleImportRecipe,
    setShowGoalsModal,
    language,
    t,
}) => {
    // Generate localized path
    const getLocalizedPath = (path: string) => {
        return language === "ar" ? `/ar${path === "/" ? "" : path}` : path;
    };

    return (
        <div className="lg:col-span-4 px-4 sm:px-0">
            <div className="sticky top-24 space-y-6">
                {/* Quick Actions */}
                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                            {t.profile.quick_actions}
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                            <Link to={getLocalizedPath("/create-recipe")}>
                                <Button className="w-full bg-[#22ae4b] hover:bg-[#1c9a40] text-white justify-start text-sm h-10 sm:h-12">
                                    <Plus className="w-4 h-4 mr-2" />
                                    {t.profile.add_new_recipe}
                                </Button>
                            </Link>
                            <Link to={getLocalizedPath("/planner")}>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-sm h-10 sm:h-12"
                                >
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {t.home.meal_planner}
                                </Button>
                            </Link>
                            <Link to={getLocalizedPath("/lists")}>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-sm h-10 sm:h-12"
                                >
                                    <Bookmark className="w-4 h-4 mr-2" />
                                    {t.home.shopping_list}
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Goals Summary */}
                {userGoals.filter((g) => g.active).length > 0 && (
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-[#22ae4b]" />
                                {language === "ar" ? "ملخص الأهداف" : "Goals Summary"}
                            </h3>
                            <div className="space-y-3">
                                {userGoals
                                    .filter((g) => g.active)
                                    .slice(0, 3)
                                    .map((goal) => (
                                        <div
                                            key={goal.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${goal.bgColor}`}
                                                >
                                                    <goal.icon
                                                        className={`w-4 h-4 ${goal.color}`}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm text-gray-900">
                                                        {goal.title}
                                                    </div>
                                                    <div className="text-xs text-gray-600">
                                                        {goal.currentValue} /{" "}
                                                        {goal.targetValue} {goal.unit}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div
                                                    className={`text-lg font-bold ${goal.color}`}
                                                >
                                                    {goal.progress}%
                                                </div>
                                                <div className="w-12 bg-gray-200 rounded-full h-1">
                                                    <div
                                                        className={`h-1 rounded-full ${goal.progressColor}`}
                                                        style={{
                                                            width: `${goal.progress}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <Button
                                onClick={() => setShowGoalsModal(true)}
                                variant="outline"
                                className="w-full mt-4"
                            >
                                {language === "ar"
                                    ? "عرض جميع الأهداف"
                                    : "View All Goals"}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Import Recipe */}
                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                            {t.profile.import_recipe}
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                            <Input
                                placeholder={t.profile.enter_recipe_url}
                                value={newRecipeUrl}
                                onChange={(e) => setNewRecipeUrl(e.target.value)}
                                className="border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b] text-sm h-10 sm:h-12"
                            />
                            <Button
                                onClick={handleImportRecipe}
                                className="w-full bg-[#22ae4b] hover:bg-[#1c9a40] text-white text-sm h-10 sm:h-12"
                            >
                                {t.profile.import_recipe}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Info */}
                <Card>
                    <CardContent className="p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                            {language === "ar"
                                ? "معلومات الحساب"
                                : "Account Information"}
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    {t.profile.member_since}
                                </span>
                                <span className="font-medium">
                                    {userProfile.memberSince}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    {t.profile.account_type}
                                </span>
                                <span className="font-medium text-[#22ae4b]">
                                    {userProfile.accountType}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    {t.profile.verification}
                                </span>
                                <span className="font-medium text-green-600">
                                    {t.profile.verified}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">
                                    {t.profile.profile_completion}
                                </span>
                                <span className="font-medium text-[#22ae4b]">
                                    {userProfile.profileCompletion}%
                                </span>
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                            <div
                                className="bg-[#22ae4b] h-2 rounded-full transition-all duration-300"
                                style={{
                                    width: `${userProfile.profileCompletion}%`,
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Top Creators */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Award className="w-5 h-5 text-[#22ae4b]" />
                            <h3 className="font-bold text-gray-900">
                                {t.home.top_creators}
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {creators
                                .slice(0, showAllCreators ? creators.length : 3)
                                .map((creator, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="relative">
                                            <Avatar className="w-12 h-12">
                                                <img
                                                    src={creator.avatar}
                                                    alt={creator.name}
                                                />
                                            </Avatar>
                                            {creator.verified && (
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-2 h-2 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-sm text-gray-900">
                                                {creator.name}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {creator.specialty}
                                            </div>
                                            <div className="text-xs text-[#22ae4b] font-medium">
                                                {creator.followers} followers
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-xs px-3 py-1 h-7"
                                        >
                                            Follow
                                        </Button>
                                    </div>
                                ))}
                        </div>

                        <Button
                            variant="outline"
                            className="w-full mt-4"
                            size="sm"
                            onClick={() => setShowAllCreators(!showAllCreators)}
                        >
                            {showAllCreators
                                ? t.profile.show_less
                                : t.profile.show_more_creators}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};