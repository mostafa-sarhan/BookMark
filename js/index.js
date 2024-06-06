var siteName = document.querySelector("#bookmarkName");
var url = document.querySelector("#bookmarkUrl");

var submit =document.querySelector(".btn-submit");
var tbody = document.querySelector("#tableContent");


// valid Url

const inputElement = document.querySelector("#bookmarkUrl");
const addButton = document.querySelector(".btn-submit");

addButton.addEventListener('click', function() {
    const url = inputElement.value;
    if (isValidURL(url)) {
      // Allow adding the URL
        console.log('URL is valid and can be added.');
    } else {
      // Show an error message
        alert('Please enter a valid URL.');
    }
});


var bookMarks = [];

if(localStorage.getItem("bookMarks") == null){
    bookMarks =[];
}
else {
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    displayData();
}

submit.onclick = function(){
    var bookMark = {
        Name : siteName.value,
        url : url.value,
    }
    bookMarks.push(bookMark);
    localStorage.setItem("bookMarks" , JSON.stringify(bookMarks));
    displayData();
    clear();
}

function displayData(){
    var container = ``;
    for(var i =0 ; i <bookMarks.length ; i++){
        container += `
        <tr >
                        <th class="text-capitalize">${i + 1}</th>
                        <th class="text-capitalize">${bookMarks[i].Name}</th>
                        <th class="text-capitalize">
                            <button class="btn btn-visit pe-2">
                                <i class="fa-solid fa-eye pe-2"></i>
                                <a href="https://www.${bookMarks[i].url}/" target="_blank">visit</a>
                            </button>
                        </th>
                        <th class="text-capitalize">
                            <button class="btn btn-delete pe-2" onclick="deleteItem(${i})">
                                <i class="fa-solid fa-trash-can" ></i>
                                Delete
                            </button>
                        </th>
                    </tr>
        `
    }
    document.querySelector("#tableContent").innerHTML =container;
}

function clear(){
    siteName.value=null;
    url.value=null;
}

function deleteItem(index) {
    bookMarks.splice(index,1);
    localStorage.setItem("bookMarks" , JSON.stringify(bookMarks));
    displayData();
}


function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;  
    }
}

