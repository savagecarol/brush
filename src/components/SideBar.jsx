import React from 'react'
import '../App.css';


const SideBar = ({ addButtonCLick, titleIndexList, changePageNumber, deletPage }) => {

  return (
    <div className='sideArea'>
      <button className='addButton' onClick={addButtonCLick}> + </button>
      {
        titleIndexList.map((value) => {
          return (
            <div className='sideBarFlex'>
                <div className='pageImage' onClick={() => deletPage(value[1])}> x </div>
                <div className='pageTitle' onClick={() => changePageNumber(value[1])}> {value[0].substring(0, 60)} </div>
            </div>
          )
        })

      }
    </div>
  )
}

export default SideBar