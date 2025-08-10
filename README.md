# Madrasah Management Platform

A comprehensive, modern multi-tenant management system designed specifically for Islamic educational institutions (Madrasahs). Built with React frontend and Flask backend, featuring advanced theming, student management, attendance tracking, progress monitoring, and much more.

## 🌟 Features

### 🎨 **Modern Multi-Tenant Design**
- **Curved/Rounded UI**: Extensive use of border-radius for modern aesthetics
- **Advanced Theme System**: 3 pre-built themes with unlimited customization
- **Real-time Theme Switching**: Live preview and instant theme changes
- **Color Customization**: OKLCH color space support with 6 preset palettes
- **Typography Control**: Multiple font options and size controls
- **Border Radius Levels**: 5 levels from subtle to pill-shaped

### 👥 **User Management & Authentication**
- **PIN-based Authentication**: Secure 6-digit PIN system
- **Role-Based Access Control (RBAC)**: Admin, Principal, Teacher, Parent roles
- **User Statistics**: Real-time user metrics and management
- **Security Features**: Rate limiting, session management, account lockout
- **Multi-level Permissions**: Granular permission control per role

### 🎓 **Student Management**
- **Comprehensive Profiles**: English/Arabic names, family information
- **Academic Tracking**: Class levels, year groups, enrollment status
- **Guardian Management**: Parent/guardian contact and relationship tracking
- **Fee Management**: Outstanding fees tracking with payment history
- **Search & Filter**: Advanced filtering by class, level, status
- **Bulk Operations**: Efficient management of multiple students

### 📊 **Attendance System**
- **Real-time Marking**: Interactive attendance interface
- **Multiple Status Types**: Present, Absent, Late, Excused
- **Bulk Operations**: "All Present" and "All Absent" quick actions
- **Smart Notes**: Automatic note fields for absent/excused students
- **Historical Tracking**: Complete attendance history with analytics
- **Statistics Dashboard**: Attendance rates and trend analysis

### 📈 **Progress Tracking**
- **Quran Memorization**: 30 Juz structure with detailed progress
- **Islamic Studies**: 5 core subjects (Aqeedah, Fiqh, Seerah, Hadith, Arabic)
- **Performance Metrics**: Accuracy, Fluency, Tajweed scoring
- **Visual Progress**: Circular and linear progress indicators
- **Achievement System**: Badges and milestone recognition
- **Grade Management**: Letter grades with color-coded indicators

### 📚 **Curriculum Management**
- **3-Level Structure**: Beginner, Intermediate, Advanced curricula
- **Lesson Planning**: Complete lesson plan templates and management
- **Resource Management**: Educational materials and assessment tools
- **Duration Tracking**: 12-24 month program structures
- **Module Breakdown**: Detailed objectives and learning outcomes

### 💬 **Communication Center**
- **Messaging System**: Real-time messaging between users
- **Announcements**: Comprehensive announcement management
- **Notification Center**: Centralized notification system
- **Priority Levels**: Low, Normal, High, Urgent message priorities
- **Read Status**: Complete read/unread tracking
- **Bulk Messaging**: Group and broadcast messaging capabilities

### 💰 **Finance Management**
- **Fee Tracking**: Multiple fee categories (Tuition, Books, Activities, Transport)
- **Payment Processing**: Cash, Card, Bank Transfer support
- **Outstanding Fees**: Clear tracking with overdue indicators
- **Financial Dashboard**: Revenue, collection rates, and analytics
- **Payment History**: Complete transaction records
- **Automated Reminders**: Fee payment notifications

### 📊 **Analytics & Reporting**
- **Comprehensive Dashboard**: Real-time metrics and KPIs
- **Data Visualizations**: Pie, line, bar, and area charts using Recharts
- **Performance Tracking**: 6 key performance indicators
- **Student Analytics**: Distribution, progress, and achievement tracking
- **Financial Analytics**: Revenue analysis with forecasting
- **Export Capabilities**: Multiple format support (PDF, Excel, CSV)

### 📋 **Reports Center**
- **6 Report Templates**: Academic, Financial, HR, and Performance reports
- **Automated Generation**: Scheduled report creation and distribution
- **Multiple Formats**: PDF, Excel, Word, CSV export options
- **Email Distribution**: Automated delivery to specified recipients
- **Status Tracking**: Complete report lifecycle management

## 🚀 Quick Start

### Prerequisites
- Linux server (Ubuntu 18.04+ recommended)
- Python 3.8+
- Node.js 16+
- Nginx
- SQLite3
- Sudo privileges

### Automated Deployment

1. **Download the deployment package**:
   ```bash
   # Extract the provided zip file
   unzip madrasah-management-platform.zip
   cd madrasah-management-platform
   ```

2. **Run the deployment script**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Access the platform**:
   - URL: `http://localhost` or `http://your-server-ip`
   - Admin Login: `username=admin, pin=123456`

### Manual Installation

#### Backend Setup
```bash
cd madrasah-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python src/database/seed_data.py
python src/main.py
```

#### Frontend Setup
```bash
cd madrasah-platform
npm install
npm run build
# Copy dist/* to madrasah-api/src/static/
```

## 🔧 Configuration

