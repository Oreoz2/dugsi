#!/usr/bin/env python3
"""
Database seeding script for Madrasah Management Platform
This script populates the database with sample data for testing and demonstration
"""

import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from datetime import datetime, date, timedelta
from src.models.user import db, User
from src.models.student import Student, AttendanceRecord, ProgressRecord, FeeRecord
from src.models.communication import Message, Announcement, Notification
from src.main import app

def seed_users():
    """Create sample users"""
    users = [
        {
            'username': 'admin',
            'email': 'admin@madrasah.edu',
            'password': '123456',  # This should be hashed in production
            'role': 'admin',
            'full_name': 'Ahmed Hassan',
            'is_active': True
        },
        {
            'username': 'principal',
            'email': 'principal@madrasah.edu',
            'password': '123456',
            'role': 'principal',
            'full_name': 'Dr. Fatima Al-Zahra',
            'is_active': True
        },
        {
            'username': 'teacher1',
            'email': 'ustadha.khadija@madrasah.edu',
            'password': '123456',
            'role': 'teacher',
            'full_name': 'Ustadha Khadija',
            'is_active': True
        },
        {
            'username': 'teacher2',
            'email': 'ustadh.muhammad@madrasah.edu',
            'password': '123456',
            'role': 'teacher',
            'full_name': 'Ustadh Muhammad',
            'is_active': True
        },
        {
            'username': 'parent1',
            'email': 'parent1@example.com',
            'password': '123456',
            'role': 'parent',
            'full_name': 'Omar Al-Rashid',
            'is_active': True
        }
    ]
    
    for user_data in users:
        existing_user = User.query.filter_by(username=user_data['username']).first()
        if not existing_user:
            user = User(**user_data)
            db.session.add(user)
    
    db.session.commit()
    print("✓ Users seeded successfully")

def seed_students():
    """Create sample students"""
    students = [
        {
            'student_id': 'STU001',
            'english_name': 'Fatima Al-Zahra',
            'arabic_name': 'فاطمة الزهراء',
            'date_of_birth': date(2010, 3, 15),
            'gender': 'Female',
            'class_level': 'Intermediate',
            'year_group': 'Year 7',
            'phone': '+44 7700 900001',
            'email': 'fatima.alzahra@student.madrasah.edu',
            'address': '123 Islamic Street, London, UK',
            'guardian_name': 'Ali Al-Zahra',
            'guardian_phone': '+44 7700 900101',
            'guardian_email': 'ali.alzahra@example.com',
            'guardian_relationship': 'Father',
            'quran_progress': 85.5,
            'attendance_rate': 94.2,
            'outstanding_fees': 150.00,
            'status': 'Active'
        },
        {
            'student_id': 'STU002',
            'english_name': 'Omar Ibn Khattab',
            'arabic_name': 'عمر بن الخطاب',
            'date_of_birth': date(2008, 7, 22),
            'gender': 'Male',
            'class_level': 'Advanced',
            'year_group': 'Year 9',
            'phone': '+44 7700 900002',
            'email': 'omar.khattab@student.madrasah.edu',
            'address': '456 Madinah Avenue, Birmingham, UK',
            'guardian_name': 'Khalid Ibn Khattab',
            'guardian_phone': '+44 7700 900102',
            'guardian_email': 'khalid.khattab@example.com',
            'guardian_relationship': 'Father',
            'quran_progress': 92.3,
            'attendance_rate': 96.8,
            'outstanding_fees': 0.00,
            'status': 'Active'
        },
        {
            'student_id': 'STU003',
            'english_name': 'Aisha Siddique',
            'arabic_name': 'عائشة الصديقة',
            'date_of_birth': date(2012, 11, 8),
            'gender': 'Female',
            'class_level': 'Beginner',
            'year_group': 'Year 5',
            'phone': '+44 7700 900003',
            'email': 'aisha.siddique@student.madrasah.edu',
            'address': '789 Makkah Road, Manchester, UK',
            'guardian_name': 'Amina Siddique',
            'guardian_phone': '+44 7700 900103',
            'guardian_email': 'amina.siddique@example.com',
            'guardian_relationship': 'Mother',
            'quran_progress': 67.8,
            'attendance_rate': 89.5,
            'outstanding_fees': 300.00,
            'status': 'Active'
        },
        {
            'student_id': 'STU004',
            'english_name': 'Ali Hassan',
            'arabic_name': 'علي حسن',
            'date_of_birth': date(2009, 5, 12),
            'gender': 'Male',
            'class_level': 'Intermediate',
            'year_group': 'Year 8',
            'phone': '+44 7700 900004',
            'email': 'ali.hassan@student.madrasah.edu',
            'address': '321 Quran Street, Leeds, UK',
            'guardian_name': 'Hassan Ali',
            'guardian_phone': '+44 7700 900104',
            'guardian_email': 'hassan.ali@example.com',
            'guardian_relationship': 'Father',
            'quran_progress': 78.9,
            'attendance_rate': 91.2,
            'outstanding_fees': 75.00,
            'status': 'Active'
        },
        {
            'student_id': 'STU005',
            'english_name': 'Maryam Ahmed',
            'arabic_name': 'مريم أحمد',
            'date_of_birth': date(2011, 9, 30),
            'gender': 'Female',
            'class_level': 'Beginner',
            'year_group': 'Year 6',
            'phone': '+44 7700 900005',
            'email': 'maryam.ahmed@student.madrasah.edu',
            'address': '654 Sunnah Lane, Bradford, UK',
            'guardian_name': 'Ahmed Mahmoud',
            'guardian_phone': '+44 7700 900105',
            'guardian_email': 'ahmed.mahmoud@example.com',
            'guardian_relationship': 'Father',
            'quran_progress': 72.4,
            'attendance_rate': 87.6,
            'outstanding_fees': 225.00,
            'status': 'Active'
        }
    ]
    
    for student_data in students:
        existing_student = Student.query.filter_by(student_id=student_data['student_id']).first()
        if not existing_student:
            student = Student(**student_data)
            db.session.add(student)
    
    db.session.commit()
    print("✓ Students seeded successfully")

