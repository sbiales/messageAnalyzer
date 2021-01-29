import json
import emoji
import regex
import re
import os
import time
from flask import Flask, request
from flask_cors import CORS
import sys

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'uploads')
TMP_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'temp')
META_FOLDER = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'meta')
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['TMP_FOLDER'] = TMP_FOLDER
app.config['META_FOLDER'] = META_FOLDER

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    optIn = request.form['optIn']
    filename =  str(time.time()) + '.json'
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.mkdir(app.config['UPLOAD_FOLDER'])
    if not os.path.exists(app.config['META_FOLDER']):
        os.mkdir(app.config['META_FOLDER'])
    if not os.path.exists(app.config['TMP_FOLDER']):
        os.mkdir(app.config['TMP_FOLDER'])
    
    if file:            
        filetype = file.filename.split('.')[-1]
        content = file.read().decode('utf-8')
        messages = []
        # Preprocess the file before saving
        if filetype == 'json':
            #messageJson = json.load(file)
            messageJson = json.loads(content)
            messages = preprocessTelegram(messageJson['messages'])
        elif filetype == 'txt':
            #messages = preprocessWhatsApp(file.readlines())
            messages = preprocessWhatsApp(content)
        
        if optIn is True:
            newFile = open(os.path.join(app.config['UPLOAD_FOLDER'], filename), 'w')
            json.dump(messages, newFile)
            newFile.close()
            
            # Save metadata
            with open(os.path.join(app.config['META_FOLDER'], filename), 'w') as metaFile:
                  data = {}
                  data['user1'] = json.loads(request.form['user1'])
                  data['user2'] = json.loads(request.form['user2'])
                  data['relationship'] = request.form['relationship']
                  json.dump(data, metaFile)
            return filename, 200
        else:
            #print(len(messages), file=sys.stderr)
            newFile = open(os.path.join(app.config['TMP_FOLDER'], filename), 'w')
            json.dump(messages, newFile, indent=2)
            newFile.close()
            return filename, 200
    return 'No file uploaded', 400

def preprocessTelegram(messages):
    cleanMessages = []
    for m in messages:
        if m['type'] != 'message':
            continue
        cleanM = {}
        cleanM['from'] = m['from_id']
        datetime = m['date'].split('T')
        cleanM['date'] = datetime[0]
        cleanM['time'] = datetime[1]
        if 'sticker_emoji' in m:
            #m['sticker_emoji'] = emoji.demojize(m['sticker_emoji'])
            m['text'] =  m['sticker_emoji']
            #print(m)
        if 'text' in m and type(m['text']) is list:
                multiPart = m['text']
                text = ''
                for part in multiPart:
                    if type(part) is str:
                        text += part
                    elif type(part) is dict and 'text' in part:
                        text += ' ' + part['text'].replace('\n', ' ')
                cleanM['text'] = text
        elif 'text' in m:
            cleanM['text'] = m['text'].replace('\n', ' ')
        cleanMessages.append(cleanM)
    return cleanMessages

def preprocessWhatsApp(chatText):
    chatText = chatText.split('\n')
    mediaRE = re.compile(r"(\<Media omitted\>)")
    lineMetaRE = re.compile(r"(\d+\/\d+\/\d+),*\s(\d+:\d+)\s*(\w*)\s-\s(.*):\s")
    
    messages = []
    message = {}
    for line in chatText:
        line = line
        line = mediaRE.sub('', line)
        # print(line)
        match = lineMetaRE.match(line)
        if match:
            # If we match, it's the start of a new message, append the last and start a new one
            if 'text' in message:
                messages.append(message)
                message = {}
            time = match.group(2)
            if match.group(3) == 'pm':
                timeArr = time.split(':')
                time = str(int(timeArr[0]) + 12) + ':' + timeArr[1]
            
            message['date'] = match.group(1)
            message['time'] = time
            message['from'] = match.group(4)
            message['text'] = lineMetaRE.sub('', line).replace('\n', ' ')
        elif 'text' in message:
            message['text'] += line
    return messages
    

def getTextContent(m):
    if 'text' in m:
        #m['text'] = emoji.demojize(m['text'])
        return m['text']
    if 'sticker_emoji' in m:
        #m['sticker_emoji'] = emoji.demojize(m['sticker_emoji'])
        return m['sticker_emoji']
    print(m)

def organizeByDate(messages):
    dateDict = {}
    for m in messages:
        from_id = m['from_id']
        date = m['date']
        dateDict.setdefault(date, {}).setdefault(from_id, []).append(m['text'])
        dateDict[date].setdefault('total', 0)
        dateDict[date]['total'] += 1
    return dateDict


def organizeByHour(messages):
    hourDict = {}
    for m in messages:
        hour = m['time'].split(':')[0]
        hourDict.setdefault(hour, 0)
        hourDict[hour] += 1
    return hourDict

def extractEmoji(messages):
    textList = [m['text'] for m in messages]
    text = ' '.join(textList)
    emojiList = []
    data = regex.findall(r'\X', text)
    for word in data:
        if any(char in emoji.UNICODE_EMOJI for char in word):
            emojiList.append(word)
    grouped = list(set([(el, emojiList.count(el)) for el in emojiList]))
    grouped.sort(key=lambda x: x[1], reverse=True)
    return grouped

# =============================================================================
# with open('C:\\Users\\siena\\Downloads\\Telegram Desktop\\ChatExport_2020-11-23\\filip.json', 'r', encoding='utf-8') as file:
# #with open('.\\test.json', 'r', encoding='utf-8') as file:
#     messageJson = json.load(file)
#     messages = messageJson['messages']
# 
#     # Data preprocessing
#     messages = preprocess(messages)
#     users = list({m['from_id'] for m in messages})
#     user1Messages = [m for m in messages if m['from_id'] == users[0]]
#     user2Messages = [m for m in messages if m['from_id'] == users[1]]
# 
# ##    with open('user1.txt', 'w', encoding='utf-8') as u1:
# ##        for t in user1Messages:
# ##            u1.write(t + '\n')
# ##    with open('user2.txt', 'w', encoding='utf-8') as u2:
# ##        for t in user2Messages:
# ##            u2.write(t + '\n')
# ##    with open('total.txt', 'w', encoding='utf-8') as totalFile:
# ##        for m in messages:
# ##            totalFile.write(str(m['from_id']) + ': ' + m['text'] + '\n')
# 
#     # Graph of texts per day (from each person)
#     daySorted = organizeByDate(messages)
#     #print(daySorted)
# 
#     # Chart of hours of the day that you text most frequently
#     hourSorted = organizeByHour(messages)
#     #print(hourSorted)
#     print('Most frequent texting hour: ' + max(hourSorted, key=lambda key: hourSorted[key]))
#     
#     # Average texts per day
#     totalDays = len(daySorted.keys())
#     totalTexts = sum(list({day['total'] for day in daySorted.values()}))
#     avgTextsPerDay = totalTexts/totalDays
#     print('Average texts per day: ' + str(int(avgTextsPerDay)))
# 
#     # Average words per day?
# 
#     # Average words per text
# 
# 
#     # Favorite emoji
#     
#     #print(user2Messages)
#     user1Emoji = extractEmoji(user1Messages)
#     print(str(users[0]) + ': ')
#     print(user1Emoji[:25])
# 
#     user2Emoji = extractEmoji(user2Messages)
#     print(str(users[1]) + ': ')
#     print(user2Emoji[:25])
# 
#     # Most frequent words/collocations
# 
# =============================================================================
