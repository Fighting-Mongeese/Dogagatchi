# Dogagatchi+ 

Dogagatchi+ combines trivia, collecting and caretaking game components to create an immersive dog-owning experience.

# Starting the app locally
### Install dependencies
> npm install

### Compile with webpack
> npm run build

### Start express server
> npm run start

# Database
The database is hosted on MongoDB's Atlas service. The uri to connect to the database from the app is stored as an environment variable in the untracked .env file in the root folder; the uri is loaded into the database connection method through the server's config.js file.

MongoDB's Atlas service requires the whitelisting of IP addresses that are allowed access to the database. To add IP addresses to the whitelist, go to the project's page on Atlas' site (cloud.mongodb.com), and use the sidebar navigation to go to Network Access, located under the Security tab.  For local development, add your personal IP address to the whitelist. For deployment, add the VM's public IP address once the instance is spun up.

# Deployment
Deploy to an AWS EC2 Ubuntu with the following steps:

### 1. Set up AWS root account
### 2. Launch an Ubuntu instance
Provide a project name, select a free option, and create a new key pair for SSH access (see Shortly Deploy instructions for clarity if needed), and save the key where you can find it. Create a new security group, then skip configuring ssh and IP access for now-we'll do it in a sec. Lastly, click 'Launch instance' in the lower-right corner of the screen.

### 3. Change firewall rules
Navigate to the 'Instance summary' in AWS and click on the Security tab about halfway down the page. Then click the link to access the Security Group that contains the firewall rules for the instance ("sg-somethingSomethingSomething" or similar). Then click 'Edit inbound rules', and add the three rules below:

|     TYPE      |  PORT RANGE   |     SOURCE    |      WHY?    |
| ------------- | ------------- | ------------- | ------------ |
| SSH           |  22           | Local-Dev-IP/32  |  SSH into instance from your computer |
| Custom TCP    | server port (eg, 8080, 4000)  | 0.0.0.0/0 | User access from internet |
| Custom TCP    | 27017         |  VM-public-IP/32 | VM access to cloud Mongo db |

Now that SSH access is enabled, we'll connect to the instance and set it up to host the app.

### 4. Connect to instance
Instructions for connecting to the instance can be found by clicking Connect in the menu at the top of the instance panel.

SSH into the instance by using either OpenSSH or Putty.

AWS suggests running 'chmod 400 your-Key.pem' from the folder in which the key is located to ensure the key is private. A typical OpenSSH command to access the instance from that same directory location is below:

> ssh -i "your-Key.pem" ubuntu@public-DNS-Address

The public DNS address typically ends with 'compute.amazonaws.com'.

### 5. Install nvm and node
We're more or less following the steps outlined in Shortly Deploy to install nvm and node. The instance already comes with git, so we don't need to install that.

For nvm:

> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

After running the above command to install nvm, you'll be prompted to run three more commands to get nvm working:

> export NVM_DIR="$HOME/.nvm"  
> [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
> [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  

 The app was developed with version 20.9 of Node, so install it to the instance.

 > nvm install v20.9.0

Double-check versions with the following commands:

  >git --version  
  >nvm --version  
  >node --version  
  >npm --version  

### 6. Clone repo, download dependencies, configure db

From the instance's root folder, clone down the app's repo from Github.

> git clone https//:github.com/use-Name/repo-Name

Then cd into the app's folder and install the project's dependencies.

> npm install

To load the database connection in deployment, run the following command from the VM's command line:

> export ATLAS_URI=mongodb+srv://database-User:database-Password@database-Cluster>>.mongodb.net/database-Name

Check out https://www.mongodb.com/docs/manual/reference/connection-string/#std-label-connections-connection-examples for more.

### 7. Build the app, start the server, and access

Run the following commands to build the app and start the server:

> npm run build  
> npm run start

Make sure you've whitelisted your VM's public IP address in MongoDB Atlas. You can now navigate to the instance using the following url format:

> http://public-IP-Address-Of-Instance:server-Port



