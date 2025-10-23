#!/bin/bash

# NAMNGAM Database Backup Script
# ใช้สำหรับ backup database และไฟล์สำคัญ

set -e

# Configuration
BACKUP_DIR="/var/backups/namngam"
DB_NAME="namngam_db"
DB_USER="namngam_user"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
KEEP_DAYS=30  # เก็บ backup ย้อนหลัง 30 วัน

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "💾 NAMNGAM Backup Starting..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create backup directory if not exists
if [ ! -d "$BACKUP_DIR" ]; then
    echo -e "${YELLOW}Creating backup directory...${NC}"
    sudo mkdir -p "$BACKUP_DIR"
    sudo chown $USER:$USER "$BACKUP_DIR"
    echo -e "${GREEN}✅ Backup directory created${NC}"
fi

# 1. Backup Database
echo -e "\n${YELLOW}[1/3] Backing up database...${NC}"
BACKUP_FILE="$BACKUP_DIR/db_$TIMESTAMP.sql"

if pg_dump -U "$DB_USER" "$DB_NAME" > "$BACKUP_FILE"; then
    # Compress backup
    gzip "$BACKUP_FILE"
    BACKUP_SIZE=$(du -h "$BACKUP_FILE.gz" | cut -f1)
    echo -e "${GREEN}✅ Database backed up: $BACKUP_FILE.gz ($BACKUP_SIZE)${NC}"
else
    echo -e "${RED}❌ Database backup failed${NC}"
    exit 1
fi

# 2. Backup uploaded images
echo -e "\n${YELLOW}[2/3] Backing up uploaded images...${NC}"
if [ -d "public/uploads" ]; then
    UPLOADS_BACKUP="$BACKUP_DIR/uploads_$TIMESTAMP.tar.gz"
    tar -czf "$UPLOADS_BACKUP" public/uploads/
    UPLOADS_SIZE=$(du -h "$UPLOADS_BACKUP" | cut -f1)
    echo -e "${GREEN}✅ Images backed up: $UPLOADS_BACKUP ($UPLOADS_SIZE)${NC}"
else
    echo -e "${YELLOW}⏭️  No uploads directory found${NC}"
fi

# 3. Backup .env file
echo -e "\n${YELLOW}[3/3] Backing up configuration...${NC}"
if [ -f ".env" ]; then
    cp .env "$BACKUP_DIR/env_$TIMESTAMP"
    echo -e "${GREEN}✅ Environment file backed up${NC}"
fi

# Clean old backups (keep last 30 days)
echo -e "\n${YELLOW}Cleaning old backups...${NC}"
find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +$KEEP_DAYS -delete
find "$BACKUP_DIR" -name "uploads_*.tar.gz" -mtime +$KEEP_DAYS -delete
find "$BACKUP_DIR" -name "env_*" -mtime +$KEEP_DAYS -delete
echo -e "${GREEN}✅ Old backups cleaned (kept last $KEEP_DAYS days)${NC}"

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}💾 Backup Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📂 Backup location: $BACKUP_DIR"
echo "📊 Backup files:"
ls -lh "$BACKUP_DIR" | tail -n 5
echo ""

# Display total backup size
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)
echo "💾 Total backup size: $TOTAL_SIZE"
echo ""
echo "📝 To restore database:"
echo "  gunzip -c $BACKUP_FILE.gz | psql -U $DB_USER $DB_NAME"
echo ""
echo "📝 To restore uploads:"
echo "  tar -xzf $UPLOADS_BACKUP"
echo ""
