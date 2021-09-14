import React from 'react'
import { useState, useEffect } from 'react'
import {BiSearchAlt} from "react-icons/bi"
import Photo from "./Photo"


const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/` 


const UsplashPhotos = () => {
    const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  

  const fetchPhotos = async () => {
   
    let url
    const urlPage = `&page=${page}`
    const queryUrl = `&query=${query}`

    if(query) {
      url = `${searchUrl}${clientID}${urlPage}${queryUrl}`
    } else {

      url = `${mainUrl}${clientID}${urlPage}`

    }

    
    try {

    const fetchResponse = await fetch(url)
    const data = await fetchResponse.json()
    

    setPhotos((oldPhoto) => {
      if(query && page === 1) {
        return data.results
      } else if (query) {
        return [...oldPhoto, ...data.results]
      } else {
      return [...oldPhoto, ...data]
      }
    })
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(() => {
    
    
    fetchPhotos()
    
  }, [page])


  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if ( window.innerHeight + window.scrollY >= document.body.scrollHeight){
        setPage((oldPage) => {
          return oldPage + 1
        })
        
        
      }

    })

    return () => window.removeEventListener("scroll", event)
}, [])


const handleSubmit = (e) => {
  e.preventDefault()
  setPage(1)
  
  
  

}


return (
<>
<main>
  <section className="search-bar">
    <form action="" className="form">
      <input type="text" placeholder="Search" className="form-input" value={query}  onChange={(e) => setQuery(e.target.value)}/>
      <button onClick={handleSubmit} type="submit" className="submit-button" >
        <BiSearchAlt className="search-icon"/>
        </button>
    </form>
  </section>

  <section className="photo-section">
    <div className="photo-center">
      {photos.map((photo, index) => {
        return <Photo key={index} {...photo}/>
        

      })}
    </div>
  </section>
</main>

</>



);


}


export default UsplashPhotos






 
