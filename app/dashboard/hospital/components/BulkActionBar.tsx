"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Archive, CheckSquare, ChevronDown, Mail, MailCheck, Square, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';

interface BulkActionBarProps {
    selectedItems: number[];
    totalItems: number;
    onSelectAll: () => void;
    onDeselectAll: () => void;
    onBulkAction: (action: string, itemIds: number[]) => Promise<void>;
    actions?: BulkAction[];
}

interface BulkAction {
    id: string;
    label: string;
    icon: any;
    color: string;
    confirmMessage?: string;
}

const defaultActions: BulkAction[] = [
    {
        id: 'mark-read',
        label: 'Mark as Read',
        icon: MailCheck,
        color: 'blue',
    },
    {
        id: 'mark-unread',
        label: 'Mark as Unread',
        icon: Mail,
        color: 'gray',
    },
    {
        id: 'archive',
        label: 'Archive',
        icon: Archive,
        color: 'violet',
        confirmMessage: 'Are you sure you want to archive {count} item(s)?',
    },
    {
        id: 'assign',
        label: 'Assign To',
        icon: UserPlus,
        color: 'emerald',
    },
    {
        id: 'delete',
        label: 'Delete',
        icon: Trash2,
        color: 'red',
        confirmMessage: 'Are you sure you want to delete {count} item(s)? This action cannot be undone.',
    },
];

export default function BulkActionBar({
    selectedItems,
    totalItems,
    onSelectAll,
    onDeselectAll,
    onBulkAction,
    actions = defaultActions,
}: BulkActionBarProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const isAllSelected = selectedItems.length === totalItems && totalItems > 0;
    const isSomeSelected = selectedItems.length > 0 && selectedItems.length < totalItems;

    const handleSelectToggle = () => {
        if (isAllSelected) {
            onDeselectAll();
        } else {
            onSelectAll();
        }
    };

    const handleBulkAction = async (actionId: string) => {
        const action = actions.find((a) => a.id === actionId);

        if (action?.confirmMessage) {
            const message = action.confirmMessage.replace('{count}', selectedItems.length.toString());
            if (!window.confirm(message)) {
                return;
            }
        }

        setIsProcessing(true);
        try {
            await onBulkAction(actionId, selectedItems);
            setShowActions(false);
        } catch (error) {
            console.error('Bulk action failed:', error);
            alert('Failed to perform action. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (selectedItems.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 dark:border-blue-400 rounded-xl p-4 mb-4"
        >
            <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Selection Info */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleSelectToggle}
                        className="flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                    >
                        {isAllSelected ? (
                            <CheckSquare className="w-5 h-5" />
                        ) : isSomeSelected ? (
                            <Square className="w-5 h-5 fill-blue-500" />
                        ) : (
                            <Square className="w-5 h-5" />
                        )}
                        <span className="font-semibold">
                            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
                        </span>
                    </button>

                    {!isAllSelected && (
                        <button
                            onClick={onSelectAll}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            Select all {totalItems}
                        </button>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    {/* Quick Actions - Show first 3 */}
                    <div className="hidden md:flex items-center gap-2">
                        {actions.slice(0, 3).map((action) => (
                            <ActionButton
                                key={action.id}
                                action={action}
                                onClick={() => handleBulkAction(action.id)}
                                isProcessing={isProcessing}
                            />
                        ))}
                    </div>

                    {/* More Actions Dropdown */}
                    {actions.length > 3 && (
                        <div className="relative">
                            <button
                                onClick={() => setShowActions(!showActions)}
                                disabled={isProcessing}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300 disabled:opacity-50"
                            >
                                More Actions
                                <ChevronDown className={`w-4 h-4 transition-transform ${showActions ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {showActions && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10 overflow-hidden"
                                    >
                                        {actions.map((action) => (
                                            <button
                                                key={action.id}
                                                onClick={() => handleBulkAction(action.id)}
                                                disabled={isProcessing}
                                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left disabled:opacity-50 ${action.color === 'red' ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                                                    }`}
                                            >
                                                <action.icon className="w-4 h-4" />
                                                <span className="font-medium">{action.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Mobile Actions Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setShowActions(!showActions)}
                            disabled={isProcessing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                        >
                            Actions ({actions.length})
                        </button>
                    </div>

                    {/* Deselect All */}
                    <button
                        onClick={onDeselectAll}
                        className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
                    >
                        Deselect All
                    </button>
                </div>
            </div>

            {/* Processing Indicator */}
            {isProcessing && (
                <div className="mt-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium">Processing...</span>
                </div>
            )}
        </motion.div>
    );
}

function ActionButton({
    action,
    onClick,
    isProcessing,
}: {
    action: BulkAction;
    onClick: () => void;
    isProcessing: boolean;
}) {
    const colorClasses = {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        gray: 'bg-gray-600 hover:bg-gray-700 text-white',
        violet: 'bg-violet-600 hover:bg-violet-700 text-white',
        emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        red: 'bg-red-600 hover:bg-red-700 text-white',
    };

    return (
        <button
            onClick={onClick}
            disabled={isProcessing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 ${colorClasses[action.color as keyof typeof colorClasses] || colorClasses.blue
                }`}
        >
            <action.icon className="w-4 h-4" />
            <span className="hidden lg:inline">{action.label}</span>
        </button>
    );
}
