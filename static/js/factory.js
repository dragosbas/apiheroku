function titleCase(str) {
    return str
        .split('_')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

function createHeading(title='Star Wars universe planets',level=1) {
    const heading = document.createElement(`h${level}`)
    heading.innerText = title
    return heading
}

export function initPage() {

    document.body.append(createNavbar())

    let mainBody = document.createElement('div')
    mainBody.classList.add('container') 
    
    mainBody.append(createHeading())
    mainBody.append(createButtons())
    
    let tablePlaceHolder = document.createElement('div')
    tablePlaceHolder.classList.add('table-responsive-md')
 
    mainBody.append(tablePlaceHolder)
    
    document.body.append(mainBody)

    document.body.append(createModal())
    
}

function createButtons() {
    
    const result = document.createElement(`div`)
    
    const backButton = document.createElement('button')
    backButton.classList.add(`btn`,`btn-primary`,`previousButton`)
    backButton.innerText='Back'
    backButton.onclick = function () { console.log('previous')}
    result.append(backButton)

    const nextButton = document.createElement('button')

    nextButton.classList.add(`btn`,`btn-primary`,'nextButton')
    nextButton.innerText='Next'
    nextButton.onclick = function () { console.log('next') }
    result.append(nextButton)

    return result
}

function createModal(modalData) {
    const modalExport = document.createElement('div')
    modalExport.classList.add(`modal`,`fade`)
    modalExport.setAttribute(`id`,`exampleModal`)
    modalExport.setAttribute(`tabindex`,`-1`)
    modalExport.setAttribute(`aria-labelledby`,`exampleModalLabel`)
    modalExport.setAttribute(`aria-hidden`,`true`)
    
    const modalDialogue = document.createElement(`div`)
    modalDialogue.classList.add('modal-dialog','modal-xl')

    const modalContent = document.createElement(`div`)
    modalContent.classList.add('modal-content')

    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')
    
    const modalTitle=document.createElement('h5')
    modalTitle.classList.add(`modal-title`)
    modalTitle.setAttribute(`id`,`exampleModalLabel`)
    modalTitle.innerText='Loading Data..'

    const modalClose=document.createElement('button')
    modalClose.setAttribute(`class`,"btn-close")
    modalClose.setAttribute(`type`,"button")
    modalClose.setAttribute(`data-bs-dismiss`,"modal")
    modalClose.setAttribute(`aria-label`,"Close")

    const modalBody=document.createElement('div')
    modalBody.classList.add('modal-body')

    const modalFooter = document.createElement('div')
    modalFooter.classList.add(`modal-footer`)

    const footerButtonOne = document.createElement('button')
    footerButtonOne.classList.add(`btn`,`btn-primary`)
    footerButtonOne.setAttribute('type',`button`)
    footerButtonOne.setAttribute('data-bs-dismiss',`modal`)
    footerButtonOne.innerText='Close'

    modalFooter.append(footerButtonOne)
    
    modalHeader.append(modalTitle)
    modalHeader.append(modalClose)
    modalContent.append(modalHeader)
    modalContent.append(modalBody)
    modalContent.append(modalFooter)
    modalDialogue.append(modalContent)
    modalExport.append(modalDialogue)
    
    return modalExport
    //note to self : uneori hardcodat e mai ok
}

export function createTable (pageData) {

    const tableContainer = document.createElement("div")
    tableContainer.classList.add('table-responsive-md',`text-center`,`align-middle`)

    const table = document.createElement("table")
    table.classList.add('table')
    table.classList.add('table-bordered')
    
    //create table heading
    const tableHeading = document.createElement("thead")
    Object.keys(pageData[0]).forEach( key => {
        let column = document.createElement('th')
        column.scope="col"
        column.innerText=titleCase(key)
        tableHeading.append(column)
    })

    //create table content
    const tableContent = document.createElement("tbody")
    pageData.forEach( element => {
        let tableRow = document.createElement('tr')
        Object.keys(element).forEach( key => {
            const content = document.createElement('td')
            switch (key){
                case 'diameter':
                    content.innerText = `${element[key]} km`
                    break;
                case 'surface_water':
                    content.innerText = (isNaN(element[key])) ? 'Unknown' : `${element[key]}%`
                    break;
                case 'population':
                    if (element[key]==`unknown`) content.innerText = element[key]
                    else 
                        content.innerText = Intl.NumberFormat('en-US').format(element[key])
                    break;
                default:
                    if (typeof(element[key])==`object`) {
                        if (element[key].length == 0 ) {content.innerText = 'Unknown' }
                        else {
                            let tempButton = document.createElement(`button`)
                            tempButton.innerText=`${element[key].length} Subjects(s)`
                            tempButton.classList.add(`btn`,`btn-primary`,`module`)
                            tempButton.setAttribute('links',element[key])
                            tempButton.setAttribute('data-bs-toggle',"modal")
                            tempButton.setAttribute('data-bs-target',"#exampleModal")
                            tempButton.setAttribute('name',element['name'])
                            content.append(tempButton)
                            }
                        }
                    else content.innerText = (element[key]=='') ? `Unknown` : element[key] 
                }
            tableRow.append(content)  
        })
        tableContent.append(tableRow)
    })
    
    table.append(tableHeading)
    table.append(tableContent)

    tableContainer.append(table)

    return tableContainer
    }

function createNavbar () {
    const content = document.createElement(`nav`)
    content.classList.add('navbar','navbar-expand-lg',`navbar-light`,`bg-light`)

    const aButton = document.createElement('button')
    aButton.classList.add(`navbar-toggler`)
    aButton.setAttribute(`type`,"button")
    aButton.setAttribute(`data-bs-toggle`,"collapse")
    aButton.setAttribute(`data-bs-target`,"#navbarNav")
    aButton.setAttribute(`aria-controls`,"navbarNav")
    aButton.setAttribute(`aria-expanded`,"false")
    aButton.setAttribute(`aria-label`,"Toggle navigation")
    const aButtonContent = document.createElement(`span`)
    aButtonContent.classList.add('navbar-toggler-icon')
    aButton.append(aButtonContent)

    content.append(aButton)
    
    const navBarContainer = document.createElement('div')
    navBarContainer.classList.add(`collapse`,`navbar-collapse`)
    navBarContainer.setAttribute(`id`,`navbarNav`)

    const navBarList = document.createElement('ul')
    navBarList.classList.add(`navbar-nav`)
    
    const navBarListFirstItem = document.createElement('li')
    navBarListFirstItem.classList.add(`nav-item`)
    const navBarListFirstItemContent = document.createElement('a')
    navBarListFirstItemContent.classList.add(`nav-link`,`active`)
    // aici e focusul :
    navBarListFirstItemContent.setAttribute(`aria-current`,"page")
    // navBarListFirstItemContent.setAttribute(`href`,"./login")
    navBarListFirstItemContent.id='login'
    navBarListFirstItemContent.innerText='Login'
    
    navBarListFirstItem.append(navBarListFirstItemContent)

    const navBarListSecondItem = document.createElement('li')
    navBarListSecondItem.classList.add(`nav-item`)
    const navBarListSecondItemContent = document.createElement('a')
    navBarListSecondItemContent.classList.add(`nav-link`,`active`)
    // navBarListSecondItemContent.setAttribute(`href`,"./register")
    navBarListSecondItemContent.id='register'
    navBarListSecondItemContent.innerText='Register'
    navBarListSecondItem.append(navBarListSecondItemContent)

    const navBarListThirdItem = document.createElement('li')
    navBarListThirdItem.classList.add(`nav-item`)
    const navBarListThirdItemContent = document.createElement('a')
    navBarListThirdItemContent.classList.add(`nav-link`,`active`)
    // navBarListThirdItemContent.setAttribute(`href`,"./logoff")
    navBarListThirdItemContent.id='logoff'
    navBarListThirdItemContent.innerText='Log Off'
    navBarListThirdItem.append(navBarListThirdItemContent)


    navBarList.append(navBarListFirstItem)
    navBarList.append(navBarListSecondItem)
    navBarList.append(navBarListThirdItem)
    content.append(navBarList)
    return content
}
    
function loginForm () {
    const loginContainer = document.createElement('div')
}