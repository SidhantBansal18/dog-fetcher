import React, { useEffect, useState } from "react"

let nextLink = "";
let prevLink = "";
let urlFirstHalf = "https://frontend-take-home-service.fetch.com"
let urlSecondHalf =  "/dogs/search?"
let urlDefaultSecondHalf = "/dogs/search?"
let sortType = "breed"
let sortOrder = "asc"
let selectedBreed = "";

let url = "";

export const DogFinder = () => {

    const [dogsBreeds,setDogBreeds] = useState([])
    const [dogData,setDogData] = useState([])
    
    async function getRequest(){
        fetch(url, {credentials: "include"})
       .then((res) => res.json())
       .then((data) =>{
        if(data.next !== undefined){
            nextLink = data.next;
        }
        if(data.prev !== undefined){
            prevLink = data.prev;   
        }
        getDogData(data.resultIds)})
    }

    async function generateUrl(){
        url = "";
        url = urlFirstHalf + urlSecondHalf + "sort=" + sortType + ":" + sortOrder + "&"
    }

    async function getDogsBreeds(){
        fetch(urlFirstHalf + "/dogs/breeds", {credentials: "include"})
        .then((res) => res.json())
        .then((data) => {
            setDogBreeds(data)
        })
    }

   
    const getDogData = async (dogIds) => {
        return fetch(
            'https://frontend-take-home-service.fetch.com/dogs', {
        
            method: 'POST',
            body: JSON.stringify(dogIds),
            credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            credentials: "include"
        },
        }).then((res) => res.json())
        .then((data) =>{
        setDogData(data)})
    } 

    const nextPageFunc = async e => {
        urlSecondHalf = nextLink;
        url = urlFirstHalf + urlSecondHalf
        getRequest()
        urlSecondHalf = urlDefaultSecondHalf;
    }

    const prevPageFunc = async e => {
        urlSecondHalf = prevLink;
        url = urlFirstHalf + urlSecondHalf
        getRequest()
        urlSecondHalf = urlDefaultSecondHalf;
    }

    const filterByBreed = async (e) => {
        selectedBreed = e.target.value;
        console.log(selectedBreed);
        generateUrl();
        if(selectedBreed !== ""){
            url += "breeds=" + selectedBreed;
        }
        getRequest()
    }

    const sortingOrder = async (e) => {
        sortOrder = e.target.value;
        if(selectedBreed === ""){
            generateUrl()
            getRequest()
        }
    }
    

    useEffect(()=>{
        generateUrl();
        getDogsBreeds();
        getRequest();
    },[])

    return(
        <div className="main-page">
            <div className="breedsDropdown">
                <select onChange={filterByBreed}>
                    <option value=""> Select a breed</option>
                    {dogsBreeds.map(dogBreed => <option value={dogBreed}> {(dogBreed)} </option>)}               
                </select>
            </div>
            <div className="SortingOrder">
                <select onChange={sortingOrder}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>               
                </select>
            </div>
            <div className="navigation-buttons">
                <button onClick={prevPageFunc}>Previous Page</button>
                <button onClick={nextPageFunc}>Next Page</button>                   
            </div>
            <div className="main-data-container">     
                {   dogData.map(x=>(
                    <div key={x.id} className="card-container"> 
                    <img className="dog-image" src={x.img} alt={x.breed}/>
                    <h1>{x.breed}</h1>
                    <h5>Name: {x.name}</h5>
                    <h6>Age: {x.age}</h6>
                    <h6>ZipCode: {x.zip_code}</h6>
                    </div>
                ))}
            </div>
        </div>
    )
}
