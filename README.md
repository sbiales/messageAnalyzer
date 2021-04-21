# Telegram and WhatsApp Analyzer

Have you ever wondered how much you and your friends really text each other? What your most used emojis are? What you really talk about the most? Maybe you're curious just how much you really use "lol" compared to your friends.

With this tool, you can see all of these statistics and more. All you have to do is download your message history from either Telegram or WhatsApp, and upload it to this page. If you're setting it up locally, you don't even need to worry about where your messages are being sent (because you'd be sending them to yourself) so have fun :)

## Getting Started

This project uses a React front end and a Python/Flask backend. You will need to have python3 installed and npm.

### Installation

Clone this repository onto your local machine.

In the `analyzer-ui` directory, run `npm install` to pull/install all the necessary React packages.

For the Python backend, the following installations will be required:

```
pip install emoji
pip install regex
pip install Flask
pip install flask-cors
pip install nltk
python -m nltk.downloader 'punkt'
```
Note: for a local pip installation/on a machine with both Python2 and Python3, use the following commands instead

```
pip3 install --user emoji
pip3 install --user regex
pip3 install --user Flask
pip3 install --user flask-cors
pip3 install --user nltk
python3 -m nltk.downloader 'punkt'
```

### Running in a development environment
Running the front/backends requires 2 separate processes. So either open 2 terminal windows or know how to run background processes.

To start the React frontend/UI, navigate to the `analyzer-ui` directory and run `npm start`.
It will run on port :3027 due to current configurations (normally by default, npm uses port 3000)

To start the Flask/Python backend, navigate to the `server` directory and run the following commands:
```
export FLASK_APP=jsonParser.py
export FLASK_ENV=development
flask run --host=0.0.0.0 -p 3011
```

The first `export` statement tells Flask what file to start up as "main".
The second `export` statement is technically optional (and obviously only for development) but lets Flask behave like React in that it will automatically reload without needing to stop and start the server if you save any code changes.
The third line starts up the server, makes it visible to IPs outside of localhost, and runs it at port 3011

### Running in production
We haven't set this up yet :)