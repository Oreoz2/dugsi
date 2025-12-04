import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create tenants
    const tenant1 = await prisma.tenant.upsert({
        where: { slug: 'alnoor' },
        update: {},
        create: {
            name: 'Al-Noor Islamic Academy',
            slug: 'alnoor',
            logo: '🕌',
        },
    })

    const tenant2 = await prisma.tenant.upsert({
        where: { slug: 'madinah' },
        update: {},
        create: {
            name: 'Madinah Learning Center',
            slug: 'madinah',
            logo: '📚',
        },
    })

    console.log('✅ Created tenants:', tenant1.name, tenant2.name)

    // Create users for tenant1
    const user1 = await prisma.user.upsert({
        where: {
            tenantId_email: {
                tenantId: tenant1.id,
                email: 'admin@alnoor.com'
            }
        },
        update: {},
        create: {
            tenantId: tenant1.id,
            username: 'admin',
            email: 'admin@alnoor.com',
            password: '123456', // TODO: Hash this
            role: 'admin',
            fullName: 'Ahmed Hassan',
            isActive: true,
        },
    })

    const user2 = await prisma.user.upsert({
        where: {
            tenantId_email: {
                tenantId: tenant2.id,
                email: 'admin@madinah.com'
            }
        },
        update: {},
        create: {
            tenantId: tenant2.id,
            username: 'admin',
            email: 'admin@madinah.com',
            password: '123456', // TODO: Hash this
            role: 'admin',
            fullName: 'Fatima Ali',
            isActive: true,
        },
    })

    console.log('✅ Created users:', user1.email, user2.email)

    // Create students for tenant1
    const student1 = await prisma.student.create({
        data: {
            tenantId: tenant1.id,
            studentId: 'STU001',
            englishName: 'Fatima Al-Zahra',
            arabicName: 'فاطمة الزهراء',
            dateOfBirth: new Date('2010-03-15'),
            gender: 'Female',
            classLevel: 'Fasal 7',
            yearGroup: 'Intermediate',
            status: 'Active',
            phone: '+44 20 1234 5678',
            email: 'fatima.alzahra@parent.com',
            address: '123 Islamic Street, London, UK',
            guardianName: 'Ahmad Al-Zahra',
            guardianPhone: '+44 20 1234 5678',
            guardianEmail: 'ahmad.alzahra@email.com',
            guardianRelationship: 'Father',
            quranProgress: 15,
            attendanceRate: 96,
            outstandingFees: 0,
        },
    })

    const student2 = await prisma.student.create({
        data: {
            tenantId: tenant1.id,
            studentId: 'STU002',
            englishName: 'Omar Ibn Khattab',
            arabicName: 'عمر بن الخطاب',
            dateOfBirth: new Date('2008-07-22'),
            gender: 'Male',
            classLevel: 'Fasal 9',
            yearGroup: 'Advanced',
            status: 'Active',
            phone: '+44 20 2345 6789',
            email: 'omar.khattab@parent.com',
            address: '456 Masjid Road, Birmingham, UK',
            guardianName: 'Abdullah Ibn Khattab',
            guardianPhone: '+44 20 2345 6789',
            guardianEmail: 'abdullah.khattab@email.com',
            guardianRelationship: 'Father',
            quranProgress: 25,
            attendanceRate: 94,
            outstandingFees: 150,
        },
    })

    // Create students for tenant2
    const student3 = await prisma.student.create({
        data: {
            tenantId: tenant2.id,
            studentId: 'STU001',
            englishName: 'Aisha Siddique',
            arabicName: 'عائشة صديقة',
            dateOfBirth: new Date('2012-11-08'),
            gender: 'Female',
            classLevel: 'Fasal 5',
            yearGroup: 'Beginner',
            status: 'Active',
            phone: '+44 20 3456 7890',
            email: 'aisha.siddique@parent.com',
            address: '789 Community Lane, Manchester, UK',
            guardianName: 'Khadija Siddique',
            guardianPhone: '+44 20 3456 7890',
            guardianEmail: 'khadija.siddique@email.com',
            guardianRelationship: 'Mother',
            quranProgress: 3,
            attendanceRate: 98,
            outstandingFees: 0,
        },
    })

    console.log('✅ Created students:', student1.englishName, student2.englishName, student3.englishName)

    // Create some attendance records
    const today = new Date()
    await prisma.attendanceRecord.create({
        data: {
            studentId: student1.id,
            date: today,
            status: 'Present',
            notes: 'On time',
        },
    })

    await prisma.attendanceRecord.create({
        data: {
            studentId: student2.id,
            date: today,
            status: 'Present',
            notes: 'On time',
        },
    })

    console.log('✅ Created attendance records')

    // Create progress records
    await prisma.progressRecord.create({
        data: {
            studentId: student1.id,
            subject: 'Quran Memorization',
            progressType: 'Memorization',
            currentLevel: 'Juz 15',
            progressPercentage: 50,
            grade: 'A',
            notes: 'Excellent progress',
            assessedBy: user1.fullName || 'Teacher',
        },
    })

    console.log('✅ Created progress records')

    console.log('🎉 Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
