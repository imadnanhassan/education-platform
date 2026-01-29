import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        // Extract form data
        const admissionData = {
            studentName: formData.get('studentName') as string,
            fatherName: formData.get('fatherName') as string,
            motherName: formData.get('motherName') as string,
            class: formData.get('class') as string,
            address: formData.get('address') as string,
            schoolName: formData.get('schoolName') as string,
            mobileNumber: formData.get('mobileNumber') as string,
            course: formData.get('course') as string,
            paymentMethod: formData.get('paymentMethod') as string,
            transactionId: formData.get('transactionId') as string,
            totalFee: formData.get('totalFee') as string,
            discount: formData.get('discount') as string,
            cashPayment: formData.get('cashPayment') as string,
            duePayment: formData.get('duePayment') as string,
            photo: formData.get('photo') as File,
            submittedAt: new Date().toISOString()
        };

        // Validate required fields
        const requiredFields = [
            'studentName', 'fatherName', 'motherName', 'class', 'address', 
            'schoolName', 'mobileNumber', 'course', 'paymentMethod', 
            'transactionId', 'totalFee', 'discount', 'cashPayment', 'duePayment'
        ];

        for (const field of requiredFields) {
            if (!admissionData[field as keyof typeof admissionData]) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                );
            }
        }

        // Validate photo
        if (!admissionData.photo || admissionData.photo.size === 0) {
            return NextResponse.json(
                { error: 'Photo is required' },
                { status: 400 }
            );
        }

        // Check file size (10MB limit)
        if (admissionData.photo.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { error: 'File size must be less than 10MB' },
                { status: 400 }
            );
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(admissionData.photo.type)) {
            return NextResponse.json(
                { error: 'Only JPG, PNG, GIF, WEBP files are allowed' },
                { status: 400 }
            );
        }

        // Here you would typically:
        // 1. Save the photo to a storage service (AWS S3, Cloudinary, etc.)
        // 2. Save the admission data to a database
        // 3. Send confirmation email to the student
        // 4. Send notification to admin

        // For now, we'll just log the data and return success
        console.log('Admission Application Received:', {
            ...admissionData,
            photo: {
                name: admissionData.photo.name,
                size: admissionData.photo.size,
                type: admissionData.photo.type
            }
        });

        // Generate a unique application ID
        const applicationId = `GA${Date.now()}${Math.floor(Math.random() * 1000)}`;

        return NextResponse.json({
            success: true,
            message: 'আপনার ভর্তির আবেদন সফলভাবে জমা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
            applicationId: applicationId,
            data: {
                studentName: admissionData.studentName,
                course: admissionData.course,
                submittedAt: admissionData.submittedAt
            }
        });

    } catch (error) {
        console.error('Admission API Error:', error);
        return NextResponse.json(
            { error: 'আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Graviton Academy Admission API',
        endpoints: {
            POST: '/api/admission - Submit admission application'
        }
    });
}