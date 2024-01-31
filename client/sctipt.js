const API_BASE_URL = 'https://wild-lime-coypu-wear.cyclic.app/';
////////////////////////////////////////////////

let showUserInfo = document.getElementById('right');
let updateTableInfo = document.querySelector('.update-info');

// All Buttons are here
let showAllUserBtn = document.getElementById('all-users-btn');
let showUserByIdBtn = document.getElementById('user-by-id-btn');
let createUserBtn = document.getElementById('create-btn');
let updateUserBtn = document.getElementById('upd-user-btn');
let deleteUserBtn = document.getElementById('delete-btn');

//////////////////////////////////////////////////
// Show All USERS from here
showAllUserBtn.addEventListener('click', ()=> {
    fetch(`${API_BASE_URL}/user`)
    .then((data) => {
        return data.json();
    })
    .then((userData) => {
        let userObj = userData.map((item) => ({
            id: item._id,
            name: item.name,
            age: item.age,
            city: item.city,
        }))
        //console.log(userObj[0].name);
        displayData(userObj);
    })
    .catch((error) => {
        console.log(error);
    })
});

//////////////////////////////////////////////////////
// Search USER by ID
showUserByIdBtn.addEventListener('click', async ()=> {
    const id = document.getElementById('user-id').value;

    await fetch(`${API_BASE_URL}/user/${id}`)
    .then((res) => {return res.json()})
    .then((userData) => {
        //console.log(userData.name);
        displaySingleData(userData);
    })
    .catch((error) => {
        console.log(error);
    })
});

////////////////////////////////////////////////
// CREATE NEW USER from here
createUserBtn.addEventListener('click', ()=> {
    let userInputObj = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        city: document.getElementById('city').value,
    }
    
    fetch(`${API_BASE_URL}/user/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInputObj)
    })
    .then((res) => {
        return(res.json());
    })
    .then((data) => {
        //console.log(data);
        displaySingleData(data)
        updateTableInfo.innerText = "New User Created!"
    })
    .catch((error) => {
        console.log(error);
    })
 
});

////////////////////////////////////////////////
// UPDATE USER data here
updateUserBtn.addEventListener('click', ()=> {
    const id = document.getElementById('user-update-id').value;
    //console.log(id);
    let userUpdatetObj = {
        _id: id,
        name: document.getElementById('up-name').value,
        age: document.getElementById('up-age').value,
        city: document.getElementById('up-city').value,
    }
    
    fetch(`${API_BASE_URL}/user/update/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userUpdatetObj)
    })
    .then((res) => {
        return(res.json());
    })
    .then((data) => {
        //console.log(data);
        displaySingleData(userUpdatetObj)
        updateTableInfo.innerText = "User details has been Updated!"
    })
    .catch((error) => {
        console.log(error);
    })
 
});

///////////////////////////////////////////////
// DELETE USER data here
deleteUserBtn.addEventListener('click', ()=> {
    const id = document.getElementById('user-del-id').value;
    //console.log(id);
    fetch(`${API_BASE_URL}/user/del/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((data) => {
        showUserInfo.innerHTML = '';
        updateTableInfo.innerHTML = `<p class="del-tag">User Deleted!<p/>`
        //console.log('User Deleted!');
    })
    .catch((error) => {
        console.log(error);
    })
});

////////////////////////////////
function displayData(data) {
    showUserInfo.innerHTML = null;
  let card = `
      ${data
        .map((item) =>
          createEle(
            item.id,
            item.name,
            item.age,
            item.city,
          )         
        )
      .join("")}
  `;

  showUserInfo.innerHTML = card;
}
//showUserInfo.innerHTML = createEle;
///////////////////////////////////////////
function createEle(id, name, age, city) {
   return (`
        <tr>
          <td>${id}<td/>
          <td>${name}<td/>
          <td>${age}<td/>
          <td>${city}<td/>
        <tr/>  
   `);
}

///////////////////////////////////////////
function displaySingleData (data) {
    showUserInfo.innerHTML = '';
    updateTableInfo.innerHTML = '';
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
        td1.innerText = data._id;
    let td2 = document.createElement('td');
        td2.innerText = data.name;
    let td3 = document.createElement('td');
        td3.innerText = data.age;
    let td4 = document.createElement('td');
        td4.innerText = data.city;
    
    tr.append(td1, td2, td3, td4);

    showUserInfo.appendChild(tr);
}