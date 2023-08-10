import React , {useRef, useState} from 'react'
import '../App.css'
import useAutosizeTextArea from '../service/useAutosizeTextArea';

const MainArea = ({title , setTitle, inputValue , setInputValue , pageNumber , setTitleIndexList}) => {
  const textAreaRef = useRef(null);  
  useAutosizeTextArea(textAreaRef.current,inputValue);
  
  const handleChange = (e) => {
    const val = e.target?.value
    setInputValue(val);

    var data = JSON.parse(localStorage.getItem('pageData'))
    for(var i = 0 ; i < data.length ; i++){
      if(i == pageNumber)
      {
          data[i].inputValue = val
      }
    }
    localStorage.setItem('pageData' , JSON.stringify(data));
  };

  const handleTitle = (e) => {
    console.log(pageNumber)
    const val = e.target?.value
    console.log(e.target.value)
    setTitle(val);

    var data = JSON.parse(localStorage.getItem('pageData'))
    var list = []
    for(var i = 0 ; i < data.length ; i++){
      if(i == pageNumber)
      {
        console.log(i)
          data[i].title = val
      }
      list.push([data[i].title , i])
    }

    setTitleIndexList(list)
    localStorage.setItem('pageData' , JSON.stringify(data));
  };

  return (
    <div className='subMainArea'>
         <textarea
            id="review-text"
            onChange={handleTitle}
            placeholder="Title...."
            rows={2}
            value={title}
            maxLength={100}
            className = "titleInput"  
        />
        <textarea
            id="review-text"
            onChange={handleChange}
            placeholder="Enter Text"
            ref={textAreaRef}
            rows={1}
            value={inputValue}
            className = "textInput"
            style={{overflow:"hidden"}}
        />
    </div>  
  )
}

export default MainArea