const deleteBtn = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')
const addContactBtn = document.querySelector('.add-contact')
const cancelAddBtn = document.querySelector('#discard')
const form = document.querySelector('form')
const editContactBtn = document.querySelectorAll('.edit')
const nam = document.querySelector('#name')

nam.addEventListener('click', logit)

function logit(e) {
    console.log(e);
}
addContactBtn.addEventListener('click', addContactForm)
cancelAddBtn.addEventListener('click', discardContact)

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

Array.from(editContactBtn).forEach((element)=>{
    element.addEventListener('click', editContact)
})

function addContactForm() {
    form.reset()
    form.style.display = 'inline-block'
    form.style.zIndex = '999'
    form.style.position = 'absolute'
    form.style.top = '50%'
    form.style.left = '50%'
    form.style.transform = 'translate(-50%, -50%)';
    form.style.backgroundColor = 'white'
}

function discardContact() {
    // e.preventDefault()
    form.reset()
    form.style.display = 'none'
    // this.parentNode.parentNode.style.display = 'none'
}

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

 async function editContact(e){
    // const contact = this.parentNode.parentNode.parentNode.childNodes[1].innerTex
    const contact = e.target.attributes[0].value

    console.log(e.target.attributes[0].value);
    // form.style.display = 'block'
    try{
        const response = await fetch('editContact',  {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': contact
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}