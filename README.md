# Telegram and WhatsApp Analyzer

Have you ever wondered how much you and your friends really text each other? What your most used emojis are? What you really talk about the most? Maybe you're curious just how much you really use "lol" compared to your friends.

With this tool, you can see all of these statistics and more. All you have to do is download your message history from either Telegram or WhatsApp, and upload it to this page. If you're setting it up locally, you don't even need to worry about where your messages are being sent (because you'd be sending them to yourself) so have fun :)

### System overview
Frontend: Made using React, MaterialUI, Victory charts and a handful of other helpful libraries
Backend: Made using Python and Flask, using nltk and a handful of other libraries

### Data retrieval
The messages files uploaded to this tool will be saved in a folder called `uploads` inside the `server` directory. The metadata associated with the text messages will be saved to a `meta` folder inside the `server` directory. Both are stored in JSON format and are associated by filename.

### Getting Started

This project uses a React front end and a Python/Flask backend. You will need to have python3 installed and npm as prerequesites.

### Installation

Clone this repository onto your local machine or unzip the zip file of the repository into your desired directory.

In the `analyzer-ui` directory, run `npm install` to pull/install all the necessary React packages.

For the Python backend, the following installations will be required:

```
pip install emoji
pip install regex
pip install Flask
pip install flask-cors
pip install nltk
python -m nltk.downloader 'punkt'
python -m nltk.downloader 'stopwords'
```
Note: for a local pip installation/on a machine with both Python2 and Python3, use the following commands instead (this was the case for the VM used)

```
pip3 install --user emoji
pip3 install --user regex
pip3 install --user Flask
pip3 install --user flask-cors
pip3 install --user nltk
python3 -m nltk.downloader 'punkt'
python3 -m nltk.downloader 'stopwords'
```

### Configuration
There is very little configuration required to run this code. In fact, there is NO configuration required if you will be running this code on `localhost` with the React frontend running on port 3027 and the Python/Flask backend running on port 3011. If this is the case, skip this section.

If you want to run this code on a VM and want it to be accessible from other computers' browsers, you will need to navigate to `analyzer-ui/src/config.js` and change the API URL to the IP address of your VM and the port number of the Python/Flask backend.

By default, the React frontend will run on port 3027. If you would like to change this, go to `analyzer-ui/package.json` file and on line 25 where it says `"start": "set PORT=3027 && react-scripts start"` you can either remove setting the port number entirely (it will default to 3000) or change 3027 to another port number that suits you.

By default, the Python backend will run on port 3011. If you would like to change this, you may do so at run time by not including the `-p 3011` argument (see below).

### Running in a development environment
Running the front/backends requires 2 separate processes. So either open 2 terminal windows or know how to run background processes.

To start the React frontend/UI, navigate to the `analyzer-ui` directory and run `npm start`.
It will run on port :3027 due to current configurations (normally by default, npm uses port 3000) unless you have changed this in the `package.json` file as described above.

To start the Flask/Python backend, navigate to the `server` directory and run the following commands:
```
export FLASK_APP=jsonParser.py
export FLASK_ENV=development
flask run --host=0.0.0.0 -p 3011
```

The first `export` statement tells Flask what file to start up as "main".
The second `export` statement is technically optional (and obviously only for development) but lets Flask behave like React in that it will automatically reload without needing to stop and start the server if you save any code changes.
The third line starts up the server, makes it visible to IPs outside of localhost, and runs it at port 3011. If you do not wish to run it on port 3011, either remove the `-p 3011` argument entirely or change the port number (and adjust the `config.js` file on the frontend accordingly as described above).

### Running in production
We haven't set this up yet :)