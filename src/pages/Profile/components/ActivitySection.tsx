import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Avatar } from "../../../components/ui/avatar";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

interface Post {
    id: number;
    content: string;
    image: string;
    likes: number;
    comments: number;
    shares: number;
    timestamp: string;
    recipeLink: string;
}

interface ActivitySectionProps {
    userPosts: Post[];
    showAllPosts: boolean;
    setShowAllPosts: (show: boolean) => void;
    newComment: string;
    setNewComment: (comment: string) => void;
    handleComment: (e: React.FormEvent) => void;
    t: any;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
    userPosts,
    showAllPosts,
    setShowAllPosts,
    newComment,
    setNewComment,
    handleComment,
    t,
}) => {
    return (
        <div className="px-4 sm:px-0">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {t.profile.latest_activity}
                </h2>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllPosts(!showAllPosts)}
                    className="text-xs sm:text-sm"
                >
                    {showAllPosts
                        ? t.profile.show_less
                        : `${t.profile.showing_posts} (${userPosts.length})`}
                </Button>
            </div>

            <div className="space-y-6">
                {(showAllPosts ? userPosts : userPosts.slice(0, 2)).map((post) => (
                    <Card
                        key={post.id}
                        className="bg-white rounded-2xl border-0 shadow-sm"
                    >
                        <CardContent className="p-4 sm:p-6">
                            {/* Post Header */}
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                                    <img
                                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                                        alt="Adam Ahmed"
                                        className="w-full h-full object-cover"
                                    />
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-sm sm:text-base text-black">
                                        Adam Ahmed
                                    </h3>
                                    <div className="font-medium text-[#7a7a7a] text-xs sm:text-sm">
                                        {post.timestamp}
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <div className="flex items-center gap-1">
                                        <div className="w-1 h-1 bg-current rounded-full" />
                                        <div className="w-1 h-1 bg-current rounded-full" />
                                        <div className="w-1 h-1 bg-current rounded-full" />
                                    </div>
                                </Button>
                            </div>

                            {/* Post Content */}
                            <div className="mb-4 sm:mb-6">
                                <p className="font-semibold text-black text-base sm:text-lg mb-3 sm:mb-4">
                                    {post.content}
                                </p>
                                <Link
                                    to={post.recipeLink}
                                    className="block rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform"
                                >
                                    <img
                                        className="w-full h-48 sm:h-64 md:h-80 object-cover"
                                        alt={post.content}
                                        src={post.image}
                                    />
                                </Link>
                            </div>

                            {/* Interactive Actions */}
                            <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-2 text-gray-600 hover:text-red-500"
                                >
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-sm">{post.likes}</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
                                >
                                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                    <span className="text-sm">{post.comments}</span>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center gap-2 text-gray-600 hover:text-green-500"
                                >
                                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-auto text-gray-600 hover:text-yellow-500"
                                >
                                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </div>

                            {/* Comment Input */}
                            <form
                                onSubmit={handleComment}
                                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-full border border-gray-300 bg-gray-50"
                            >
                                <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                                    <img
                                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                                        alt="Your avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </Avatar>
                                <Input
                                    placeholder={t.profile.add_comment}
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="flex-1 border-0 bg-transparent text-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-sm sm:text-base"
                                />
                                {newComment.trim() && (
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="bg-[#22ae4b] hover:bg-[#1c9a40] text-white rounded-full px-3 sm:px-4 text-xs sm:text-sm"
                                    >
                                        {t.profile.post}
                                    </Button>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};