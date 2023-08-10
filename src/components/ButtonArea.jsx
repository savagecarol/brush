import React from 'react'
import google from '../image/google.png';


const ButtonArea = ({value , func}) => {
  const routingtoPage = (e) =>{
      e.preventDefault();
      window.open('https://www.google.com/', '_Self');

}  


return (
    <div className='buttonArea'>
        {
        value?
          <button className='customButton' onClick={func}> JSON </button> 
          :
          <button className='customButton' onClick={func}> TEXT </button> 
        }
        <img className = 'googleButton' src={google} alt="google" height={200} onClick={routingtoPage} />
    </div>
  )
}


export default ButtonArea