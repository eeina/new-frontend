import React from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Avatar } from "../../../components/ui/avatar";
import { Target, Edit3, Settings, Check, Calendar, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hook";

interface ProfileHeaderProps {
    isRTL: boolean;
    language: string;
    t: any;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isRTL, language, t }) => {
    const user = useAppSelector((state) => state.auth.user);

    // Generate localized path
    const getLocalizedPath = (path: string) => {
        return language === "ar" ? `/ar${path === "/" ? "" : path}` : path;
    };

    return (
        <>
            {/* Cover Image and Profile Header */}
            <div className="relative bg-gradient-to-r from-[#22ae4b] to-[#1c9a40] rounded-2xl overflow-hidden mb-8 shadow-lg">
                {/* Cover Image */}
                <div className="relative h-48 sm:h-56">
                    <img
                        src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop"
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Profile Picture - RTL positioned */}
                    <div
                        className={`absolute inset-y-0 ${
                            isRTL ? "right-6 sm:right-8" : "left-6 sm:left-8"
                        } flex items-center`}
                    >
                        <div className="relative">
                            <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white shadow-2xl">
                                <img
                                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                                    alt="Adam Ahmed"
                                    className="w-full h-full object-cover"
                                />
                            </Avatar>
                            {/* Verification Badge */}
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div
                        className={`absolute top-4 ${isRTL ? "right-4" : "right-4"} flex gap-2`}
                    >
                        <Link to={getLocalizedPath("/goals")}>
                            <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 px-3 py-2 h-10 shadow-lg">
                                <Target className={`w-4 h-4 ${isRTL ? "ml-2 mr-0" : "mr-2"}`} />
                                <span className="hidden sm:inline">
                                    {language === "ar" ? "إدارة الأهداف" : "Manage Goals"}
                                </span>
                            </Button>
                        </Link>
                        <Link to={getLocalizedPath("/edit-profile")}>
                            <Button
                                variant="outline"
                                className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 border-white px-3 py-2 h-10 shadow-lg"
                            >
                                <Edit3 className={`w-4 h-4 ${isRTL ? "ml-2 mr-0" : "mr-2"}`} />
                                <span className="hidden sm:inline">{t.profile.edit}</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* User Info Card */}
            <Card className="mb-8 bg-white shadow-lg border-0">
                <CardContent className="p-6 sm:p-8">
                    <div
                        className={`flex flex-col sm:flex-row sm:items-center gap-6 ${
                            isRTL ? "sm:flex-row-reverse" : ""
                        }`}
                    >
                        <div className={`flex-1 ${isRTL ? "order-2" : ""}`}>
                            <div
                                className={`flex items-center gap-3 mb-4 ${
                                    isRTL ? "flex-row-reverse" : ""
                                }`}
                            >
                                <h1
                                    className={`text-3xl sm:text-4xl font-bold text-gray-900 ${
                                        isRTL ? "text-right" : "text-left"
                                    }`}
                                >
                                    {user?.firstName + " " + user?.lastName || "Adam Ahmed"}
                                </h1>
                                <Badge className="bg-[#22ae4b] text-white px-3 py-1 text-sm font-medium">
                                    {t.profile.premium}
                                </Badge>
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <p
                                className={`text-base sm:text-lg text-gray-600 mb-6 ${
                                    isRTL ? "text-right" : "text-left"
                                }`}
                            >
                                {t.profile.food_enthusiast}
                            </p>
                            <div
                                className={`flex flex-wrap items-center gap-4 text-sm text-gray-500 ${
                                    isRTL ? "flex-row-reverse" : ""
                                }`}
                            >
                                <div
                                    className={`flex items-center gap-2 ${
                                        isRTL ? "flex-row-reverse" : ""
                                    }`}
                                >
                                    <Calendar className="w-4 h-4 text-[#22ae4b]" />
                                    <span>
                                        {t.profile.member_since}{" "}
                                        {language === "ar" ? "يناير 2023" : "January 2023"}
                                    </span>
                                </div>
                                <div
                                    className={`flex items-center gap-2 ${
                                        isRTL ? "flex-row-reverse" : ""
                                    }`}
                                >
                                    <MapPin className="w-4 h-4 text-[#22ae4b]" />
                                    <span>
                                        {language === "ar"
                                            ? "نيويورك، الولايات المتحدة"
                                            : "New York, USA"}
                                    </span>
                                </div>
                                <div
                                    className={`flex items-center gap-2 ${
                                        isRTL ? "flex-row-reverse" : ""
                                    }`}
                                >
                                    <Globe className="w-4 h-4 text-[#22ae4b]" />
                                    <span>adamahmed.com</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`flex flex-col gap-3 ${
                                isRTL ? "sm:mr-auto" : "sm:mr-auto"
                            }`}
                        >
                            <Link to={getLocalizedPath("/account-settings")}>
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto px-6 py-3 text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <Settings
                                        className={`w-4 h-4 ${isRTL ? "ml-2 mr-0" : "mr-2"}`}
                                    />
                                    {t.profile.account_settings}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8 px-4 sm:px-0">
                <Card>
                    <CardContent className="p-3 sm:p-6 text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#22ae4b] mb-1 sm:mb-2">
                            12
                        </div>
                        <div className="text-xs sm:text-base text-gray-600">
                            {t.profile.recipes}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-3 sm:p-6 text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#22ae4b] mb-1 sm:mb-2">
                            1,247
                        </div>
                        <div className="text-xs sm:text-base text-gray-600">
                            {t.profile.followers}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-3 sm:p-6 text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#22ae4b] mb-1 sm:mb-2">
                            89
                        </div>
                        <div className="text-xs sm:text-base text-gray-600">
                            {t.profile.following}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-3 sm:p-6 text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#22ae4b] mb-1 sm:mb-2">
                            2,156
                        </div>
                        <div className="text-xs sm:text-base text-gray-600">
                            {t.profile.likes}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};