let pathRoot = "..";
if(document.IS_INDEX) pathRoot = ".";

function generateNavBar() {
  let head = document.getElementsByTagName("head")[0];
  let alink = document.createElement("link");
  alink.rel = "stylesheet";

  alink.href = pathRoot + "/styles/indexStyles.css";
  alink.type = "text/css";

  head.appendChild(alink);

  head.innerHTML += `
  <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous"
/>
<script
  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
  integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
  crossorigin="anonymous"
></script>
  `;
  document.body.append(generateNav());
}

function generateNav() {
  
  let nav = document.createElement("nav");
  nav.classList.add(
    "navbar",
    "navbar-dark",
    "bg-dark",
    "justify-content-between"
  );
  nav.innerHTML = `<a class="navbar-brand" href="${pathRoot}/index.html">
  <button class="btn btn-outline-primary my-2 my-sm-0" style="border:none; color:lightblue;" id="browseAllBooksBtn">The Online Library</button></a>

    <div style="display:inline; id=profile-container">
        <a style="color:lightblue;" href="${pathRoot}/Components/browseAllBooks.html">
        <button class="btn btn-outline-secondary my-2 my-sm-0" id="browseAllBooksBtn" style="border:none; color:lightblue;">Books</button></a>

        ${((JSON.parse(localStorage.getItem("LoggedIn")) === "True" && JSON.parse(localStorage.getItem("AccLoggedIn")).role === "Admin")?
         `<a style="color:lightblue;" href="${pathRoot}/Components/browseAllMembers.html">
         <button class="btn btn-outline-secondary my-2 my-sm-0" id="browseAllMembersBtn" style="border:none; color:lightblue;">Members</button></a>
         <a style="color:lightblue;" href="${pathRoot}/Components/bookAddition.html">
          <button class="btn btn-outline-secondary my-2 my-sm-0" id="browseAllMembersBtn" style="border:none; color:lightblue;">Add Book</button></a>
    ` : ``)}
    </div>
    <div style="display:inline;width:45%;" id="searchContainer">
      <form style="display:inline;"class="form-inline" onsubmit="return search_books()">
        <input style="width:60%;" class="form-control mr-sm-2" type="search" placeholder="Search for book by Title or Author" aria-label="Search" id="search-box" />
        <button class="btn btn-secondary my-2 my-sm-0" style="border:none; color:lightyellow;" type="submit">Search</button>
      </form>
    </div>
      <div style="display:inline;" id="profile-container">
      <a style="color:lightblue;" id="signIn" href="${pathRoot}/Components/SignIn.html">
        <button class="btn btn-outline-success my-2 my-sm-0" style="text-decoration:underline;margin:5px; border:none; color:lightblue;">Sign In</button></a>

        <a style="color:lightblue;" id="signUp" href="${pathRoot}/Components/SignUp.html">
        <button class="btn btn-outline-success my-2 my-sm-0" style="text-decoration:underline;border:none; color:lightblue;">Sign Up</button></a>
      </div>
  `;
  return nav;
}


function display_account_data(goBack) {
  if (JSON.parse(localStorage.getItem("LoggedIn")) !== "True") return;

  let account = JSON.parse(localStorage.getItem("AccLoggedIn"));
  let sign_in_button = document.getElementById("signIn");
  let sign_up_button = document.getElementById("signUp");
  let parent_node = sign_in_button.parentElement;
  parent_node.removeChild(sign_in_button);
  parent_node.removeChild(sign_up_button);
  let container = document.createElement("div");
  container.id = "profile-container";
  container.innerHTML = `
  <button style="height:50px;width:50px;padding:10px; text-decoration:underline; border:none; color:lightblue;"class="btn btn-outline-secondary my-2 my-sm-0" id="signOut" onclick="window.open('${pathRoot}/Components/Profile.html?accountEmail=${account.userMail}')")"><img src='${pathRoot}/media/profile.png' style='cursor:pointer;width:100%;height:100%'></button>
  <button style="text-decoration:underline; border:none; color:lightblue;"class="btn btn-outline-danger my-2 my-sm-0" id="signOut" onclick="sign_out(${goBack})">Sign Out</button>
  `;

  container.style.display = "inline"; 
  parent_node.appendChild(container);

}

function sign_out(goBack) {
  localStorage.setItem("LoggedIn", JSON.stringify("False"));
  localStorage.setItem("AccLoggedIn", JSON.stringify(""));
  document.getElementsByTagName("nav")[0].remove();
  document.body.prepend(generateNav());

  if(goBack) goBack();
}

function goToPage (path){
  alink = document.createElement("a");
  alink.href=path;
  alink.click();
}

function search_books() {
  let search_term = document.getElementById('search-box').value.toLowerCase()
  if (search_term == ""){
    return false;
  }
  let search_results = []
  let AllBooks = JSON.parse(localStorage.getItem("ALLBooks"));
  for (let i = 0; i < AllBooks.length; i++) {
      if (AllBooks[i].Title.toLowerCase().includes(search_term) ||
          AllBooks[i].Author.toLowerCase().includes(search_term)) {
          search_results.push(AllBooks[i])
      }
  }
  sessionStorage.setItem(`${search_term}`, JSON.stringify(search_results))
  let path =`${pathRoot}/Components/BrowseBooks.html?search_key=${search_term}`
  window.location.href = path;
  return false;
}