import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs/promises';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// Directory for uploaded images
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
    try {
        await fs.access(UPLOAD_DIR);
    } catch {
        await fs.mkdir(UPLOAD_DIR, { recursive: true });
    }
}

// POST - Upload an image
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await ensureUploadDir();

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const imageKey = formData.get('imageKey') as string;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { success: false, error: 'File too large. Maximum size is 5MB' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const ext = file.name.split('.').pop();
        const timestamp = Date.now();
        const filename = `${imageKey || 'image'}_${timestamp}.${ext}`;
        const filepath = path.join(UPLOAD_DIR, filename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await fs.writeFile(filepath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url: publicUrl,
                filename,
            },
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload image' },
            { status: 500 }
        );
    }
}

// DELETE - Remove an uploaded image
export async function DELETE(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { filename } = await request.json();

        if (!filename) {
            return NextResponse.json(
                { success: false, error: 'No filename provided' },
                { status: 400 }
            );
        }

        // Security: Only allow deleting from uploads directory
        const filepath = path.join(UPLOAD_DIR, path.basename(filename));

        try {
            await fs.unlink(filepath);
            return NextResponse.json({
                success: true,
                message: 'Image deleted successfully',
            });
        } catch {
            return NextResponse.json(
                { success: false, error: 'File not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete image' },
            { status: 500 }
        );
    }
}
