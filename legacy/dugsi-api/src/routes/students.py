from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.student import Student, AttendanceRecord, ProgressRecord, FeeRecord
from datetime import datetime, date
import json

students_bp = Blueprint('students', __name__)

@students_bp.route('/students', methods=['GET'])
def get_students():
    """Get all students with optional filtering"""
    try:
        # Get query parameters
        class_level = request.args.get('class_level')
        year_group = request.args.get('year_group')
        status = request.args.get('status')
        search = request.args.get('search')
        
        # Build query
        query = Student.query
        
        if class_level:
            query = query.filter(Student.class_level == class_level)
        if year_group:
            query = query.filter(Student.year_group == year_group)
        if status:
            query = query.filter(Student.status == status)
        if search:
            query = query.filter(
                (Student.english_name.contains(search)) |
                (Student.arabic_name.contains(search)) |
                (Student.student_id.contains(search))
            )
        
        students = query.all()
        return jsonify({
            'success': True,
            'data': [student.to_dict() for student in students],
            'count': len(students)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@students_bp.route('/students', methods=['POST'])
def create_student():
    """Create a new student"""
    try:
        data = request.get_json()
        
        # Create new student
        student = Student(
            student_id=data.get('student_id'),
            english_name=data.get('english_name'),
            arabic_name=data.get('arabic_name'),
            date_of_birth=datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d').date() if data.get('date_of_birth') else None,
            gender=data.get('gender'),
            class_level=data.get('class_level'),
            year_group=data.get('year_group'),
            phone=data.get('phone'),
            email=data.get('email'),
            address=data.get('address'),
            guardian_name=data.get('guardian_name'),
            guardian_phone=data.get('guardian_phone'),
            guardian_email=data.get('guardian_email'),
            guardian_relationship=data.get('guardian_relationship')
        )
        
        db.session.add(student)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': student.to_dict(),
            'message': 'Student created successfully'
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@students_bp.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """Get a specific student by ID"""
    try:
        student = Student.query.get_or_404(student_id)
        return jsonify({
            'success': True,
            'data': student.to_dict()
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@students_bp.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """Update a student"""
    try:
        student = Student.query.get_or_404(student_id)
        data = request.get_json()
        
        # Update fields
        for field in ['english_name', 'arabic_name', 'gender', 'class_level', 'year_group', 
                     'phone', 'email', 'address', 'guardian_name', 'guardian_phone', 
                     'guardian_email', 'guardian_relationship', 'status']:
            if field in data:
                setattr(student, field, data[field])
        
        if 'date_of_birth' in data and data['date_of_birth']:
            student.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
        
        student.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': student.to_dict(),
            'message': 'Student updated successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

@students_bp.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """Delete a student"""
    try:
        student = Student.query.get_or_404(student_id)
        db.session.delete(student)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Student deleted successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# Attendance Routes
@students_bp.route('/attendance', methods=['GET'])
def get_attendance():
    """Get attendance records with optional filtering"""
    try:
        date_param = request.args.get('date')
        student_id = request.args.get('student_id')
        
        query = AttendanceRecord.query
        
        if date_param:
            query = query.filter(AttendanceRecord.date == datetime.strptime(date_param, '%Y-%m-%d').date())
        if student_id:
            query = query.filter(AttendanceRecord.student_id == student_id)
        
        records = query.all()
        return jsonify({
            'success': True,
            'data': [record.to_dict() for record in records],
            'count': len(records)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@students_bp.route('/attendance', methods=['POST'])
def mark_attendance():
    """Mark attendance for students"""
    try:
        data = request.get_json()
        attendance_date = datetime.strptime(data.get('date'), '%Y-%m-%d').date()
        
        # Process attendance records
        for record in data.get('records', []):
            # Check if record already exists
            existing = AttendanceRecord.query.filter_by(
                student_id=record['student_id'],
                date=attendance_date
            ).first()
            
            if existing:
                # Update existing record
                existing.status = record['status']
                existing.notes = record.get('notes', '')
                existing.marked_by = data.get('marked_by', 'System')
            else:
                # Create new record
                attendance_record = AttendanceRecord(
                    student_id=record['student_id'],
                    date=attendance_date,
                    status=record['status'],
                    notes=record.get('notes', ''),
                    marked_by=data.get('marked_by', 'System')
                )
                db.session.add(attendance_record)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Attendance marked successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# Progress Routes
@students_bp.route('/progress', methods=['GET'])
def get_progress():
    """Get progress records"""
    try:
        student_id = request.args.get('student_id')
        subject = request.args.get('subject')
        
        query = ProgressRecord.query
        
        if student_id:
            query = query.filter(ProgressRecord.student_id == student_id)
        if subject:
            query = query.filter(ProgressRecord.subject == subject)
        
        records = query.all()
        return jsonify({
            'success': True,
            'data': [record.to_dict() for record in records],
            'count': len(records)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@students_bp.route('/progress', methods=['POST'])
def create_progress_record():
    """Create a progress record"""
    try:
        data = request.get_json()
        
        progress_record = ProgressRecord(
            student_id=data.get('student_id'),
            subject=data.get('subject'),
            progress_type=data.get('progress_type'),
            current_level=data.get('current_level'),
            progress_percentage=data.get('progress_percentage', 0.0),
            grade=data.get('grade'),
            notes=data.get('notes'),
            assessed_by=data.get('assessed_by'),
            assessment_date=datetime.strptime(data.get('assessment_date'), '%Y-%m-%d').date() if data.get('assessment_date') else date.today()
        )
        
        db.session.add(progress_record)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': progress_record.to_dict(),
            'message': 'Progress record created successfully'
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500

# Analytics Routes
@students_bp.route('/analytics/dashboard', methods=['GET'])
def get_dashboard_analytics():
    """Get dashboard analytics data"""
    try:
        # Student statistics
        total_students = Student.query.count()
        active_students = Student.query.filter_by(status='Active').count()
        
        # Attendance statistics (today)
        today = date.today()
        today_attendance = AttendanceRecord.query.filter_by(date=today).all()
        present_today = len([r for r in today_attendance if r.status == 'Present'])
        attendance_rate = (present_today / len(today_attendance) * 100) if today_attendance else 0
        
        # Financial statistics
        total_outstanding = db.session.query(db.func.sum(FeeRecord.amount - FeeRecord.paid_amount)).filter(
            FeeRecord.status != 'Paid'
        ).scalar() or 0
        
        return jsonify({
            'success': True,
            'data': {
                'total_students': total_students,
                'active_students': active_students,
                'attendance_rate': round(attendance_rate, 1),
                'present_today': present_today,
                'total_outstanding_fees': float(total_outstanding)
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

