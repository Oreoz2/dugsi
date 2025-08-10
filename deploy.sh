#!/bin/bash

# Madrasah Management Platform - Automated Deployment Script
# This script sets up the complete platform including server, database, and dependencies

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="madrasah-management-platform"
BACKEND_DIR="madrasah-api"
FRONTEND_DIR="madrasah-platform"
DEPLOY_USER="madrasah"
DEPLOY_PATH="/opt/madrasah"
SERVICE_NAME="madrasah-api"
NGINX_SITE="madrasah.local"

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root for security reasons"
        print_warning "Please run as a regular user with sudo privileges"
        exit 1
    fi
}

check_system() {
    print_header "CHECKING SYSTEM REQUIREMENTS"
    
    # Check OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_success "Linux system detected"
    else
        print_error "This script is designed for Linux systems"
        exit 1
    fi
    
    # Check if running on Ubuntu/Debian
    if command -v apt-get &> /dev/null; then
        print_success "APT package manager found"
    else
        print_warning "APT not found - some commands may need adjustment for your distribution"
    fi
    
    # Check sudo access
    if sudo -n true 2>/dev/null; then
        print_success "Sudo access confirmed"
    else
        print_error "This script requires sudo privileges"
        exit 1
    fi
}

install_dependencies() {
    print_header "INSTALLING SYSTEM DEPENDENCIES"
    
    # Update package list
    print_warning "Updating package list..."
    sudo apt-get update -qq
    
    # Install Python and pip
    if ! command -v python3 &> /dev/null; then
        print_warning "Installing Python 3..."
        sudo apt-get install -y python3 python3-pip python3-venv
    fi
    print_success "Python 3 installed"
    
    # Install Node.js and npm
    if ! command -v node &> /dev/null; then
        print_warning "Installing Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    print_success "Node.js installed"
    
    # Install Nginx
    if ! command -v nginx &> /dev/null; then
        print_warning "Installing Nginx..."
        sudo apt-get install -y nginx
    fi
    print_success "Nginx installed"
    
    # Install SQLite
    if ! command -v sqlite3 &> /dev/null; then
        print_warning "Installing SQLite..."
        sudo apt-get install -y sqlite3
    fi
    print_success "SQLite installed"
    
    # Install other utilities
    sudo apt-get install -y curl wget unzip git supervisor
    print_success "Additional utilities installed"
}

create_user() {
    print_header "CREATING DEPLOYMENT USER"
    
    if id "$DEPLOY_USER" &>/dev/null; then
        print_warning "User $DEPLOY_USER already exists"
    else
        print_warning "Creating user $DEPLOY_USER..."
        sudo useradd -m -s /bin/bash $DEPLOY_USER
        sudo usermod -aG www-data $DEPLOY_USER
        print_success "User $DEPLOY_USER created"
    fi
}

setup_directories() {
    print_header "SETTING UP DIRECTORIES"
    
    # Create deployment directory
    sudo mkdir -p $DEPLOY_PATH
    sudo chown $DEPLOY_USER:www-data $DEPLOY_PATH
    sudo chmod 755 $DEPLOY_PATH
    
    # Create log directory
    sudo mkdir -p /var/log/madrasah
    sudo chown $DEPLOY_USER:www-data /var/log/madrasah
    
    print_success "Directories created"
}

deploy_application() {
    print_header "DEPLOYING APPLICATION"
    
    # Copy application files
    print_warning "Copying application files..."
    sudo cp -r ./$BACKEND_DIR $DEPLOY_PATH/
    sudo chown -R $DEPLOY_USER:www-data $DEPLOY_PATH/$BACKEND_DIR
    
    # Set up Python virtual environment
    print_warning "Setting up Python virtual environment..."
    sudo -u $DEPLOY_USER python3 -m venv $DEPLOY_PATH/$BACKEND_DIR/venv
    
    # Install Python dependencies
    print_warning "Installing Python dependencies..."
    sudo -u $DEPLOY_USER $DEPLOY_PATH/$BACKEND_DIR/venv/bin/pip install -r $DEPLOY_PATH/$BACKEND_DIR/requirements.txt
    
    # Set up database
    print_warning "Setting up database..."
    sudo -u $DEPLOY_USER $DEPLOY_PATH/$BACKEND_DIR/venv/bin/python $DEPLOY_PATH/$BACKEND_DIR/src/database/seed_data.py
    
    print_success "Application deployed"
}

