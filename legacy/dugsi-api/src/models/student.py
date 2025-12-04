from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(20), unique=True, nullable=False)
    english_name = db.Column(db.String(100), nullable=False)
    arabic_name = db.Column(db.String(100))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    class_level = db.Column(db.String(20))
    year_group = db.Column(db.String(20))
    enrollment_date = db.Column(db.Date, default=datetime.utcnow)
    status = db.Column(db.String(20), default='Active')
    
    # Contact Information
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    address = db.Column(db.Text)
    
    # Guardian Information
    guardian_name = db.Column(db.String(100))
    guardian_phone = db.Column(db.String(20))
    guardian_email = db.Column(db.String(100))
    guardian_relationship = db.Column(db.String(50))
    
    # Academic Information
    quran_progress = db.Column(db.Float, default=0.0)
    attendance_rate = db.Column(db.Float, default=0.0)
    
    # Financial Information
    outstanding_fees = db.Column(db.Float, default=0.0)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    attendance_records = db.relationship('AttendanceRecord', backref='student', lazy=True)
    progress_records = db.relationship('ProgressRecord', backref='student', lazy=True)
    fee_records = db.relationship('FeeRecord', backref='student', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'english_name': self.english_name,
            'arabic_name': self.arabic_name,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'gender': self.gender,
            'class_level': self.class_level,
            'year_group': self.year_group,
            'enrollment_date': self.enrollment_date.isoformat() if self.enrollment_date else None,
            'status': self.status,
            'phone': self.phone,
            'email': self.email,
            'address': self.address,
            'guardian_name': self.guardian_name,
            'guardian_phone': self.guardian_phone,
            'guardian_email': self.guardian_email,
            'guardian_relationship': self.guardian_relationship,
            'quran_progress': self.quran_progress,
            'attendance_rate': self.attendance_rate,
            'outstanding_fees': self.outstanding_fees,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class AttendanceRecord(db.Model):
    __tablename__ = 'attendance_records'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)  # Present, Absent, Late, Excused
    notes = db.Column(db.Text)
    marked_by = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'date': self.date.isoformat() if self.date else None,
            'status': self.status,
            'notes': self.notes,
            'marked_by': self.marked_by,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class ProgressRecord(db.Model):
    __tablename__ = 'progress_records'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    subject = db.Column(db.String(50), nullable=False)  # Quran, Arabic, Aqeedah, etc.
    progress_type = db.Column(db.String(50))  # Memorization, Recitation, Written, etc.
    current_level = db.Column(db.String(100))
    progress_percentage = db.Column(db.Float, default=0.0)
    grade = db.Column(db.String(10))
    notes = db.Column(db.Text)
    assessed_by = db.Column(db.String(100))
    assessment_date = db.Column(db.Date, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'subject': self.subject,
            'progress_type': self.progress_type,
            'current_level': self.current_level,
            'progress_percentage': self.progress_percentage,
            'grade': self.grade,
            'notes': self.notes,
            'assessed_by': self.assessed_by,
            'assessment_date': self.assessment_date.isoformat() if self.assessment_date else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class FeeRecord(db.Model):
    __tablename__ = 'fee_records'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    fee_type = db.Column(db.String(50), nullable=False)  # Tuition, Books, Activities, etc.
    amount = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    paid_amount = db.Column(db.Float, default=0.0)
    payment_date = db.Column(db.Date)
    payment_method = db.Column(db.String(50))  # Cash, Card, Bank Transfer
    status = db.Column(db.String(20), default='Pending')  # Pending, Paid, Overdue
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'fee_type': self.fee_type,
            'amount': self.amount,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'paid_amount': self.paid_amount,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
            'payment_method': self.payment_method,
            'status': self.status,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

