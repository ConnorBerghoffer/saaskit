#!/bin/bash

set -e

echo "=== Raspberry Pi Tailscale & WiFi Setup ==="
echo ""

if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root or with sudo"
    exit 1
fi

echo "1. Installing Tailscale..."
curl -fsSL https://tailscale.com/install.sh | sh

echo ""
echo "2. Starting Tailscale..."
tailscale up

echo ""
echo "3. Tailscale is now running. Please authenticate in the browser."
echo "   Your device will appear in Tailscale admin console."
echo ""

read -p "Press Enter once Tailscale is authenticated..."

echo ""
echo "4. Checking Tailscale status..."
tailscale status

echo ""
echo "5. Setting up WiFi..."
echo "   Please provide your staff WiFi details:"
read -p "WiFi SSID: " WIFI_SSID
read -sp "WiFi Password: " WIFI_PASSWORD
echo ""

if command -v nmcli &> /dev/null; then
    echo "Using nmcli to configure WiFi..."
    nmcli device wifi connect "$WIFI_SSID" password "$WIFI_PASSWORD"
elif [ -f /etc/netplan/50-cloud-init.yaml ]; then
    echo "Configuring WiFi via netplan..."
    cat >> /etc/netplan/50-cloud-init.yaml <<EOF
    wifis:
      wlan0:
        dhcp4: true
        access-points:
          "$WIFI_SSID":
            password: "$WIFI_PASSWORD"
EOF
    netplan apply
elif [ -f /etc/wpa_supplicant/wpa_supplicant.conf ]; then
    echo "Configuring WiFi via wpa_supplicant..."
    wpa_passphrase "$WIFI_SSID" "$WIFI_PASSWORD" >> /etc/wpa_supplicant/wpa_supplicant.conf
    systemctl restart wpa_supplicant
else
    echo "Could not detect WiFi configuration method. Please configure manually."
fi

echo ""
echo "6. Enabling Tailscale to start on boot..."
systemctl enable tailscaled
systemctl enable tailscale

echo ""
echo "7. Final status check..."
echo "Tailscale IP:"
tailscale ip -4
echo ""
echo "WiFi connection:"
ip addr show wlan0 2>/dev/null || iwconfig 2>/dev/null | grep -i wlan || echo "Check WiFi status manually"

echo ""
echo "=== Setup Complete ==="
echo "Your Raspberry Pi should now be:"
echo "  - Connected to Tailscale (check admin console for IP)"
echo "  - Connected to staff WiFi"
echo "  - Accessible via Tailscale from anywhere"

