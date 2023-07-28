function User(userName,userMail,userPassword, createDate, role="Member"){
    this.userName = userName;
    this.userPassword = userPassword;
    this.userMail = userMail;
    this.createDate = createDate;
    this.role = role;

    this.getUserName = function () {
        return this.userName;
    }
    this.getUserMail = function () {
        return this.userMail;
    }
    this.getcreateDate = function () {
        return this.createDate;
    }
    this.getRole = function () {
        return this.role;
    }

    this.setUserName = function (userName) {
        this.userName = userName;
    }
    this.setUserMail = function (userMail) {
        this.userName = userMail;
    }
}

function UserFromJson(json)
{
    return new User(json.userName, json.userMail, json.userPassword, json.createDate, json.role);
}

if (localStorage.getItem("accounts") === null)
{
    var arrAccounts = [
        new User("Admin","admin@admin.com","admin","1/06/2020","Admin"),
        new User("Book Keeper","bookkeeper@library.com","bookkeeper","19/06/2020","Admin"),

        new User("Youssef Maher","ymaher@912.com","YMAHER99_DOTa2@su","28-04-2021"),
        new User("Mazen Mostafa","mazen@mazen.com","Mazeeeeeen","19/06/2022"),
        new User("Mostafa Lotfy","lotfy@lotfy.com","LOTFYYYYY","9/09/2021"),

        new User("Mohamed Mokhtar","mokh@gmail.com","m0khtar222","2/11/2020"),
        new User("Omar Lotfy","omar@yahoo.com","olt0fy","23/01/2021"),
        new User("Unknown","unknown@hotmail.com","IamHIDD3N","7/12/2021"),
        
        new User("John Doe","jdoe@gmail.com","doeD0Edoe","22/02/2022"),
        new User("Ahmed Hazem","ahmed12@gmail.com","aHaz3m223","19/06/2022"),
    ]

    localStorage.setItem("accounts", JSON.stringify(arrAccounts))
}


var arrAccounts = JSON.parse(localStorage.getItem("accounts"));
for (let i = 0; i < arrAccounts.length; i++)
    arrAccounts[i] = UserFromJson(arrAccounts[i]);

if (localStorage.getItem("LoggedIn") === null)
    localStorage.setItem("LoggedIn", JSON.stringify("False"));

if (localStorage.getItem("AccLoggedIn") === null)
    localStorage.setItem("AccLoggedIn", JSON.stringify(""));

function createAccount() {
    accountCreated = true;
    document.getElementById('CheckMail').innerHTML = '';
    document.getElementById('CheckPass').innerHTML = '';

    let email = document.getElementById("email").value;
    for(var i = 0 ; i < arrAccounts.length; i++){
        if (email === arrAccounts[i].getUserMail()){
            document.getElementById('CheckMail').style.color = 'red';
            document.getElementById('CheckMail').innerHTML = 'An account with this email already exists';
            accountCreated = false;
        }
    }

    if (accountCreated){

        if (document.getElementById("psw").value == document.getElementById("psw-repeat").value) {
            
            let name = document.getElementById("name").value;
            let password = document.getElementById("psw").value;
            let createDate = new Date();
            createDate = `${createDate.getDate()}/${createDate.getMonth()+1}/${createDate.getFullYear()}`;
            let account = new User(name,email,password,createDate)
            arrAccounts.push(account)
            localStorage.setItem("accounts", JSON.stringify(arrAccounts))
            accountCreated = true;
        }
        else{
            document.getElementById('CheckPass').style.color = 'red';
            document.getElementById('CheckPass').innerHTML = 'Password is not matching';
            accountCreated = false;
        }
    }
    return accountCreated;
}

