import './App.css';
import ButtonArea from './components/ButtonArea';
import JsonMainArea from './components/JsonMainArea';
import MainArea from './components/MainArea';
import SideBar from './components/SideBar';
import { useEffect, useState } from 'react';

function App() {

  const [pageNumber, setPageNumber] = useState(0);
  const [title, setTitle] = useState("");
  const [jsonValue, setJsonValue] = useState("");
  const [buttonValue, setButtonValue] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [jsonPrettyValue, setJsonPrettyValue] = useState(null);
  const [titleIndexList, setTitleIndexList] = useState([]);

  const setData = () =>
  {
    var data =   JSON.parse(localStorage.getItem('pageData'));
    var pageNumber =   localStorage.getItem('pageNumber');
    var list = []
    for(var i = 0 ; i < data.length ; i++)
      {
        if(i == pageNumber)
        {
          setTitle(data[i].title)
          setJsonValue(data[i].jsonValue) 
          setInputValue(data[i].inputValue)
          handleJsonPretty(data[i].jsonValue)
        
        }
        list.push([data[i].title , i])

      }
      setTitleIndexList(list);
  }

  const setInitialValue = () => {
    localStorage.setItem('pageData'  , JSON.stringify([
      {
        title : "",
        jsonValue: "", 
        inputValue:""
      }
    ]));
     localStorage.setItem('pageNumber'  , 0);
     setTitleIndexList([["" ,0]]);
  }


  const firstFunction  =  () => {
    console.log("re run");
    if ("pageData" in localStorage  && "pageNumber" in localStorage) {
      setData()
      }
    else {
      setInitialValue()
    }
  }

  const handleJsonPretty = (val) => {
    try {
      JSON.parse(val)
      setJsonPrettyValue(val)
    }
    catch (e) {
      setJsonPrettyValue(null)
    }
  }

  useEffect(() => {
    firstFunction();
  } , [pageNumber]);
  

  const handleCick = (e) => {
    e.preventDefault();
    if (buttonValue === true) setButtonValue(false)
    else setButtonValue(true)
  }


  const addButtonCLick = () => {  
    var data = JSON.parse(localStorage.getItem('pageData'));
    data.unshift({
      title : "",
      jsonValue: "", 
      inputValue:""
    })

    localStorage.setItem('pageData'  , JSON.stringify(data));
    localStorage.setItem('pageNumber'  , 0);
    setData()
  }

  const changePageNumber = (pageNumber) => {
    console.log(pageNumber)
    localStorage.setItem('pageNumber'  , pageNumber);
    setPageNumber(pageNumber);
  }

  const deletPage = (pageNumber) => {
    var data = JSON.parse(localStorage.getItem('pageData'));
    if(data.length == 1)
    {
      alert("Atleast one document should be present!!")
    }
    else{
      data.splice(pageNumber , 1);
      localStorage.setItem('pageData' , JSON.stringify(data));
      localStorage.setItem('pageNumber' , 0);
      setPageNumber(0);
      setData()
    }
  }

  return (
    <div className='flexBox'>
      <SideBar addButtonCLick = {addButtonCLick} titleIndexList={titleIndexList}  changePageNumber = {changePageNumber} deletPage ={deletPage}/>
      <div className='mainArea'>
        {
          buttonValue ? <MainArea  title={title} setTitle = {setTitle}  inputValue={inputValue} setInputValue={setInputValue}  pageNumber={pageNumber} setTitleIndexList={setTitleIndexList}/> : <JsonMainArea  jsonValue={jsonValue} setJsonValue={setJsonValue} PageNumber={pageNumber} prettyJson={jsonPrettyValue} handleJsonPretty = {handleJsonPretty}/>
        }
      </div>
      <ButtonArea value={buttonValue} func={handleCick} />
    </div>
  );
}

export default App;