def seed_attendance():
    """Create sample attendance records"""
    students = Student.query.all()
    
    # Create attendance for the last 30 days
    for i in range(30):
        attendance_date = date.today() - timedelta(days=i)
        
        for student in students:
            # 90% chance of being present
            import random
            status_options = ['Present'] * 9 + ['Absent']
            status = random.choice(status_options)
            
            existing_record = AttendanceRecord.query.filter_by(
                student_id=student.id,
                date=attendance_date
            ).first()
            
            if not existing_record:
                record = AttendanceRecord(
                    student_id=student.id,
                    date=attendance_date,
                    status=status,
                    notes='Family emergency' if status == 'Absent' else '',
                    marked_by='System'
                )
                db.session.add(record)
    
    db.session.commit()
    print("✓ Attendance records seeded successfully")

def seed_progress():
    """Create sample progress records"""
    students = Student.query.all()
    subjects = ['Quran', 'Arabic', 'Aqeedah', 'Fiqh', 'Seerah', 'Hadith']
    
    for student in students:
        for subject in subjects:
            existing_record = ProgressRecord.query.filter_by(
                student_id=student.id,
                subject=subject
            ).first()
            
            if not existing_record:
                import random
                progress = ProgressRecord(
                    student_id=student.id,
                    subject=subject,
                    progress_type='Assessment',
                    current_level=f'{subject} Level {random.randint(1, 5)}',
                    progress_percentage=random.uniform(60, 95),
                    grade=random.choice(['A', 'B', 'C']),
                    notes=f'Good progress in {subject}',
                    assessed_by='Ustadh Muhammad',
                    assessment_date=date.today() - timedelta(days=random.randint(1, 30))
                )
                db.session.add(progress)
    
    db.session.commit()
    print("✓ Progress records seeded successfully")

