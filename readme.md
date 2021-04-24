# ManagmentSystem by BraveSquirrels



### Table of Contents
* [General Info](#generalinfo)
* [Technologies](#technologies)
* [Requirements](#requirements)
* [Setup](#setup)
* [Resources](#resources)
* [Documentation](#documentation)


### General Info
-----------------
Winning hackathon? For sure we are! But first things first, We are glad to announce that since today, you can use our new Application "**Team Star**",
to make your every day work-life even more organised! We took care both of employees, and their supervisors! Don;t worry, you won't be working too much, and your employees will be relaxed for sure!!

Be our guest, fasten your seatbelts, and see what we've got for you!

**Check it out on youtube!**<br></br>
[![TeamStart by BraveSquirrels](http://img.youtube.com/vi/sxfl5vBYFOk/0.jpg)](http://www.youtube.com/watch?v=sxfl5vBYFOk)

**If you don't want to run our project locally, you do not have to read anything more, be our guest, and visit our <a href="https://teamstar2021.herokuapp.com/">site!</a>**
We although suggest you to read the documentation first, so you can get as much as possible!

### Technologies
-----------------
Project is created with:
* TypeScript
* Node.js
* Express.js
* React
* Redux
* Redux-Thunk
* MongoDB

### Requirements
-----------------
To be able to run our project locally, you need to have installed **yarn package manager**
If you do not know if you have it installed on your computer and you still want to run our project follow these steps:

#### Windows command prompt/Linux bash

##### Run *npm -v*
* *If you received a number like 'x.x.x' you already have installed* **npm package manager** *on your computer and you can follow the next part, which is installing **yarn**
* *Otherwise, you will have to install it, the best way to do it is installing it globaly by running the command **npm install npm@latest -g***
* *After that you can run again the command from the first line just to confirm that you have succesfully installed required* **package manager**
##### Install yarn
* *To install yarn* **package manager (faster vesrion of npm)** *run the commnad **npm install --global yarn***
* *confirm yarn install by tpying command **yarn --version***

### Setup
-----------------
#### DataBase
* *To run the project locally you will have to create your own MongoDB Atlas account, and have your own cluster/db created* <a href="https://www.mongodb.com/cloud/atlas/register">*here*</a>
#### To run the project locally follow these steps:
* *Clone this repository*
* *Open repository in your code editor*
* *Run command **yarn dev:i***
* *Create .env file within the server catalog, this file should contain important information which lack of will cause fatal errors.*</br></br>
**this is the data that you should add into .env file:**</br></br>
MONGO_USER=\<you user name></br>
MONGO_PASSWORD=\<your user password></br>
MONGO_DB_NAME=\<your db name></br>
PORT=5000 < Leave it like that!</br>
ADDRESS=localhost < Leave it like that!</br>
JWT_PRIVATE_KEY=\<some random password></br>
EMAIL=\<your email></br>
PASSWORD=\<your email's password></br></br>
(PS your email must be an yahoo email, it's complicated, trust me... If you do not however, don't mind visiting <a href="https://nodemailer.com/about/">this</a> site )</br></br>
* *Run command **yarn dev***
* *Enter the local host that was created which should be at **http://localhost:3000/***
* **_You can now use our fully functional application!_***

### Documentation
#### Registration
* In order to use our application, you need to create an account, don't worry, we are not collecting any personal data :)
![](images_for_github/register.png)
#### Afther that, you can create your own team, or join your friends!
![](images_for_github/createTeam.png)
![](images_for_github/joinTeam.png)
#### Core benefits of our app are:
* Live chat with coworkers in team!
![](images_for_github/chatScreem.png)
* Live monitoring of work time!
![](images_for_github/liveTimeScreen.png)
* Live meetings callendar!
![](images_for_github/calendarScreen.png)
