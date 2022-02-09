const planetDetailsMapping = ['name',`diameter`,`climate`,`terrain`,`surface_water`,`population`,`residents`]
const personDetailsMapping = ['name',`height`,`mass`,`hair_color`,`skin_color`,`eye_color`,`birth_year`]

export const filterBulkData = (bulkData,sourceUrl) => {
        
    let result = []
    
    let currentMapping = (sourceUrl.includes('planet')) ? planetDetailsMapping : personDetailsMapping
    
    bulkData.forEach( element => {
        let elementDetails = {}
        currentMapping.forEach( key => elementDetails[key]=element[key])
        result.push(elementDetails)
    });
    return result
}

