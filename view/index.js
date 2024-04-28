// onload fetch all users data
// load the data into Users
// append the html with data, and addevent listeners to open correct function
const url = 'http://localhost:8081';
// const url = 'https://nice-gold-python-fez.cyclic.app';
getUsers()
async function getUsers(){
    let response=await fetch(url+'/users');
    let data= await response.json()
    console.log(data);
    appendUsers(data)
}
let Users = [{
    ID: 123,
    firstName: "Johny",
    lastName: "Liver",
    email: "liver@example.com",
    department: "sales"
},
{
    ID: 13,
    firstName: "aman",
    lastName: "Liver",
    email: "liver@example.com",
    department: "sales"
},
];
const alluserwrapper = document.querySelector('.allusers');
function appendUsers(Users){

    alluserwrapper.innerHTML = Users.map((el,i) => {
        return `
        <div>
        <p><b> ID:</b> ${el.ID}</p>
        <p><b>First Name:</b> ${el.firstName}</p>
        <p><b>Last Name:</b> ${el.lastName}</p>
        <p><b>Email:</b> ${el.email}</p>
        <p><b>Department:</b> ${el.department}</p>
        <div>
        <button class="update-btn" data-idx="${i}">Update</button>
        <button class="delete-btn" data-idx="${i}">Delete</button>
        </div>
        </div>
        `
    }).join('')
}

let payload = {
    firstName: "Johny",
    lastName: "Liver",
    email: "liver@example.com",
    department: "sales"
};


const popup = document.getElementsByClassName('popup')[0];
const wrapperpopup = document.querySelector('.popup>.wrapper');
const updatebtn = document.querySelectorAll('.update-btn');
const deletebtn = document.querySelectorAll('.delete-btn');
updatebtn.forEach(el => {
    el.addEventListener('click', (e) => {
        let idx = +e.target.dataset.idx;
        console.log(idx);
        let ID = Users[idx].ID;
        popup.style.display = 'flex';
        let { firstName, lastName, email, department } = Users[idx];
        wrapperpopup.innerHTML = `
        <i class="fa-solid fa-xmark" onclick="back()"></i>
        <div class="update-user">
            <h1>Update User </h1>
            <p>ID: ${ID}</p>
            <form data-id="${ID}">
                <label for="fname">First name:</label><br>
                <input type="text" id="fname" name="fname" required value="${firstName}"><br>
                <label for="lname">Last name:</label><br>
                <input type="text" id="lname" name="lname" value="${lastName}" required><br>
                <label for="email">Email: </label> <br>
                <input type="email" name="email" id="email" value="${email}" required> <br>
                <label for="department">Department: </label><br>
                <input type="text" name="department" id="department" value="${department}" required> <br>
                <br>
                <input type="submit" value="Submit">
            </form>
        </div>
        `;
        let form = document.querySelector('.popup>.wrapper form');
        form.addEventListener('submit', updateUser)
    })

})
deletebtn.forEach(el => {
    el.addEventListener('click', (e) => {
        let idx = +e.target.dataset.idx;
        let ID = Users[idx].ID;
        popup.style.display = 'flex';
        wrapperpopup.innerHTML = `
        <i class="fa-solid fa-xmark" onclick="back()"></i>
        <div class="delete-user" >
            <p>Are you sure?</p>
            <button data-id="${ID}">Yes</button>
        </div>
        `;
        document.querySelector('.popup>.wrapper .delete-user> button').addEventListener('click', deleteUser);

    })
})






function newUser() {
    // make the display block of .popup
    // append new user form in wrapper
    // call addNewUser()
    popup.style.display = 'flex';
    console.log(wrapperpopup);
    wrapperpopup.innerHTML = `
    <i class="fa-solid fa-xmark" onclick="back()"></i>
    <div class="add-user">
        <h1>Add New User</h1>
        <form onsubmit="addNewUser(event)">
            <label for="fname">First name:</label><br>
            <input type="text" id="fname" name="fname" value="abc" required><br>
            <label for="lname">Last name:</label><br>
            <input type="text" id="lname" name="lname"><br>
            <label for="email">Email: </label> <br>
            <input type="email" name="email" id="email"> <br>
            <label for="department">Department: </label><br>
            <input type="text" name="department" id="department"> <br>
            <br>
            <input type="submit" value="Submit">
        </form>
    </div>
    `;

}

async function addNewUser(e) {
    e.preventDefault();
    payload = {
        firstName: e.target.fname.value,
        lastName: e.target.lname.value,
        email: e.target.email.value,
        department: e.target.department.value
    };
    console.log('user added', payload);
    let response= await fetch(url+'/user',{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(payload)
    })
    if(response.ok){
        alert('User has successfully registered.')
    }
    // get data into payload.
    // make api call with payload
    // after confirmation pop up make the popup display none.
}



function deleteUser(event) {
    console.log(event.target.dataset.id);
    console.log('deleted');
    alert('user deleted')
}

function updateUser(event) {
    event.preventDefault();
    console.log(event.target.dataset.id);
    // console.log(event.target);
    let form = document.querySelector('.popup>.wrapper form');
    payload = {
        firstName: form.fname.value,
        lastName: form.lname.value,
        email: form.email.value,
        department: form.department.value,
    }
    console.log(payload);
    alert('user updated');
}

function back() {
    const popup = document.getElementsByClassName('popup')[0];
    // console.log(popup);
    popup.style.display = 'none';

}