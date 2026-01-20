import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs/promises';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// File-based storage for site images (simple solution without database changes)
const IMAGES_CONFIG_PATH = path.join(process.cwd(), 'data', 'site-images.json');

// Default images configuration
const defaultImages = {
    // Hero Images
    heroWellness: {
        label: "Wellness Hero",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920",
        category: "hero",
    },
    heroYoga: {
        label: "Yoga Hero",
        url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1920",
        category: "hero",
    },
    heroSpa: {
        label: "Spa Hero",
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920",
        category: "hero",
    },
    heroAuroville: {
        label: "Auroville Hero",
        url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1920",
        category: "hero",
    },

    // Attraction Images
    frenchQuarter: {
        label: "French Quarter",
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
        category: "attractions",
    },
    matrimandir: {
        label: "Matrimandir",
        url: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
        category: "attractions",
    },
    paradiseBeach: {
        label: "Paradise Beach",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        category: "attractions",
    },
    promenadeBeach: {
        label: "Promenade Beach",
        url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
        category: "attractions",
    },

    // Spa & Wellness
    spaRelax: {
        label: "Spa Relaxation",
        url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
        category: "wellness",
    },
    hotStone: {
        label: "Hot Stone Therapy",
        url: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800",
        category: "wellness",
    },
    massage: {
        label: "Massage",
        url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
        category: "wellness",
    },
    meditation: {
        label: "Meditation",
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
        category: "yoga",
    },
    sunriseYoga: {
        label: "Sunrise Yoga",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
        category: "yoga",
    },

    // Nature
    garden: {
        label: "Garden",
        url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        category: "nature",
    },
    sunset: {
        label: "Sunset",
        url: "https://images.unsplash.com/photo-1476673160081-cf065f0d2a86?w=800",
        category: "nature",
    },
};

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.join(process.cwd(), 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
}

// Read images from file
async function readImages() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(IMAGES_CONFIG_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        // If file doesn't exist, return defaults
        return defaultImages;
    }
}

// Write images to file
async function writeImages(images: typeof defaultImages) {
    await ensureDataDir();
    await fs.writeFile(IMAGES_CONFIG_PATH, JSON.stringify(images, null, 2));
}

// GET - Retrieve all images
export async function GET() {
    try {
        const images = await readImages();
        return NextResponse.json({
            success: true,
            data: images,
        });
    } catch (error) {
        console.error('Error reading images:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch images' },
            { status: 500 }
        );
    }
}

// PUT - Update images (admin only)
export async function PUT(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'admin') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Validate the data structure
        if (!body || typeof body !== 'object') {
            return NextResponse.json(
                { success: false, error: 'Invalid data format' },
                { status: 400 }
            );
        }

        // Merge with defaults to ensure all keys exist
        const updatedImages = { ...defaultImages, ...body };

        await writeImages(updatedImages);

        return NextResponse.json({
            success: true,
            message: 'Images updated successfully',
            data: updatedImages,
        });
    } catch (error) {
        console.error('Error updating images:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update images' },
            { status: 500 }
        );
    }
}

// POST - Reset to defaults (admin only)
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

        const { action } = await request.json();

        if (action === 'reset') {
            await writeImages(defaultImages);
            return NextResponse.json({
                success: true,
                message: 'Images reset to defaults',
                data: defaultImages,
            });
        }

        return NextResponse.json(
            { success: false, error: 'Invalid action' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Error resetting images:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to reset images' },
            { status: 500 }
        );
    }
}