configure_nginx() {
    print_header "CONFIGURING NGINX"
    
    # Create Nginx configuration
    sudo tee /etc/nginx/sites-available/$NGINX_SITE > /dev/null <<EOF
server {
    listen 80;
    server_name $NGINX_SITE localhost;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Static files
    location /static/ {
        alias $DEPLOY_PATH/$BACKEND_DIR/src/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API routes
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Frontend routes (SPA)
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Handle SPA routing
        try_files \$uri \$uri/ @fallback;
    }
    
    location @fallback {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;
}
EOF
    
    # Enable site
    sudo ln -sf /etc/nginx/sites-available/$NGINX_SITE /etc/nginx/sites-enabled/
    
    # Remove default site
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test Nginx configuration
    sudo nginx -t
    
    print_success "Nginx configured"
}

configure_supervisor() {
    print_header "CONFIGURING SUPERVISOR"
    
    # Create Supervisor configuration
    sudo tee /etc/supervisor/conf.d/$SERVICE_NAME.conf > /dev/null <<EOF
[program:$SERVICE_NAME]
command=$DEPLOY_PATH/$BACKEND_DIR/venv/bin/python $DEPLOY_PATH/$BACKEND_DIR/src/main.py
directory=$DEPLOY_PATH/$BACKEND_DIR
user=$DEPLOY_USER
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/var/log/madrasah/app.log
stdout_logfile_maxbytes=10MB
stdout_logfile_backups=5
environment=FLASK_ENV=production,PYTHONPATH="$DEPLOY_PATH/$BACKEND_DIR"
EOF
    
    print_success "Supervisor configured"
}

setup_firewall() {
    print_header "CONFIGURING FIREWALL"
    
    if command -v ufw &> /dev/null; then
        print_warning "Configuring UFW firewall..."
        sudo ufw --force enable
        sudo ufw allow ssh
        sudo ufw allow 'Nginx Full'
        sudo ufw --force reload
        print_success "Firewall configured"
    else
        print_warning "UFW not found - please configure firewall manually"
    fi
}

start_services() {
    print_header "STARTING SERVICES"
    
    # Reload Supervisor
    sudo supervisorctl reread
    sudo supervisorctl update
    sudo supervisorctl start $SERVICE_NAME
    
    # Start Nginx
    sudo systemctl enable nginx
    sudo systemctl restart nginx
    
    # Enable services to start on boot
    sudo systemctl enable supervisor
    
    print_success "Services started"
}

create_backup_script() {
    print_header "CREATING BACKUP SCRIPT"
    
    sudo tee /usr/local/bin/madrasah-backup > /dev/null <<'EOF'
#!/bin/bash
# Madrasah Management Platform Backup Script

BACKUP_DIR="/var/backups/madrasah"
DATE=$(date +%Y%m%d_%H%M%S)
DEPLOY_PATH="/opt/madrasah"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
cp $DEPLOY_PATH/madrasah-api/src/database/app.db $BACKUP_DIR/database_$DATE.db

# Backup configuration
tar -czf $BACKUP_DIR/config_$DATE.tar.gz /etc/nginx/sites-available/madrasah.local /etc/supervisor/conf.d/madrasah-api.conf

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.db" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF
    
    sudo chmod +x /usr/local/bin/madrasah-backup
    
    # Add to crontab for daily backups
    (sudo crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/madrasah-backup") | sudo crontab -
    
    print_success "Backup script created"
}

print_completion() {
    print_header "DEPLOYMENT COMPLETED SUCCESSFULLY!"
    
    echo -e "${GREEN}🎉 Madrasah Management Platform has been deployed successfully!${NC}"
    echo ""
    echo -e "${BLUE}📋 Deployment Summary:${NC}"
    echo -e "   • Application Path: $DEPLOY_PATH/$BACKEND_DIR"
    echo -e "   • Database: SQLite at $DEPLOY_PATH/$BACKEND_DIR/src/database/app.db"
    echo -e "   • Logs: /var/log/madrasah/app.log"
    echo -e "   • Nginx Config: /etc/nginx/sites-available/$NGINX_SITE"
    echo -e "   • Service: $SERVICE_NAME (managed by Supervisor)"
    echo ""
    echo -e "${BLUE}🌐 Access Information:${NC}"
    echo -e "   • URL: http://localhost or http://$(hostname -I | awk '{print $1}')"
    echo -e "   • Admin Login: username=admin, pin=123456"
    echo -e "   • Principal Login: username=principal, pin=123456"
    echo -e "   • Teacher Login: username=teacher1, pin=123456"
    echo ""
    echo -e "${BLUE}🔧 Management Commands:${NC}"
    echo -e "   • Check status: sudo supervisorctl status $SERVICE_NAME"
    echo -e "   • Restart app: sudo supervisorctl restart $SERVICE_NAME"
    echo -e "   • View logs: sudo tail -f /var/log/madrasah/app.log"
    echo -e "   • Backup: sudo /usr/local/bin/madrasah-backup"
    echo ""
    echo -e "${BLUE}📚 Documentation:${NC}"
    echo -e "   • API Documentation: http://localhost/api/"
    echo -e "   • Admin Guide: See README.md"
    echo ""
    echo -e "${GREEN}✨ The platform is now ready for use!${NC}"
}

# Main execution
main() {
    print_header "MADRASAH MANAGEMENT PLATFORM DEPLOYMENT"
    echo -e "${BLUE}Starting automated deployment...${NC}"
    echo ""
    
    check_root
    check_system
    install_dependencies
    create_user
    setup_directories
    deploy_application
    configure_nginx
    configure_supervisor
    setup_firewall
    start_services
    create_backup_script
    print_completion
}

# Run main function
main "$@"

