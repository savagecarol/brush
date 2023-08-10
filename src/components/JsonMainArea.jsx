import React from 'react'
import '../App.css';
import JSONPretty from 'react-json-pretty'


const JsonMainArea = ({ jsonValue , setJsonValue , pageNumber , prettyJson , handleJsonPretty}) => {

  const handleJsonChange = (e) => {
    const val = e.target?.value
    setJsonValue(val)  
    handleJsonPretty(val)
    var data = JSON.parse(localStorage.getItem('pageData'))
    for(var i = 0 ; i < data.length ; i++){
      if(i == pageNumber){
          data[i].jsonValue = val
      }
    }
    localStorage.setItem('pageData' , JSON.stringify(data));
  }


  return (
    <div className='jsonMainArea'>
      <textarea
        onChange={handleJsonChange}
        placeholder="Enter Json Value"
        value={jsonValue}
        className="jsonInput"
      />
      PRETTY JSON
      <div className='jsonPrettyArea'>
        {
          prettyJson ?
            <JSONPretty data={prettyJson} />
            :
            <div>
              Not a valid json !!
            </div>
        }
      </div>
    </div>
  )
}

export default JsonMainArea