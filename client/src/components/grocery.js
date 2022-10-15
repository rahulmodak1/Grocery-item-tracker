import React from 'react'
import Header from './header'
import MonthHead from './monthHead'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './grocery.css'
function Grocery() {
  const [itemText, setItemText] = useState('')//to take the input values for posting the data into the database//
  const [data, setData] = useState([])//to store the data

  // To Post the Data into the DataBase//
  const postHandler = async (e) => {
    e.preventDefault()
    const postData = await axios.post('http://localhost:8002/grocery/add', { groceryItem: itemText, isPurchased: false })

    setData(prev => [...prev, postData.data])  // setData storing the new data + previous data//

    setItemText('')  //input field will be blank after the data post//

    getValue() // get method will be called after the post call to render the result immediately

  }




  const getValue = async () => {
    try {
      const getData = await axios.get('http://localhost:8002/grocery/getAll')
      setData(getData.data)
    } catch (error) {
      console.log(error)
    }
  }

  //useEffect will make get-Call during the page rendering//
  useEffect(() => {
    //calling the function to work in useEffect//
    getValue()
  }, []);

  // update the purchase status 
  const updateHandler = async (id) => {
    await axios.put(`http://localhost:8002/grocery/updatePurchaseStatus/${id}`, { isPurchased: true })
    const updateIndex = data.findIndex(item => item._id === id)
    data[updateIndex].isPurchased = true
    getValue()
  };

  const style1 = { // styling of the item element
    textDecoration: 'line-through'
  }

  //deleteHandler to delete item
  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:8002/grocery/deleteGroceryItem/${id}`,)
    const finalData = data.filter(data => data._id !== id) //filtering data to store new data 
    setData(finalData) // storing the  new data excluded deleted data
  };

  return (
    <div>
      <Header />
      <div className='main-container'>
        <MonthHead />       {/*   showing the month name by header */}
        <div className="item-container">
          <form onSubmit={(e) => postHandler(e)}>
            <input type="text" value={itemText} onChange={(e) => setItemText(e.target.value)} placeholder='Add Shopping Item' />

          </form>
          <div className="item-show">
            <ul>
              {data.map((element, i) =>
                <div className='into-container' key={i}>
                  <div className='result-items'>
                    {element.isPurchased === true ? // conditionally rendering the element
                      <li className='item' style={style1}>{element.groceryItem}</li> :
                      <li className='item'>{element.groceryItem}</li>
                    }
                  </div>
                  <div className="result-btn">
                    <button onClick={() => updateHandler(element._id)}>Purchased</button>
                    <button onClick={() => deleteHandler(element._id)}>x</button>
                  </div></div>

              )}
            </ul>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Grocery