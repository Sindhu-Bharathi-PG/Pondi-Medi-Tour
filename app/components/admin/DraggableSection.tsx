"use client";

import React, { ReactNode } from 'react';

interface DraggableSectionProps {
    sectionId: string;
    sectionTitle: string;
    index: number;
    isEnabled: boolean;
    isEditing: boolean;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, index: number) => void;
    onToggle: () => void;
    children: ReactNode;
}

export default function DraggableSection({
    sectionId,
    sectionTitle,
    index,
    isEnabled,
    isEditing,
    onDragStart,
    onDragOver,
    onDrop,
    onToggle,
    children,
}: DraggableSectionProps) {
    return (
        <div
            key={sectionId}
            draggable={isEditing}
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
            className={`relative transition-opacity ${
                isEditing ? 'cursor-grab active:cursor-grabbing border-2 border-dashed border-gray-400 rounded-lg p-4' : ''
            } ${!isEnabled && isEditing ? 'opacity-50' : 'opacity-100'}`}
        >
            {isEditing && (
                <div className="mb-4 flex items-center gap-3 bg-gray-100 rounded p-3">
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{sectionTitle}</h4>
                        <p className="text-sm text-gray-600">Drag to reorder</p>
                    </div>
                    <button
                        onClick={onToggle}
                        className={`px-3 py-1 rounded text-sm font-medium transition ${
                            isEnabled
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gray-400 text-white hover:bg-gray-500'
                        }`}
                    >
                        {isEnabled ? 'Enabled' : 'Disabled'}
                    </button>
                </div>
            )}
            <div className={isEditing && !isEnabled ? 'opacity-60' : ''}>{children}</div>
        </div>
    );
}
