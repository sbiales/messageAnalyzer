import React, { Component } from 'react';
import { Typography, Paper } from '@material-ui/core';
import telegram1 from '../images/Telegram1.png';
import telegram2 from '../images/Telegram2.png';

class HowTo extends Component {
    render() {
        return(
            <Paper style={{width:'80%', padding: 10}}>
                <Typography variant='h4' style={{margin: 15}}>How to download your WhatsApp conversation</Typography>
                <Typography variant='body1' style={{flexGrow: 1, textAlign: 'justify'}}>
                    IMPORTANT: You may experience problems if you are in Germany. WhatsApp removed this feature from the German app sadly.
                </Typography>
                <Typography variant='body1' style={{flexGrow: 1, textAlign: 'justify'}}>
                    Open the chat you would like to export. Select the three dots, then "More", then "Export Chat". Do not choose to attach media. It will then send you an email with your WhatsApp data in a .txt file.
                </Typography>

                <Typography variant='h4' style={{margin: 15}}>How to download your Telegram conversation</Typography>
                <Typography variant='body1' style={{flexGrow: 1, textAlign: 'justify'}}>
                    From the desktop Telegram application, open the chat you'd like to export. At the top, select the three dots. This should open up a menu with the option to "Export chat history".
                </Typography>
                <img alt='telegram1' src={telegram1}/>
                <Typography variant='body1' style={{flexGrow: 1, textAlign: 'justify'}}>
                    On the "Chat export settings" menu, uncheck all options (including stickers, which will still register as their corresponding emoji in the analysis). You may also select a date range. Be aware that our code has a limit of 20MB for the file size.
                </Typography>
                <Typography variant='body1' style={{flexGrow: 1, textAlign: 'justify'}}>
                    IMPORTANT: Make sure you select JSON as the format, as our program cannot read the HTML file.
                </Typography>
                <img alt='telegram1' src={telegram2}/>
            </Paper>
        );
    }
}

export default HowTo;