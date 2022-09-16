import React, { useState, useEffect} from 'react'

import axios from 'axios'

export default function Prueba() {
const API = 'https://rickandmortyapi.com/api'
const [data, setData] = useState('')

useEffect(()=>{
  const getCharacters = () => {
  return axios.get(API + '/character')
  .then((res)=>{ setData(res)

  })
  .catch((err)=>{console.log(err)})
}
getCharacters()
console.log(data.data.results)
},[])


  return(
    <>
      <h1>Hola mundo</h1>
    </>
  )
}



















/*
import axios from 'axios'

import  React, { useEffect, useState } from 'react'

function Prueba() {


const API = 'https://rickandmortyapi.com/api'
    const [data , setData] = useState(()=>{})
useEffect(()=>{
    const getUsers = () => {
        return axios.get(API + '/character')
        .then((res) => { 
            setData(res)
            return res 
        })
        .catch((error)=> {console.log(error)})
    }

    getUsers()
    console.log(data)
}, [])

  return (
    <div>Prueba</div>
  )
}

export default Prueba
*/