import json
import emoji
import regex

def preprocess(messages):
    # Change all from names to User1 and User2
##    users = list({m['from'] for m in messages})
##    print(users)
##    if len(users) > 2:
##        print('This analysis does not yet work for group chats. Please upload a personal conversation')
##    for m in messages:
##        m['from'] = m['from'].replace(users[0], 'User1').replace(users[1], 'User2')

    # Better solution? Remove all from keys and base it only off of from_id
    cleanMessages = []
    for m in messages:
        if m['type'] != 'message':
            continue
        m.pop('from', None)
        datetime = m['date'].split('T')
        m['date'] = datetime[0]
        m['time'] = datetime[1]
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
                        text += ' ' + part['text']
                    else:
                        print('HERE ' + part)
                m['text'] = text
        cleanMessages.append(m)
    return cleanMessages


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

with open('C:\\Users\\siena\\Downloads\\Telegram Desktop\\ChatExport_2020-11-23\\filip.json', 'r', encoding='utf-8') as file:
#with open('.\\test.json', 'r', encoding='utf-8') as file:
    messageJson = json.load(file)
    messages = messageJson['messages']

    # Data preprocessing
    messages = preprocess(messages)
    users = list({m['from_id'] for m in messages})
    user1Messages = [m for m in messages if m['from_id'] == users[0]]
    user2Messages = [m for m in messages if m['from_id'] == users[1]]

##    with open('user1.txt', 'w', encoding='utf-8') as u1:
##        for t in user1Messages:
##            u1.write(t + '\n')
##    with open('user2.txt', 'w', encoding='utf-8') as u2:
##        for t in user2Messages:
##            u2.write(t + '\n')
##    with open('total.txt', 'w', encoding='utf-8') as totalFile:
##        for m in messages:
##            totalFile.write(str(m['from_id']) + ': ' + m['text'] + '\n')

    # Graph of texts per day (from each person)
    daySorted = organizeByDate(messages)
    #print(daySorted)

    # Chart of hours of the day that you text most frequently
    hourSorted = organizeByHour(messages)
    #print(hourSorted)
    print('Most frequent texting hour: ' + max(hourSorted, key=lambda key: hourSorted[key]))
    
    # Average texts per day
    totalDays = len(daySorted.keys())
    totalTexts = sum(list({day['total'] for day in daySorted.values()}))
    avgTextsPerDay = totalTexts/totalDays
    print('Average texts per day: ' + str(int(avgTextsPerDay)))

    # Average words per day?

    # Average words per text


    # Favorite emoji
    
    #print(user2Messages)
    user1Emoji = extractEmoji(user1Messages)
    print(str(users[0]) + ': ')
    print(user1Emoji[:25])

    user2Emoji = extractEmoji(user2Messages)
    print(str(users[1]) + ': ')
    print(user2Emoji[:25])

    # Most frequent words/collocations
