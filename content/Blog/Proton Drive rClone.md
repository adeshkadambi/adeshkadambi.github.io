---
title: Mounting Proton Drive on Linux
date: 2024-11-15
---

Like many privacy-conscious users, I switched to Proton Drive for my cloud storage needs. I have multiple devices, a MacBook, an iPhone, a Windows desktop, and a Linux desktop. And while Proton Drive plays nice with most of my devices, one thing drove me crazy - no Linux client. I found myself constantly juggling between the web interface and my local files, downloading things ad-hoc whenever I needed them. It got so frustrating that I started reaching for my MacBook whenever I needed to work with files on my drive. After some digging, I discovered rclone - a command-line tool that can mount cloud storage as a local folder. Here's how I set it up...

# rclone Setup

First, I installed rclone:

```bash
sudo -v ; curl https://rclone.org/install.sh | sudo bash
```

Then, I configured my Proton Drive remote using `rclone config`. The setup was straightforward - I chose a new remote, named it "proton", selected Proton Drive from the storage options (number 42), and entered my credentials including 2FA.

```bash
rclone config

# make a new remote
n/s/q> n

# name the remote
name> proton

# choose the number for Proton Drive
Storage> 42

# enter username
user> you@proton.me

# select type in your own password & then type in password
y/g/n> y

# enter 2fa code
2fa> 123456

# keep the remote
y/e/d> y
```

I created a simple mount point:

```bash
mkdir ProtonDrive
```

At this point, I could just run the following command and I'd be good to go:

```bash
rclone mount proton: ProtonDrive --vfs-cache-mode writes
```

Except, this means I would have to re-run this script every time I boot up my system. Let's set up automatic mounting at startup.

# Automatic Mounting

Create a systemd service file:

```bash
sudo nvim /etc/systemd/system/rclone-proton.service
```

Add the following content to the file:

```ini
[Unit]
Description=Proton Drive Mount
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/bin/rclone mount proton: /home/YOUR_USERNAME/ProtonDrive --vfs-cache-mode writes
Restart=on-failure
User=YOUR_USERNAME

[Install]
WantedBy=multi-user.target
```

> [!TIP]
> Make sure you replace `YOUR_USERNAME` with your own user name.

Finally, I enabled and started the service:

```bash
sudo systemctl enable rclone-proton
sudo systemctl start rclone-proton
```

Check the status of the service:

```bash
systemctl status rclone-proton

# this should output something like..

● rclone-proton.service - Proton Drive Mount
     Loaded: loaded (/etc/systemd/system/rclone-proton.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2024-11-27 17:11:49 EST; 43ms ago
   Main PID: 143365 (rclone)
      Tasks: 26 (limit: 76030)
     Memory: 15.4M
        CPU: 47ms
     CGroup: /system.slice/rclone-proton.service
             └─143365 /usr/bin/rclone mount proton: /home/<username>/ProtonDrive --vfs-cache-mode writes
```

Now my Proton Drive automatically mounts at startup! No more switching to my MacBook or dealing with the web interface - my files are right where I need them, when I need them.