### Environment Variables
```bash
# Production settings
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///path/to/database.db

# Optional: External database
# DATABASE_URL=postgresql://user:pass@localhost/madrasah
# DATABASE_URL=mysql://user:pass@localhost/madrasah
```

### Theme Customization
The platform supports extensive theme customization:

1. **Access Settings**: Navigate to Settings → Theme
2. **Choose Preset**: Select from 6 beautiful color presets
3. **Custom Colors**: Use OKLCH color picker for precise control
4. **Border Radius**: Adjust from subtle to super rounded
5. **Typography**: Select fonts and sizes
6. **Live Preview**: See changes instantly

### Multi-Tenant Setup
Each tenant (madrasah) can have completely different branding:

1. **Tenant Configuration**: Modify tenant settings in the admin panel
2. **Logo Upload**: Custom logos for each institution
3. **Color Schemes**: Unique color palettes per tenant
4. **Feature Toggles**: Enable/disable features per tenant
5. **Data Isolation**: Complete separation between tenants

## 📱 Usage Guide

### For Administrators
- **Dashboard**: Monitor key metrics and recent activities
- **User Management**: Create and manage user accounts
- **System Settings**: Configure platform-wide settings
- **Reports**: Generate and schedule comprehensive reports
- **Analytics**: View detailed performance insights

### For Teachers
- **Attendance**: Mark daily attendance for classes
- **Progress Tracking**: Update student progress and assessments
- **Communication**: Send messages to parents and students
- **Class Management**: Manage class schedules and curriculum

### For Parents
- **Student Progress**: View child's academic progress
- **Attendance**: Monitor attendance records
- **Communication**: Receive updates from teachers
- **Fee Status**: Check payment status and history

## 🔒 Security Features

- **PIN Authentication**: 6-digit PIN system with rate limiting
- **Session Management**: Secure session handling
- **Role-Based Access**: Granular permission control
- **Input Validation**: Comprehensive form validation
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: React's built-in protection
- **HTTPS Support**: SSL/TLS encryption ready

## 🛠️ Management Commands

### Service Management
```bash
# Check application status
sudo supervisorctl status madrasah-api

# Restart application
sudo supervisorctl restart madrasah-api

# View logs
sudo tail -f /var/log/madrasah/app.log

# Nginx status
sudo systemctl status nginx
```

### Database Management
```bash
# Backup database
sudo /usr/local/bin/madrasah-backup

# Access database
sqlite3 /opt/madrasah/madrasah-api/src/database/app.db

# Reset database (caution!)
cd /opt/madrasah/madrasah-api
source venv/bin/activate
python src/database/seed_data.py
```

### Updates and Maintenance
```bash
# Update application
cd /opt/madrasah/madrasah-api
sudo -u madrasah git pull origin main
sudo supervisorctl restart madrasah-api

# Update dependencies
sudo -u madrasah venv/bin/pip install -r requirements.txt
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Student Management
- `GET /api/students` - List all students
- `POST /api/students` - Create new student
- `GET /api/students/{id}` - Get student details
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/stats` - Attendance statistics

### Progress Tracking
- `GET /api/progress` - Get progress records
- `POST /api/progress` - Create progress record
- `GET /api/progress/analytics` - Progress analytics

### Analytics
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/reports` - Generate reports

## 🎨 Customization

### Adding New Themes
1. Create theme configuration in `src/themes/`
2. Define color variables and styling
3. Add theme to theme selector
4. Test across all components

### Custom Components
1. Create component in `src/components/`
2. Follow existing design patterns
3. Implement responsive design
4. Add to appropriate routes

### Database Schema Extensions
1. Create new models in `src/models/`
2. Add migration scripts
3. Update API endpoints
4. Test thoroughly

## 🐛 Troubleshooting

### Common Issues

**Application won't start**:
```bash
# Check logs
sudo tail -f /var/log/madrasah/app.log

# Check supervisor status
sudo supervisorctl status madrasah-api

# Restart services
sudo supervisorctl restart madrasah-api
sudo systemctl restart nginx
```

**Database errors**:
```bash
# Check database permissions
ls -la /opt/madrasah/madrasah-api/src/database/

# Recreate database
cd /opt/madrasah/madrasah-api
sudo -u madrasah venv/bin/python src/database/seed_data.py
```

**Theme not loading**:
- Clear browser cache
- Check static file permissions
- Verify Nginx configuration

## 📞 Support

For technical support and questions:
- **Documentation**: Check this README and inline code comments
- **Logs**: Monitor `/var/log/madrasah/app.log` for errors
- **Configuration**: Review Nginx and Supervisor configurations
- **Database**: Use SQLite browser for database inspection

## 📄 License

This project is proprietary software developed for Islamic educational institutions. All rights reserved.

## 🙏 Acknowledgments

- Built with modern web technologies (React, Flask, SQLite)
- UI components from Shadcn/UI and Tailwind CSS
- Icons from Lucide React
- Charts powered by Recharts
- Designed specifically for Islamic educational needs

---

**Madrasah Management Platform** - Empowering Islamic Education with Modern Technology

*May Allah (SWT) bless this project and make it beneficial for the Muslim Ummah. Ameen.*