function login(email,password) {    
    found = false;
    logged = false;

    document.getElementById('CheckMail').innerHTML = '';
    document.getElementById('CheckPassword').innerHTML = '';

    for(var i = 0; i<arrAccounts.length; i++){
        if (email === arrAccounts[i].getUserMail()){
            if (password === arrAccounts[i].userPassword) {
                localStorage.setItem("LoggedIn",JSON.stringify("True"));
                localStorage.setItem("AccLoggedIn",JSON.stringify(arrAccounts[i]))
                logged = true;
            }
            else {
                document.getElementById('CheckPassword').classList.add("notCorrect");
                document.getElementById('CheckMail').classList.remove("notCorrect");
                document.getElementById('CheckPassword').innerHTML = 'Password is not matching';
            }
            found = true;
            break;
        }
    }

    if (found === false){
        document.getElementById('CheckMail').classList.add("notCorrect");
        document.getElementById('CheckPassword').classList.remove("notCorrect");
        document.getElementById('CheckMail').innerHTML = 'Email is not matching';
    }
    return logged;
}

function resetPassword(oldPassword,newPassword,repeatPassword) {
    changed = false;
    
    document.getElementById('OldPass').innerHTML = '';
    document.getElementById('CheckPass').innerHTML = '';

    if(newPassword !== repeatPassword)
    {
        document.getElementById('CheckPass').style.color = 'red';
        document.getElementById('CheckPass').innerHTML = 'Password is not matching';
        return false;
    }

    let loggedInUser = UserFromJson(JSON.parse(localStorage.getItem("AccLoggedIn")));
    let email = loggedInUser.getUserMail();

    for(var i = 0; i<arrAccounts.length; i++){
        if (email === arrAccounts[i].getUserMail()){
            if (oldPassword === arrAccounts[i].userPassword) {
                arrAccounts[i].userPassword = newPassword;
                localStorage.setItem("AccLoggedIn",JSON.stringify(arrAccounts[i]))
                localStorage.setItem("accounts", JSON.stringify(arrAccounts))
                changed = true;
            }
            else {
                document.getElementById('OldPass').style.color = 'red';
                document.getElementById('OldPass').innerHTML = 'Old password is not matching';
                changed = false;
            }
            break;
        }
    }
    return changed;
}

function generateCardsForAllMembers(){
    //get div with id cardsDiv
    let cardsDiv = document.getElementById("cardsDiv");
    //get all books from local storage
    let allAccounts = JSON.parse(localStorage.getItem("accounts"));
    //loop through all books
    for (const account of allAccounts){
        let acc = UserFromJson(account);
        cardsDiv.innerHTML += `
        <div class="card" style="width:16em; height: 32em; margin-top: 10px; margin-bottom: 10px;">
        <img id="cardMemeberProfile"class="card-img-top" alt="Card member cap" src="../media/profile.png">
        <div class="card-body">
          <h5 id="card" class="card-title">${acc.getUserName()}</h5>
          <h6 id="cardUserMail" class="card-subtitle mb-2 text-muted">${acc.getUserMail()}</h6>
          <p id="cardUserCreateDate" class="card-text">Created at: ${acc.getcreateDate()}</p>
          <p id="cardUserRole" class="card-text">Role: ${acc.getRole()}</p>
          <a href="../Components/Profile.html?accountEmail=${acc.getUserMail()}" class="card-link">Profile Link</a>
          <br>
        </div>
      </div>
      `
    }
}

function display_Profile_details(){
    accountEmail = decodeURI(location.href.split("=")[1]);
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    var selectedAccount = null;
    for (const account of accounts){
        if (accountEmail == account.userMail){
            selectedAccount = account;
            break;
        }
    } 
    if (selectedAccount == null) {alert("NO BOOK CHOSEN"); return;}
    document.getElementById("profilePicture").setAttribute("src", `../media/profile.png`)
    document.getElementById("cardName").innerText = `${selectedAccount.userName}`;

    document.getElementById("cardEmail").innerText = `${selectedAccount.userMail}`;
    document.getElementById("cardPublishDate").innerText = `since: ${selectedAccount.createDate}`;
    document.getElementById("cardRole").innerText = `Role: ${selectedAccount.role}`;

}