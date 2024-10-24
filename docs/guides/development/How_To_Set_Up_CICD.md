# Create user for SSH
Created a new user with SSH permissions

# Set up Node on Dreamhost server
Used this guide to install nvm:
https://help.dreamhost.com/hc/en-us/articles/360029083351-Installing-a-custom-version-of-NVM-and-Node-js

Setting up Node 20.11.1
This is the highest LTS as of 3/11/2024
We would need at least 18.17.0 for some compatibility

# Create private key
Used this guide for creating private keys with GitHub Actions:
https://blog.benoitblanchon.fr/github-action-run-ssh-commands/

# Ensured the use of known_hosts for better security
Verified configuration using:
https://en.wikibooks.org/wiki/OpenSSH/Client_Configuration_Files#/etc/ssh/ssh_known_hosts

# FollowUp
Let GitHub Copilot generate the next few steps based upon comments
<b>THESE WILL NEED TO BE CHANGED AS I KNOW THEY ARE INCORRECT.</b>
I needed to move on for the day and want to save the current progress.

# Create the nodesrver.service
Modify the guide here:
https://help.dreamhost.com/hc/en-us/articles/23971547819412-Using-linger-with-Gunicorn
In order to link to a nodeserver

# Notes:
We are running SSH commands as currently set up. This should have a security doublecheck that I haven't overlooked a security concern.

See:
https://stackoverflow.com/questions/52787410/start-node-app-through-ssh-stays-running
https://forum.level1techs.com/t/how-to-start-a-server-via-ssh-and-leave-it-running/117603
https://help.dreamhost.com/hc/en-us/articles/217955787-Proxy-Server

