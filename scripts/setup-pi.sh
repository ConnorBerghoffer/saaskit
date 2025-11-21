#!/bin/bash

set -e

PI_USER="belton"
PI_PASSWORD="belton"
WIFI_SSID="ICESTAFF"
WIFI_PASSWORD="@ccessICEh0use"
SSH_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCuzTV2cOaXooMoiWGjqlbxy3gAdNCy4f687dTjhE492d/kca3GBQ0FRYEedZokndO4Vy2PPelwD3rKC56vHXxesQkWQ6bgmAP1j+4AJj828Rcul5VVhrdYKVejDMh7755TiverRhhYEocX8csL6NJsnATtTiewKt+Bohjn9iAhWJHDOxGpMwmFthZopjsGhTiNlFHBDovmPda5nLXO2j0DdeaQiyp3nMwwqgTNt0ONnFkMtiLKcDfi1kwGyd4oJEzZgrYukFjSCCC7lTme8Tx5yl5xSN0Xed8jNoqQJwhYLzD4fnUP2xe68uAQaUVxyrFvYVJOdE241w+HUpR9n6jSY9SV2RmfBbaQz2/R4oYKj4tGSgpeNW3Jjj8vLQCbemvADRvpl4W53VdyBcogFy/9PhrbzHPQ6IowYU6Yn4ASVXLo39faMZ465Ey52SvfcoXiLhIGKTfrNZg3P+6w9rH7KJfpfYiGrfr2Dmsfejv6N8HyR/NI6jrM7t1M/3amhyTmD5Qzd9H8BqXX43wa7dodfTo1ahXRf0SeRP0wVUsdZU+4fXt/RmCRYlxyrSry2x5ZqGAyq8NycGJadC7ch7UF2Vdadyn92DWc2Y9S4l8Kg6pm6Li1hicPEq1jLbSQg6YM163b10aa8tDzh04CNJl1YSwhQL19m9cLqq2seIWrMw== connorberghoffer@Connors-MacBook-Pro.local"

echo "🔍 Scanning for Raspberry Pi..."
echo ""

PI_IP=""

for i in {1..254}; do
    ip="169.254.126.$i"
    if ping -c 1 -W 1000 "$ip" >/dev/null 2>&1; then
        echo "✅ Found device at $ip"
        if ssh -o ConnectTimeout=2 -o StrictHostKeyChecking=no "$PI_USER@$ip" "echo 'SSH works'" 2>/dev/null; then
            PI_IP="$ip"
            echo "✅ SSH connection successful to $PI_IP"
            break
        fi
    fi
done

if [ -z "$PI_IP" ]; then
    echo "❌ Could not find Raspberry Pi"
    echo ""
    echo "Please ensure:"
    echo "1. Pi has finished booting (first boot can take 2-3 minutes)"
    echo "2. Internet Sharing is enabled:"
    echo "   System Settings > General > Sharing > Internet Sharing"
    echo "   Share from: Wi-Fi"
    echo "   To computers using: [Your USB Ethernet adapter]"
    echo "3. Ethernet cable is properly connected"
    exit 1
fi

echo ""
echo "🔧 Configuring Raspberry Pi..."
echo ""

ssh -o StrictHostKeyChecking=no "$PI_USER@$PI_IP" <<EOF
set -e

echo "📦 Updating system..."
sudo apt-get update -qq

echo "🔐 Setting up SSH key..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "$SSH_KEY" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

echo "📡 Configuring WiFi..."
sudo tee /etc/wpa_supplicant/wpa_supplicant.conf > /dev/null <<WPAEOF
country=NZ
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="$WIFI_SSID"
    psk="$WIFI_PASSWORD"
}
WPAEOF

echo "🔄 Restarting network services..."
sudo systemctl restart networking 2>/dev/null || sudo systemctl restart wpa_supplicant 2>/dev/null || true

echo "✅ Configuration complete!"
echo ""
echo "System info:"
uname -a
echo ""
echo "Network interfaces:"
ip addr show | grep -E "^[0-9]+:|inet " || ifconfig | grep -E "^[a-z]|inet "
EOF

echo ""
echo "🎉 Raspberry Pi setup complete!"
echo "IP Address: $PI_IP"
echo ""
echo "You can now connect via:"
echo "  ssh $PI_USER@$PI_IP"

