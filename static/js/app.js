import {initPage,createTable} from "./factory.js";
import {filterBulkData} from "./datamanager.js";

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function postData(url='', data = {}) {
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
    })
}

initPage()

activateNavBar()

await updatePage()


function activateNavBar(){
    document.querySelector('.navbar').addEventListener(`mouseover`, function (ev) {
        ev.target.style.color = 'orange'
        setTimeout(function () {ev.target.style.color = ''},500)
    })
    
    document.querySelector('.navbar').childNodes.forEach( element => {
        element.setAttribute('data-bs-toggle',"modal")
        element.setAttribute('data-bs-target',"#exampleModal") 
        element.onclick= function (ev) {
                console.log(ev.target.id);
                popupLogin()
                }
            })
}


async function updatePage(url=`https://swapi.dev/api/planets/?page=1`) {    
    
    function activateButtons() {
        document.querySelector('.previousButton').onclick = function () { if (tableData.previous) updatePage(tableData.previous)}
        document.querySelector('.nextButton').onclick = function () { if (tableData.next) updatePage(tableData.next) }
        document.querySelectorAll('.module').forEach( element => element.onclick = function () {popupModal(element.getAttribute('links'),element.getAttribute('name')) } )
        }
    
    let tableData = await getData(url)
        .then( data => {return data})
        .catch( err => {console.log("error fetching data : ",err.message)})
    
    let currentData = filterBulkData(tableData.results,url)
    
    let currentTable = document.querySelector('.table-responsive-md')
    currentTable.innerHTML = createTable(currentData).innerHTML

    activateButtons()   
}


async function popupModal(urlList,planetName) {
    
    document.querySelector(".modal-body").innerHTML=''
    
    const splitUrlList = urlList.split(`,`)
    
    let importedData = []

    for (const url of splitUrlList) {
        const tempData = await getData(url)
        .then( data => {return data})
        .catch( err => {console.log("error fetching data : ",err.message)})
        importedData.push(tempData)
    }
    
    const popupTable = createTable(filterBulkData(importedData,urlList[0]))
    
    document.querySelector(".modal-title").innerText = `Residents of ${planetName}`
    document.querySelector(".modal-body").append(popupTable)
    }

function popupLogin (session='unknown') {
    
    document.querySelector(".modal-body").innerHTML=''
    
    const form = document.createElement('div')
    const formFields=['email','password']
    formFields.forEach(formElement => {
        const containerField = document.createElement('div')
        containerField.classList.add('md-form','mb-5')
        const inputfield = document.createElement('input')
        inputfield.type=`${formElement}`
        inputfield.id=`form-${formElement}`
        inputfield.classList.add('form-control','validate')
        const inputFieldResponse = document.createElement('label')
        inputFieldResponse.setAttribute('data-error','wrong')
        inputFieldResponse.setAttribute('data-success','right')
        inputFieldResponse.setAttribute('for',`form-${formElement}`)
        inputFieldResponse.innerText=`Your ${formElement}`
        containerField.append(inputfield)
        containerField.append(inputFieldResponse)
        form.append(containerField)
        })

    document.querySelector(".modal-title").innerText = `Welcome !`
    document.querySelector(".modal-body").append(form)
    document.querySelector(".modal-footer button").innerText = "Login"
    document.querySelector(".modal-footer button").onclick = function () {
        var formData = new FormData(document.querySelector('form'))
        postData('./login',formData )
    }

}



    