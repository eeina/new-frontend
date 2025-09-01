import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { AdSection } from "../Home/sections/AdSection";
import { Header } from "../../components/Header";
import { ProfileHeader } from "./components/ProfileHeader";
import { GoalsSection } from "./components/GoalsSection";
import { ActivitySection } from "./components/ActivitySection";
import { SidebarSection } from "./components/SidebarSection";
import { ModalsSection } from "./components/ModalsSection";
import { useAppSelector } from "../../hooks/hook";
import {
    TrendingDown,
    Dumbbell,
    Heart,
    Scale,
    Zap,
    Apple,
    Clock,
    ChefHat,
} from "lucide-react";

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

export const Profile = (): JSX.Element => {
    const { t, isRTL, language } = useLanguage();
    const [showAllPosts, setShowAllPosts] = useState(false);
    const [showAllCreators, setShowAllCreators] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [newRecipeUrl, setNewRecipeUrl] = useState("");
    const [showGoalsModal, setShowGoalsModal] = useState(false);
    const [showAddGoalModal, setShowAddGoalModal] = useState(false);
    const [showEditGoalModal, setShowEditGoalModal] = useState(false);
    const [showProgressModal, setShowProgressModal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [progressValue, setProgressValue] = useState("");
    const [progressNote, setProgressNote] = useState("");
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
    const user = useAppSelector((state) => state.auth.user);

    const [userGoals, setUserGoals] = useState<Goal[]>([
        {
            id: "lose-weight",
            title: language === "ar" ? "فقدان الوزن" : "Lose Weight",
            description:
                language === "ar"
                    ? "وصفات منخفضة السعرات وخطط وجبات"
                    : "Low-calorie recipes and meal plans",
            progress: 65,
            target: language === "ar" ? "فقدان 5 كيلو" : "Lose 5kg",
            currentValue: 78,
            targetValue: 75,
            unit: "kg",
            color: "text-red-600",
            bgColor: "bg-red-50",
            progressColor: "bg-red-500",
            icon: TrendingDown,
            active: true,
            startDate: "2024-01-01",
            targetDate: "2024-06-01",
            category: "weight",
            progressHistory: [
                { date: "2024-01-01", value: 80, note: "Starting weight" },
                { date: "2024-01-15", value: 79.2, note: "Good progress!" },
                { date: "2024-01-30", value: 78.5 },
                { date: "2024-02-15", value: 78, note: "Halfway there!" },
            ],
            milestones: [
                { value: 79, label: "1kg lost", achieved: true, achievedDate: "2024-01-15" },
                { value: 78, label: "2kg lost", achieved: true, achievedDate: "2024-02-15" },
                { value: 77, label: "3kg lost", achieved: false },
                { value: 76, label: "4kg lost", achieved: false },
                { value: 75, label: "Target reached!", achieved: false },
            ],
        },
        {
            id: "build-muscle",
            title: language === "ar" ? "بناء العضلات" : "Build Muscle",
            description:
                language === "ar"
                    ? "وصفات عالية البروتين لنمو العضلات"
                    : "High-protein recipes for muscle growth",
            progress: 40,
            target: language === "ar" ? "زيادة 3 كيلو عضل" : "Gain 3kg muscle",
            currentValue: 65,
            targetValue: 68,
            unit: "kg",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            progressColor: "bg-purple-500",
            icon: Dumbbell,
            active: true,
            startDate: "2024-01-01",
            targetDate: "2024-08-01",
            category: "fitness",
            progressHistory: [
                { date: "2024-01-01", value: 65, note: "Starting muscle mass" },
                { date: "2024-01-30", value: 65.5 },
                { date: "2024-02-15", value: 66.2, note: "Great gains!" },
            ],
            milestones: [
                { value: 66, label: "1kg gained", achieved: true, achievedDate: "2024-02-15" },
                { value: 67, label: "2kg gained", achieved: false },
                { value: 68, label: "Target reached!", achieved: false },
            ],
        },
        {
            id: "improve-health",
            title: language === "ar" ? "تحسين الصحة العامة" : "Improve Overall Health",
            description:
                language === "ar"
                    ? "وصفات غنية بالعناصر الغذائية"
                    : "Nutrient-rich recipes for wellness",
            progress: 80,
            target: language === "ar" ? "نمط حياة صحي" : "Healthy lifestyle",
            currentValue: 8,
            targetValue: 10,
            unit: "healthy meals/week",
            color: "text-green-600",
            bgColor: "bg-green-50",
            progressColor: "bg-green-500",
            icon: Heart,
            active: true,
            startDate: "2024-01-01",
            targetDate: "2024-12-31",
            category: "health",
            progressHistory: [
                { date: "2024-01-01", value: 5, note: "Starting healthy eating" },
                { date: "2024-01-15", value: 6 },
                { date: "2024-01-30", value: 7 },
                { date: "2024-02-15", value: 8, note: "Feeling great!" },
            ],
            milestones: [
                { value: 6, label: "6 meals/week", achieved: true, achievedDate: "2024-01-15" },
                { value: 8, label: "8 meals/week", achieved: true, achievedDate: "2024-02-15" },
                { value: 10, label: "Target reached!", achieved: false },
            ],
        },
    ]);

    const availableGoals = [
        {
            id: "maintain-weight",
            title: language === "ar" ? "الحفاظ على الوزن" : "Maintain Weight",
            description:
                language === "ar"
                    ? "وصفات متوازنة للحفاظ على الوزن"
                    : "Balanced recipes for weight maintenance",
            icon: Scale,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            category: "weight" as const,
            defaultTarget: { current: 70, target: 70, unit: "kg" },
        },
        {
            id: "increase-energy",
            title: language === "ar" ? "زيادة الطاقة" : "Increase Energy",
            description: language === "ar" ? "وصفات معززة للطاقة" : "Energy-boosting recipes",
            icon: Zap,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
            category: "health" as const,
            defaultTarget: { current: 5, target: 8, unit: "energy level (1-10)" },
        },
        {
            id: "better-digestion",
            title: language === "ar" ? "تحسين الهضم" : "Better Digestion",
            description: language === "ar" ? "وصفات صديقة للمعدة" : "Gut-friendly recipes",
            icon: Apple,
            color: "text-green-600",
            bgColor: "bg-green-50",
            category: "health" as const,
            defaultTarget: { current: 3, target: 7, unit: "gut-friendly meals/week" },
        },
        {
            id: "save-time",
            title: language === "ar" ? "توفير وقت الطبخ" : "Save Time Cooking",
            description: language === "ar" ? "وصفات سريعة وسهلة" : "Quick and easy recipes",
            icon: Clock,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            category: "lifestyle" as const,
            defaultTarget: { current: 2, target: 5, unit: "quick meals/week" },
        },
        {
            id: "learn-cooking",
            title: language === "ar" ? "تعلم مهارات طبخ جديدة" : "Learn New Cooking Skills",
            description:
                language === "ar" ? "وصفات مفصلة خطوة بخطوة" : "Step-by-step detailed recipes",
            icon: ChefHat,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            category: "lifestyle" as const,
            defaultTarget: { current: 1, target: 3, unit: "new techniques/month" },
        },
    ];

    // Sample posts data
    const userPosts = [
        {
            id: 1,
            content:
                "Just made this incredible homemade pasta! The secret is in the fresh herbs 🌿",
            image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
            likes: 24,
            comments: 8,
            shares: 3,
            timestamp: "30 mins ago",
            recipeLink: "/recipe/1",
        },
        {
            id: 2,
            content: "Perfect weekend brunch! These fluffy pancakes are absolutely divine 🥞✨",
            image: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
            likes: 42,
            comments: 15,
            shares: 7,
            timestamp: "2 hours ago",
            recipeLink: "/recipe/4",
        },
    ];

    // Top creators data
    const creators = [
        {
            name: "Sarah Johnson",
            avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
            followers: 1200,
            specialty: "Italian Cuisine",
            verified: true,
        },
        {
            name: "Mike Chen",
            avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
            followers: 890,
            specialty: "Asian Fusion",
            verified: false,
        },
        {
            name: "Emma Davis",
            avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
            followers: 2100,
            specialty: "Healthy Meals",
            verified: true,
        },
    ];

    // User profile data
    const userProfile = {
        name: user?.firstName + " " + user?.lastName || "Adam Ahmed",
        username: "@adamahmed",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
        coverImage:
            "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        location: "New York, USA",
        website: "https://adamahmed.com",
        followers: 7,
        following: 10,
        recipesCreated: 12,
        totalLikes: 1247,
        memberSince: "January 2023",
        accountType: "Premium",
        verified: true,
        profileCompletion: 85,
    };

    const toggleGoal = (goalId: string) => {
        setUserGoals((prev) =>
            prev.map((goal) => (goal.id === goalId ? { ...goal, active: !goal.active } : goal))
        );
    };

    const removeGoal = (goalId: string) => {
        setUserGoals((prev) => prev.filter((goal) => goal.id !== goalId));
    };

    const addGoal = (goalData: any) => {
        const newGoal: Goal = {
            ...goalData,
            progress: 0,
            currentValue: goalData.defaultTarget.current,
            targetValue: goalData.defaultTarget.target,
            unit: goalData.defaultTarget.unit,
            target: `${goalData.defaultTarget.target} ${goalData.defaultTarget.unit}`,
            progressColor: goalData.color.replace("text-", "bg-").replace("-600", "-500"),
            active: true,
            startDate: new Date().toISOString().split("T")[0],
            targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0], // 6 months from now
            progressHistory: [
                {
                    date: new Date().toISOString().split("T")[0],
                    value: goalData.defaultTarget.current,
                    note: "Goal started",
                },
            ],
            milestones: generateMilestones(
                goalData.defaultTarget.current,
                goalData.defaultTarget.target,
                goalData.defaultTarget.unit
            ),
        };
        setUserGoals((prev) => [...prev, newGoal]);
        setShowAddGoalModal(false);
    };

    const generateMilestones = (current: number, target: number, unit: string) => {
        const milestones = [];
        const diff = target - current;
        const steps = Math.abs(diff) > 10 ? 5 : Math.max(2, Math.abs(diff));

        for (let i = 1; i <= steps; i++) {
            const value = current + (diff * i) / steps;
            milestones.push({
                value: Math.round(value * 10) / 10,
                label: i === steps ? "Target reached!" : `Milestone ${i}`,
                achieved: false,
            });
        }
        return milestones;
    };

    const addProgress = () => {
        if (!selectedGoal || !progressValue) return;

        const newValue = parseFloat(progressValue);
        const newProgress = {
            date: new Date().toISOString().split("T")[0],
            value: newValue,
            note: progressNote.trim() || undefined,
        };

        // Calculate new progress percentage
        const totalChange = selectedGoal.targetValue - selectedGoal.progressHistory[0].value;
        const currentChange = newValue - selectedGoal.progressHistory[0].value;
        const newProgressPercentage = Math.max(
            0,
            Math.min(100, (currentChange / totalChange) * 100)
        );

        // Update milestones
        const updatedMilestones = selectedGoal.milestones.map((milestone) => {
            if (!milestone.achieved) {
                const achieved = selectedGoal.id.includes("lose")
                    ? newValue <= milestone.value
                    : newValue >= milestone.value;

                if (achieved && !milestone.achieved) {
                    return { ...milestone, achieved: true, achievedDate: newProgress.date };
                }
            }
            return milestone;
        });

        setUserGoals((prev) =>
            prev.map((goal) =>
                goal.id === selectedGoal.id
                    ? {
                          ...goal,
                          currentValue: newValue,
                          progress: Math.round(newProgressPercentage),
                          progressHistory: [...goal.progressHistory, newProgress],
                          milestones: updatedMilestones,
                      }
                    : goal
            )
        );

        setShowProgressModal(false);
        setSelectedGoal(null);
        setProgressValue("");
        setProgressNote("");
    };

    const handleComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            // Handle comment submission logic here
            setNewComment("");
        }
    };

    const handleImportRecipe = () => {
        if (newRecipeUrl.trim()) {
            // Handle recipe import logic here
            setNewRecipeUrl("");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
                {/* Profile Header Section */}
                <ProfileHeader isRTL={isRTL} language={language} t={t} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
                    {/* Left Column - Goals and Posts */}
                    <div className="lg:col-span-8">
                        {/* Goals Section */}
                        <GoalsSection userGoals={userGoals} language={language} t={t} />

                        {/* Posts Section */}
                        <ActivitySection
                            userPosts={userPosts}
                            showAllPosts={showAllPosts}
                            setShowAllPosts={setShowAllPosts}
                            newComment={newComment}
                            setNewComment={setNewComment}
                            handleComment={handleComment}
                            t={t}
                        />
                    </div>

                    {/* Right Sidebar */}
                    <SidebarSection
                        userGoals={userGoals}
                        creators={creators}
                        userProfile={userProfile}
                        showAllCreators={showAllCreators}
                        setShowAllCreators={setShowAllCreators}
                        newRecipeUrl={newRecipeUrl}
                        setNewRecipeUrl={setNewRecipeUrl}
                        handleImportRecipe={handleImportRecipe}
                        setShowGoalsModal={setShowGoalsModal}
                        language={language}
                        t={t}
                    />
                </div>
            </div>

            {/* Modals Section */}
            <ModalsSection
                showGoalsModal={showGoalsModal}
                showProgressModal={showProgressModal}
                showEditGoalModal={showEditGoalModal}
                showAddGoalModal={showAddGoalModal}
                selectedGoal={selectedGoal}
                progressValue={progressValue}
                progressNote={progressNote}
                editingGoal={editingGoal}
                userGoals={userGoals}
                availableGoals={availableGoals}
                language={language}
                t={t}
                setShowGoalsModal={setShowGoalsModal}
                setShowProgressModal={setShowProgressModal}
                setShowEditGoalModal={setShowEditGoalModal}
                setShowAddGoalModal={setShowAddGoalModal}
                setSelectedGoal={setSelectedGoal}
                setProgressValue={setProgressValue}
                setProgressNote={setProgressNote}
                setEditingGoal={setEditingGoal}
                toggleGoal={toggleGoal}
                removeGoal={removeGoal}
                addGoal={addGoal}
                addProgress={addProgress}
            />

            <AdSection />
        </div>
    );
};