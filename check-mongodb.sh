#!/bin/bash

# Script to check MongoDB installation and status

echo "=== Checking MongoDB Installation ==="

# Check if mongod process is running
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB process (mongod) is running"
    ps aux | grep mongod | grep -v grep
else
    echo "❌ MongoDB process (mongod) is not running"
fi

# Check for different MongoDB service names
echo ""
echo "=== Checking MongoDB Service Names ==="
systemctl list-units --type=service | grep -i mongo || echo "No MongoDB service found"

# Check if mongosh is available
echo ""
echo "=== Checking MongoDB Client ==="
if command -v mongosh &> /dev/null; then
    echo "✅ mongosh is installed"
    mongosh --version
elif command -v mongo &> /dev/null; then
    echo "✅ mongo client is installed (legacy)"
    mongo --version
else
    echo "❌ MongoDB client not found"
fi

# Check MongoDB port
echo ""
echo "=== Checking MongoDB Port (27017) ==="
if netstat -tulpn | grep 27017 > /dev/null; then
    echo "✅ MongoDB is listening on port 27017"
    netstat -tulpn | grep 27017
else
    echo "❌ MongoDB is not listening on port 27017"
fi

# Check existing databases
echo ""
echo "=== Checking Existing Databases ==="
if command -v mongosh &> /dev/null; then
    mongosh --quiet --eval "db.adminCommand('listDatabases')" 2>/dev/null || echo "Cannot connect to MongoDB"
elif command -v mongo &> /dev/null; then
    mongo --quiet --eval "db.adminCommand('listDatabases')" 2>/dev/null || echo "Cannot connect to MongoDB"
else
    echo "MongoDB client not available to check databases"
fi

# Check what ports are in use
echo ""
echo "=== Checking Port Usage ==="
echo "Port 5001 (for alishbatech backend):"
netstat -tulpn | grep 5001 || echo "✅ Port 5001 is available"

echo ""
echo "All listening ports:"
netstat -tulpn | grep LISTEN | head -20
