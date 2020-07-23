const textField = document.getElementById('textField');
const mainData = document.querySelector('#data');


//get Data :

// db.collection('todoApp').get().then((snapshot) => {
//         snapshot.docs.forEach(doc => {
//             // console.log(doc.data().data)
//             createTheElement(doc);
//         });
// })

// Add data :

function insertValue() {

    db.collection('todoApp').add({
        data: textField.value
    })
    textField.value = '';
}

function createTheElement(doc) {

    let li = document.createElement('li');
    li.setAttribute('data-id', doc.id);
    let data = document.createElement('span')
    let cross = document.createElement('button');
    let update = document.createElement('button');
    let i = document.createElement('span');
    i.setAttribute('class', 'fa fa-pencil')
    update.append(i);

    li.setAttribute('data-id', doc.id);
    // li.setAttribute('class','form-group')
    data.textContent = doc.data().data;
    console.log('data', doc.data().data)
    cross.textContent = 'X';
    cross.setAttribute('class', 'cross btn btn-danger')
    update.setAttribute('class', 'update btn btn-warning')

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('todoApp').doc(id).delete();
    })

    update.addEventListener('click', (e) => {
        // e.preventDefault();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log('id', id)
        let val = doc.data().data;
        let updt = prompt("Enter Value", val);
        
            if (id === null) {
                id = e.target.parentElement.getAttribute('data-id');
            }
            else{
                id = e.target.parentElement.getAttribute('data-id');
            }
        
        if (updt === '' || updt === undefined) {
            alert('Please Enter Something for updation');
        } else {
            data.textContent = updt;
            console.log('id', id)
            db.collection('todoApp').doc(id).update({
                data: updt
            })
        }
    })



    li.appendChild(data);
    li.appendChild(cross)
    li.appendChild(update)
    mainData.appendChild(li)
}

db.collection('todoApp').orderBy('data').onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    console.log(changes)
    changes.forEach(change => {
        //     console.log(change.doc.data());
        if (change.type == 'added') {
            createTheElement(change.doc);
        }
        else if (change.type == 'removed') {
            let li = mainData.querySelector('[data-id=' + change.doc.id + ']');
            mainData.removeChild(li);
        }
    })
})



