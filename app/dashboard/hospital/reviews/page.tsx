"use client";

import { Award, Calendar, CheckCircle, Flag, Mail, MapPin, Star, TrendingUp, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/LoadingStates';

interface Review {
    id: number;
    userName: string;
    userEmail: string;
    origin: string;
    rating: number;
    title: string;
    comment: string;
    treatmentType: string;
    treatmentDate: string;
    isVerified: boolean;
    isApproved: boolean;
    createdAt: string;
}

interface ReviewStats {
    totalReviews: number;
    averageRating: number;
    fiveStarCount: number;
    fourStarCount: number;
    threeStarCount: number;
    twoStarCount: number;
    oneStarCount: number;
    verifiedCount: number;
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [stats, setStats] = useState<ReviewStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [filterRating, setFilterRating] = useState<number | 'all'>('all');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            // Get the auth token from session
            const sessionRes = await fetch('/api/auth/session');
            const session = await sessionRes.json();
            const token = session?.accessToken;

            if (!token) {
                console.error('No auth token available');
                setLoading(false);
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/hospitals/me/reviews`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                const data = await response.json();
                // Handle both array and object responses
                if (Array.isArray(data)) {
                    setReviews(data);
                    // Calculate stats from array
                    const totalReviews = data.length;
                    const averageRating = totalReviews > 0
                        ? data.reduce((sum: number, r: Review) => sum + r.rating, 0) / totalReviews
                        : 0;
                    const fiveStarCount = data.filter((r: Review) => r.rating === 5).length;
                    const fourStarCount = data.filter((r: Review) => r.rating === 4).length;
                    const threeStarCount = data.filter((r: Review) => r.rating === 3).length;
                    const twoStarCount = data.filter((r: Review) => r.rating === 2).length;
                    const oneStarCount = data.filter((r: Review) => r.rating === 1).length;
                    const verifiedCount = data.filter((r: Review) => r.isVerified).length;

                    setStats({
                        totalReviews,
                        averageRating,
                        fiveStarCount,
                        fourStarCount,
                        threeStarCount,
                        twoStarCount,
                        oneStarCount,
                        verifiedCount
                    });
                } else if (data.reviews) {
                    setReviews(data.reviews);
                    setStats(data.stats);
                }
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredReviews = filterRating === 'all'
        ? reviews
        : reviews.filter(r => r.rating === filterRating);

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return 'text-green-600 bg-green-50';
        if (rating >= 3.5) return 'text-blue-600 bg-blue-50';
        if (rating >= 2.5) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    const getPercentage = (count: number) => {
        if (!stats || stats.totalReviews === 0) return 0;
        return Math.round((count / stats.totalReviews) * 100);
    };

    if (loading) {
        return <LoadingSpinner message="Loading reviews..." />;
    }


    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Reviews</h1>
                <p className="text-gray-600">Manage and monitor your hospital's patient feedback</p>
            </div>

            {/* Stats Overview */}
            {stats && (
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-gray-600 text-sm font-medium">Total Reviews</div>
                            <Star className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stats.totalReviews}</div>
                    </div>

                    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100`}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-gray-600 text-sm font-medium">Average Rating</div>
                            <TrendingUp className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-3xl font-bold text-gray-800">{Number(stats.averageRating || 0).toFixed(1)}</div>
                            <div className="flex items-center text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < Math.round(Number(stats.averageRating || 0)) ? 'fill-current' : ''}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-gray-600 text-sm font-medium">Verified Reviews</div>
                            <CheckCircle className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stats.verifiedCount}</div>
                        <div className="text-sm text-gray-500 mt-1">{getPercentage(stats.verifiedCount)}% of total</div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-gray-600 text-sm font-medium">5-Star Reviews</div>
                            <Award className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stats.fiveStarCount}</div>
                        <div className="text-sm text-gray-500 mt-1">{getPercentage(stats.fiveStarCount)}% of total</div>
                    </div>
                </div>
            )}

            {/* Rating Distribution */}
            {stats && stats.totalReviews > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h2>
                    <div className="space-y-3">
                        {[
                            { stars: 5, count: stats.fiveStarCount },
                            { stars: 4, count: stats.fourStarCount },
                            { stars: 3, count: stats.threeStarCount },
                            { stars: 2, count: stats.twoStarCount },
                            { stars: 1, count: stats.oneStarCount },
                        ].map(({ stars, count }) => (
                            <div key={stars} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-20">
                                    <span className="text-sm font-medium text-gray-700">{stars}</span>
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                </div>
                                <div className="flex-1">
                                    <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-yellow-500 h-full rounded-full transition-all"
                                            style={{ width: `${getPercentage(count)}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600 w-16 text-right">{count} ({getPercentage(count)}%)</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
                    {['all', 5, 4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => setFilterRating(rating as number | 'all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterRating === rating
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {rating === 'all' ? 'All Reviews' : `${rating} Star`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
                        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No reviews found</h3>
                        <p className="text-gray-600">
                            {filterRating === 'all'
                                ? 'Your hospital hasn\'t received any reviews yet.'
                                : `No ${filterRating}-star reviews found.`}
                        </p>
                    </div>
                ) : (
                    filteredReviews.map((review) => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                        {review.userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-800">{review.userName}</h3>
                                            {review.isVerified && (
                                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Verified Patient
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            {review.origin && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" />
                                                    {review.origin}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold ${getRatingColor(review.rating)}`}>
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{review.rating}.0</span>
                                </div>
                            </div>

                            {/* Review Content */}
                            {review.title && (
                                <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                            )}
                            <p className="text-gray-600 leading-relaxed mb-4">{review.comment}</p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    {review.treatmentType && (
                                        <span className="flex items-center gap-1">
                                            <User className="w-3 h-3" />
                                            Treatment: {review.treatmentType}
                                        </span>
                                    )}
                                    {review.userEmail && (
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            {review.userEmail}
                                        </span>
                                    )}
                                </div>

                                <button className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
                                    <Flag className="w-4 h-4" />
                                    Report
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
