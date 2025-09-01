import React from "react";

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

interface ModalsSectionProps {
    showGoalsModal: boolean;
    showProgressModal: boolean;
    showEditGoalModal: boolean;
    showAddGoalModal: boolean;
    selectedGoal: Goal | null;
    progressValue: string;
    progressNote: string;
    editingGoal: Goal | null;
    userGoals: Goal[];
    availableGoals: any[];
    language: string;
    t: any;
    
    // Callback functions
    setShowGoalsModal: (show: boolean) => void;
    setShowProgressModal: (show: boolean) => void;
    setShowEditGoalModal: (show: boolean) => void;
    setShowAddGoalModal: (show: boolean) => void;
    setSelectedGoal: (goal: Goal | null) => void;
    setProgressValue: (value: string) => void;
    setProgressNote: (note: string) => void;
    setEditingGoal: (goal: Goal | null) => void;
    toggleGoal: (goalId: string) => void;
    removeGoal: (goalId: string) => void;
    addGoal: (goalData: any) => void;
    addProgress: () => void;
}

export const ModalsSection: React.FC<ModalsSectionProps> = ({
    showGoalsModal,
    showProgressModal,
    showEditGoalModal,
    showAddGoalModal,
    selectedGoal,
    progressValue,
    progressNote,
    editingGoal,
    userGoals,
    availableGoals,
    language,
    t,
    setShowGoalsModal,
    setShowProgressModal,
    setShowEditGoalModal,
    setShowAddGoalModal,
    setSelectedGoal,
    setProgressValue,
    setProgressNote,
    setEditingGoal,
    toggleGoal,
    removeGoal,
    addGoal,
    addProgress,
}) => {
    // Goals Modal
    const GoalsModal = () => (
        showGoalsModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {language === "ar" ? "إدارة الأهداف" : "Manage Goals"}
                            </h2>
                            <button
                                onClick={() => setShowGoalsModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userGoals.map((goal) => (
                                <div key={goal.id} className="border rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <goal.icon className={`w-5 h-5 ${goal.color}`} />
                                            <span className="font-medium">{goal.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleGoal(goal.id)}
                                                className={`w-8 h-4 rounded-full relative transition-colors ${
                                                    goal.active ? "bg-green-500" : "bg-gray-300"
                                                }`}
                                            >
                                                <div
                                                    className={`absolute w-3 h-3 bg-white rounded-full transition-transform ${
                                                        goal.active ? "translate-x-4" : "translate-x-0.5"
                                                    }`}
                                                />
                                            </button>
                                            <button
                                                onClick={() => removeGoal(goal.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                                    <div className="text-sm font-medium text-green-600">
                                        {goal.progress}% {language === "ar" ? "مكتمل" : "Complete"}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowAddGoalModal(true)}
                            className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            {language === "ar" ? "إضافة هدف جديد" : "Add New Goal"}
                        </button>
                    </div>
                </div>
            </div>
        )
    );

    // Progress Modal
    const ProgressModal = () => (
        showProgressModal && selectedGoal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                {language === "ar" ? "إضافة تقدم" : "Add Progress"}
                            </h2>
                            <button
                                onClick={() => setShowProgressModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="mb-4">
                            <h3 className="font-medium mb-2">{selectedGoal.title}</h3>
                            <p className="text-sm text-gray-600">
                                {selectedGoal.currentValue} {selectedGoal.unit} /{" "}
                                {selectedGoal.targetValue} {selectedGoal.unit}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {language === "ar" ? "القيمة الحالية" : "Current Value"}
                                </label>
                                <input
                                    type="number"
                                    value={progressValue}
                                    onChange={(e) => setProgressValue(e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    placeholder={`${selectedGoal.currentValue} ${selectedGoal.unit}`}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {language === "ar" ? "ملاحظة (اختياري)" : "Note (Optional)"}
                                </label>
                                <textarea
                                    value={progressNote}
                                    onChange={(e) => setProgressNote(e.target.value)}
                                    className="w-full border rounded-lg px-3 py-2"
                                    rows={3}
                                    placeholder={language === "ar" ? "أضف ملاحظة..." : "Add a note..."}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowProgressModal(false)}
                                    className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    {language === "ar" ? "إلغاء" : "Cancel"}
                                </button>
                                <button
                                    onClick={addProgress}
                                    className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    {language === "ar" ? "حفظ التقدم" : "Save Progress"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    // Edit Goal Modal
    const EditGoalModal = () => (
        showEditGoalModal && editingGoal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-md w-full">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                {language === "ar" ? "تعديل الهدف" : "Edit Goal"}
                            </h2>
                            <button
                                onClick={() => setShowEditGoalModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {language === "ar" ? "العنوان" : "Title"}
                                </label>
                                <input
                                    type="text"
                                    value={editingGoal.title}
                                    onChange={(e) =>
                                        setEditingGoal({ ...editingGoal, title: e.target.value })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    {language === "ar" ? "الوصف" : "Description"}
                                </label>
                                <textarea
                                    value={editingGoal.description}
                                    onChange={(e) =>
                                        setEditingGoal({ ...editingGoal, description: e.target.value })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                    rows={3}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowEditGoalModal(false)}
                                    className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    {language === "ar" ? "إلغاء" : "Cancel"}
                                </button>
                                <button
                                    onClick={() => {
                                        // Handle save logic here
                                        setShowEditGoalModal(false);
                                    }}
                                    className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    {language === "ar" ? "حفظ" : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    // Add Goal Modal
    const AddGoalModal = () => (
        showAddGoalModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">
                                {language === "ar" ? "إضافة هدف جديد" : "Add New Goal"}
                            </h2>
                            <button
                                onClick={() => setShowAddGoalModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableGoals.map((goal) => (
                                <button
                                    key={goal.id}
                                    onClick={() => addGoal(goal)}
                                    className="border rounded-lg p-4 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${goal.bgColor}`}>
                                            <goal.icon className={`w-5 h-5 ${goal.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{goal.title}</h3>
                                            <p className="text-sm text-gray-600">{goal.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    return (
        <>
            <GoalsModal />
            <ProgressModal />
            <EditGoalModal />
            <AddGoalModal />
        </>
    );
};