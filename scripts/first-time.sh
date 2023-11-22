#!/bin/bash
echo "Installing MariaDB"
apt update 
sudo dnf module install mariadb -y
sudo systemctl enable mariadb
sudo systemctl start mariadb
root_password=Backend*Service
 
# Make sure that NOBODY can access the server without a password
sudo mysql -e "UPDATE mysql.user SET Password = PASSWORD('$root_password') WHERE User = 'root'"
 
# Kill the anonymous users
sudo mysql -e "DROP USER IF EXISTS ''@'localhost'"
# Because our hostname varies we'll use some Bash magic here.
sudo mysql -e "DROP USER IF EXISTS ''@'$(hostname)'"
# Kill off the demo database
sudo mysql -e "DROP DATABASE IF EXISTS test"
clear
echo "MariaDB Installed"
clear
echo "Installing Nodejs"
curl -s https://deb.nodesource.com/setup_16.x | sudo bash
sudo apt install nodejs -y
clear
echo "Nodejs Installed"
clear
echo "Installing GIT"
sudo apt install git -y
clear
echo "GIT Installed"
sudo apt install snapd
sudo snap install core
sudo snap refresh core
snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
apt install nginx -y
sudo systemctl enable nginx