def seed_fees():
    """Create sample fee records"""
    students = Student.query.all()
    fee_types = ['Tuition', 'Books', 'Activities', 'Transport']
    
    for student in students:
        for fee_type in fee_types:
            existing_record = FeeRecord.query.filter_by(
                student_id=student.id,
                fee_type=fee_type
            ).first()
            
            if not existing_record:
                import random
                amount = random.choice([100, 150, 200, 250, 300])
                paid_amount = random.uniform(0, amount)
                
                fee = FeeRecord(
                    student_id=student.id,
                    fee_type=fee_type,
                    amount=amount,
                    due_date=date.today() + timedelta(days=30),
                    paid_amount=paid_amount,
                    payment_date=date.today() - timedelta(days=random.randint(1, 15)) if paid_amount > 0 else None,
                    payment_method=random.choice(['Cash', 'Card', 'Bank Transfer']) if paid_amount > 0 else None,
                    status='Paid' if paid_amount >= amount else 'Pending',
                    notes=f'{fee_type} fee for current term'
                )
                db.session.add(fee)
    
    db.session.commit()
    print("✓ Fee records seeded successfully")

def seed_announcements():
    """Create sample announcements"""
    admin_user = User.query.filter_by(username='admin').first()
    
    announcements = [
        {
            'title': 'Ramadan Schedule Changes',
            'content': 'Dear parents and students, please note that during Ramadan, our class timings will be adjusted. Morning classes will start at 9:00 AM and end at 1:00 PM. Evening classes will be from 7:00 PM to 9:00 PM.',
            'author_id': admin_user.id if admin_user else 1,
            'target_audience': 'all',
            'priority': 'high',
            'status': 'published',
            'publish_date': datetime.now(),
            'read_count': 45
        },
        {
            'title': 'Parent-Teacher Meeting',
            'content': 'We are pleased to invite all parents for our quarterly parent-teacher meeting on Saturday, 15th August 2025, from 10:00 AM to 4:00 PM. Please book your appointment through the school office.',
            'author_id': admin_user.id if admin_user else 1,
            'target_audience': 'parents',
            'priority': 'normal',
            'status': 'published',
            'publish_date': datetime.now() - timedelta(days=2),
            'read_count': 32
        },
        {
            'title': 'New Quran Competition',
            'content': 'Alhamdulillah! We are organizing an inter-class Quran recitation competition next month. Students from all levels are encouraged to participate. Registration forms are available at the reception.',
            'author_id': admin_user.id if admin_user else 1,
            'target_audience': 'students',
            'priority': 'normal',
            'status': 'published',
            'publish_date': datetime.now() - timedelta(days=5),
            'read_count': 67
        }
    ]
    
    for announcement_data in announcements:
        existing_announcement = Announcement.query.filter_by(title=announcement_data['title']).first()
        if not existing_announcement:
            announcement = Announcement(**announcement_data)
            db.session.add(announcement)
    
    db.session.commit()
    print("✓ Announcements seeded successfully")

def main():
    """Main seeding function"""
    with app.app_context():
        print("🌱 Starting database seeding...")
        
        # Create all tables
        db.create_all()
        print("✓ Database tables created")
        
        # Seed data
        seed_users()
        seed_students()
        seed_attendance()
        seed_progress()
        seed_fees()
        seed_announcements()
        
        print("🎉 Database seeding completed successfully!")
        print("\n📊 Summary:")
        print(f"   Users: {User.query.count()}")
        print(f"   Students: {Student.query.count()}")
        print(f"   Attendance Records: {AttendanceRecord.query.count()}")
        print(f"   Progress Records: {ProgressRecord.query.count()}")
        print(f"   Fee Records: {FeeRecord.query.count()}")
        print(f"   Announcements: {Announcement.query.count()}")
        
        print("\n🔑 Default Login Credentials:")
        print("   Admin: username=admin, pin=123456")
        print("   Principal: username=principal, pin=123456")
        print("   Teacher: username=teacher1, pin=123456")

if __name__ == '__main__':
    main()

