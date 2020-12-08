import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Dialog, Toolbar, Paper, Typography, Button, Checkbox, FormControl, FormControlLabel, TextField, InputLabel, MenuItem, Select, RadioGroup, Radio, FormLabel } from '@material-ui/core';
import { Form, Field } from "react-final-form";
import axios from "axios";

const MAX_SIZE = 20971520; // 20MB

const dzoneStyle = {
    display: 'flex',
    borderRadius: '20px',
    background: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexDirection: 'column',
    border: '4px dashed #4b9ec9',
    height: '150px',
    padding: '20px'
  };

class ErrorDialog extends Component {
    render() {
        let table = [];

        this.props.errors.forEach(function(obj) {
          let children = [];
          children.push(<td>{obj.name}: </td>);
          children.push(<td>{obj.reason}</td>);
          table.push(<tr>{children}</tr>)
        });
    
        return(
            <div>
                <Toolbar className="errorHeader">Upload Errors</Toolbar>
                <table className="errorTable">
                    <tbody>
                        {table}
                    </tbody>
                </table>
            </div>
        );
    };
}

class FileUploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showUploadError: false,
          uploadErrorMsgs: [],
          file: null,
          optIn: false,
          u1Age: null,
          u2Age: null,
          u1Lang: null,
          u2Lang: null,
          u1Gender: null,
          u2Gender: null,
          relationship: null
        };
    }

    onDrop = acceptedFiles => {
        console.log(acceptedFiles)
          // Initial FormData
          this.setState({file: acceptedFiles[0]});
          /*const formData = new FormData();
          formData.append("file", file);
          // Make an AJAX upload request using Axios
          return axios.post("localhost/uploadFile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          }).catch(error => {
            this.setState({
              uploadErrorMsgs: [...this.state.uploadErrorMsgs, {name: file.name, reason: error.response.data}],
              showUploadError: true});
          });*/
      }

      onDropRejected = rejectedFiles => {
        const sizeMsg = `The file exceeds the maximum size limit (${MAX_SIZE} bytes)`;
        const defaultMsg = "An error occurred during upload";
        var errorFiles = [];
        rejectedFiles.forEach(function(file) {
          if(file.size > MAX_SIZE) {
            errorFiles.push({
              name: file.name,
              reason: sizeMsg});
          }
          else {
            errorFiles.push({
              name: file.name,
              reason: defaultMsg});
          }
        });
        this.setState({
          uploadErrorMsgs: [...this.state.uploadErrorMsgs, ...errorFiles],
          showUploadError: true
        });
      }

      render() {
          return(
            <div style={{padding: '20px'}}>
                <Paper style={{maxWidth: 800}}>
                    <Typography>
                    Have you ever wondered how much you and your friends really text each other? What your most used emojis are? What you really talk about the most? Maybe you're curious just how much you really use "lol" compared to your friends.
                    </Typography>
                    <Typography>
                    With this tool, you can see all of these statistics and more. All you have to do is download your message history from either Telegram or WhatsApp, and upload it to this page. Don't worry! It will get sent to our server for analysis, but we won't keep your data unless you explicitly give us permission, and even then, it will be anonymized and only used for research purposes. Enjoy!
                    </Typography>
                </Paper>
                <Paper style={{padding: 10, maxWidth: 800}}>
                        <form onSubmit={(values) => console.log(this.state)}>
                            <div style={{border: '4px dashed #4b9ec9'}}>
                                <Dropzone 
                                    onDrop={this.onDrop}
                                    onDropRejected={this.onDropRejected}
                                    multiple={false}
                                    accept=".json,.txt"
                                    maxSize={MAX_SIZE}
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <Typography variant='h5'>Drag and drop your Telegram or WhatsApp file, or click to select</Typography>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                            <div style={{textAlign: 'left'}}>
                            <Typography>Selected file: {this.state.file ? this.state.file.name : ''}</Typography>
                            <FormControlLabel
                                control={<Checkbox 
                                    checked={this.state.optIn}
                                    onChange={(event) => {this.setState({optIn: event.target.checked})}}
                                    name='optIn'
                                    />}
                                label='Yes, you may save my file anonymously for research purposes. I understand that my data will never be sold or used for other purposes.'
                            />
                            </div>
                            {this.state.optIn ?
                            <div style={{width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column'}}>
                            <Typography variant='h6'>Please tell us a little bit more about yourself:</Typography>
                            <TextField 
                                type="number"
                                value={this.state.u1Age}
                                InputProps={{
                                    inputProps: { 
                                        max: 100, min: 1 
                                    }
                                }}
                                label="How old are you?"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            />
                            <TextField 
                                type="number"
                                value={this.state.u2Age}
                                InputProps={{
                                    inputProps: { 
                                        max: 100, min: 1 
                                    }
                                }}
                                label="How old is your conversation partner (interlocutor)?"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                            />
                            <FormControl>
                                <InputLabel id="u1-lang-label" shrink={true}>What is your native language?</InputLabel>
                                <Select
                                labelId="u1-lang-label"
                                id="u1-lang"
                                value={this.state.u1Lang}
                                onChange={(event) => {this.setState({u1Lang: event.target.value})}}
                                >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'sp'}>Spanish</MenuItem>
                                <MenuItem value={'it'}>Italian</MenuItem>
                                <MenuItem value={'ar'}>Arabic</MenuItem>
                                <MenuItem value={'ge'}>German</MenuItem>
                                <MenuItem value={'o'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel id="u2-lang-label" shrink={true}>What is your conversation partner's language?</InputLabel>
                                <Select
                                labelId="u2-lang-label"
                                id="u2-lang"
                                value={this.state.u2Lang}
                                onChange={(event) => {this.setState({u2Lang: event.target.value})}}
                                >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'sp'}>Spanish</MenuItem>
                                <MenuItem value={'it'}>Italian</MenuItem>
                                <MenuItem value={'ar'}>Arabic</MenuItem>
                                <MenuItem value={'ge'}>German</MenuItem>
                                <MenuItem value={'o'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">What is your gender?</FormLabel>
                                <RadioGroup row aria-label="gender1" name="u1Gender" value={this.state.u1Gender} onChange={(event) => {this.setState({u1Gender: event.target.value})}}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="nonbinary" control={<Radio />} label="Non-Binary" />
                                    <FormControlLabel value="na" control={<Radio />} label="Prefer not to answer" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">What is your conversation partner's gender?</FormLabel>
                                <RadioGroup row aria-label="gender2" name="u2Gender" value={this.state.u2Gender} onChange={(event) => {this.setState({u2Gender: event.target.value})}}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="nonbinary" control={<Radio />} label="Non-Binary" />
                                    <FormControlLabel value="na" control={<Radio />} label="Prefer not to answer" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">What type of relationship do you have?</FormLabel>
                                <RadioGroup row aria-label="relationship" name="relationship" value={this.state.relationship} onChange={(event) => {this.setState({relationship: event.target.value})}}>
                                    <FormControlLabel value="romantic" control={<Radio />} label="Romantic" />
                                    <FormControlLabel value="friendship" control={<Radio />} label="Friendship" />
                                    <FormControlLabel value="family" control={<Radio />} label="Family" />
                                    <FormControlLabel value="coworker" control={<Radio />} label="Coworker" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                            </div>
                            :''}
                            <Button type="submit">Analyze</Button>
                        </form>
                </Paper>
                <Dialog
                open={this.state.showUploadError}
                onClose={() => this.setState({showUploadError: false, uploadErrorMsgs: []})}
                style={{padding: "5px"}}
                >
                    <ErrorDialog errors={this.state.uploadErrorMsgs}/>
                </Dialog>
            </div>
          );
      }
}

export default FileUploadPage;
