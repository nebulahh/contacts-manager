const deleteBtn = document.querySelectorAll('.deleteBtn')
const addContactBtn = document.querySelector('.add-contact')
const cancelAddBtn = document.querySelector('#discard')
const form = document.querySelector('.edit-form')


addContactBtn.addEventListener('click', addContactForm)

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
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


async function deleteItem(){
    const ids = this.parentNode.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteContact', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': ids
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
