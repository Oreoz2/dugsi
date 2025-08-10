# Madrasah Management Platform - Quick Deployment Guide

## 📦 Package Contents

This deployment package contains:
- **Frontend**: React application with modern curved UI
- **Backend**: Flask API server with SQLite database
- **Deployment Script**: Automated setup for Linux servers
- **Documentation**: Comprehensive README and guides
- **Sample Data**: Pre-populated database with demo accounts

## 🚀 Quick Deployment (Recommended)

### 1. Extract Package
```bash
unzip madrasah-management-platform.zip
cd madrasah-management-platform
```

### 2. Run Automated Deployment
```bash
chmod +x deploy.sh
./deploy.sh
```

### 3. Access Platform
- **URL**: `http://localhost` or `http://your-server-ip`
- **Admin Login**: `username=admin, pin=123456`
- **Principal Login**: `username=principal, pin=123456`
- **Teacher Login**: `username=teacher1, pin=123456`

## 🔧 Manual Deployment

### Prerequisites
- Ubuntu 18.04+ (or similar Linux distribution)
- Python 3.8+
- Node.js 16+
- Nginx
- SQLite3

### Backend Setup
```bash
cd madrasah-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python src/database/seed_data.py
python src/main.py
```

### Frontend (Already Built)
The frontend is pre-built and included in the backend static files.

## 📊 Default Data

The platform comes with sample data:
- **5 Users**: Admin, Principal, 2 Teachers, 1 Parent
- **5 Students**: Complete profiles with progress data
- **150 Attendance Records**: 30 days of sample attendance
- **30 Progress Records**: Academic progress across subjects
- **20 Fee Records**: Financial data with payment history
- **3 Announcements**: Sample announcements

## 🔑 Default Credentials

| Role | Username | PIN |
|------|----------|-----|
| Admin | admin | 123456 |
| Principal | principal | 123456 |
| Teacher | teacher1 | 123456 |
| Teacher | ustadh.muhammad | 123456 |
| Parent | parent1 | 123456 |

## 🌟 Key Features

- **Multi-Tenant Theming**: 3 themes with unlimited customization
- **Student Management**: Complete student lifecycle management
- **Attendance Tracking**: Real-time attendance with analytics
- **Progress Monitoring**: Quran and Islamic studies progress
- **Communication**: Messaging and announcements
- **Finance Management**: Fee tracking and payment processing
- **Analytics Dashboard**: Comprehensive reporting and insights

## 🛠️ Post-Deployment

### Service Management
```bash
# Check status
sudo supervisorctl status madrasah-api

# Restart application
sudo supervisorctl restart madrasah-api

# View logs
sudo tail -f /var/log/madrasah/app.log
```

### Backup
```bash
# Manual backup
sudo /usr/local/bin/madrasah-backup

# Automated daily backups are configured via cron
```

### Updates
```bash
# Update application code
cd /opt/madrasah/madrasah-api
sudo -u madrasah git pull origin main
sudo supervisorctl restart madrasah-api
```

## 🔒 Security Notes

- Change default PINs immediately after deployment
- Configure SSL/HTTPS for production use
- Review firewall settings
- Regular database backups are automated
- Monitor logs for security events

## 📞 Support

- **Documentation**: See README.md for detailed information
- **Logs**: Check `/var/log/madrasah/app.log` for issues
- **Database**: SQLite database at `/opt/madrasah/madrasah-api/src/database/app.db`

## 🎯 Next Steps

1. **Change Default Credentials**: Update all default PINs
2. **Configure Themes**: Customize branding for your institution
3. **Add Real Data**: Replace sample data with actual students/staff
4. **Setup SSL**: Configure HTTPS for production
5. **Configure Backups**: Verify automated backup system
6. **Train Users**: Provide training on platform features

---

**The platform is now ready for production use!**

*May Allah (SWT) bless this project and make it beneficial for Islamic education. Ameen.*

