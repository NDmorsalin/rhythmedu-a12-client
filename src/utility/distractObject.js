/* This code is write by me not copy or inspired from google or chat gpt*/

function distractObject(obj, ...excludedProperties) {
    const copyObj  = {...obj}//safe side to change original object
    excludedProperties.forEach((property)=>{
        delete copyObj[property]
    })
    return copyObj;
  }

export {distractObject}