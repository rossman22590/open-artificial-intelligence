/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress } from '@mui/material';

//controller or integrations
import {  chatOpenAI } from '../../controllers/openAI';

const style = (width="300px", height="32px") => css`
  .MuiInputBase-input{
    width: ${width};
    height: ${height} !important;
  }

  .MuiInputBase-root {
    margin-bottom: 40px;
  }
`

const wrapper = () => css`
  padding: 30px;
  box-sizing: border-box;
  width: 650px;

  .sendButton{
    margin-bottom: 20px;
    width: 80px;
    height: 40px;
  }

  .box{
    min-width: 120m;
    width: 100%;
    margin-bottom: 20px;
  }

  .textArea {
    &.MuiFormControl-root {
      width: 90%;
    }
  }

  .title {
    margin: 0px;
  }

  .subTitle {
    margin-top: 0px;
  }
  
  @media(max-width: 650px) {
    width: 100%;
    padding: 20px;
  }
`
const footer = css `
height: 38px;
background-color: #F2F2F2;
border-top: none;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
bottom: 0;
width: 100%;

a.text {
  display: flex;
  align-items: center;
  gap: 3.75px;
  color: #8a8a8a;
  font-size: 10px;
  text-decoration: none;
}

@media(max-height: 600px) {
  position: relative;
  margin-top: 30px;
}
`
const container = css `
  display: flex;
`



const OpenAi = () => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("")
  const [questionSelected, setQuestionSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const lists = [
    {
      id: 0,
      description: 'Top 5 most frequently asked questions in a topic '
    },
    {
      id: 0,
      description: 'Generate a promotional text of a product '
    },
    {
      id: 1,
      description: 'Generate a text with the qualities of a product '
    },
    {
      id: 2,
      description: 'Generate a testimonial about the use of a product '
    },
    {
      id: 3,
      description: 'Generate product names for a product '
    }
  ];

  const handlerSend = async() => {
    var newQuestion = `${questionSelected} ${question}`;
    setLoading(true);
    const response = await chatOpenAI({question: newQuestion})
    setLoading(false);
    console.log(response)
    setAnswer(response);
  }

  const handleChange = (event) => {
    setQuestionSelected(event.target.value);
  }

  return (
    <div className="wrapperForm">
      <Box css={container}
      >
      <Paper elevation={3}>
        <div className='wrapperMain' css={wrapper}>
          <h2 className="title" >Hi! I'm Laura :-)</h2>
          <h3 className="subTitle">I'm learning to answer your questions. Give me a try ...</h3>
          <Box className="box">
            <FormControl fullWidth>
              <InputLabel >Questions</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={questionSelected}
                label="questionSelected"
                onChange={handleChange}
              >
                 {
                  lists.map((element, index) =>
                    <MenuItem selected value={element.description} key={element.description}>{element.description}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </Box>
          <TextField
            label="Topic/product"
            variant="outlined"
            onChange={(event) => setQuestion(event.target.value)}
            css={style("250px", "")}
          />
           
            <Button
              className="sendButton"
              variant="contained"
              onClick={handlerSend}
              disabled={loading}
            >
                
              { loading ? <CircularProgress size={24} />: "Send" }
            </Button>
          
          <TextField
            className="textArea"
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={answer}
            css={style("100%", "250px")}
          />
        </div>
      </Paper>
    </Box>
    <span css={footer}>
      <a className="text" href="https://bucket.io" target="_blank" rel="noreferrer">
        Powered By <img src="https://preview.qa.bucketdevelopment.com/static/media/footer-icon-bucket.d09f50c4.svg" alt="logo-footer"/>
        <b>Bucket.io</b>
      </a>
    </span>
    </div>
  );
}

export default OpenAi;
