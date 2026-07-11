/* ===================================================
   ADMINISTRATIVE DOCUMENT MANAGEMENT SYSTEM
   JavaScript Core Functions
=================================================== */


/* ==========================
   PAGE LOADER
========================== */

document.addEventListener("DOMContentLoaded", function(){

    console.log(
        "Administrative DMS Loaded Successfully"
    );

});


/* ==========================
   DARK MODE
========================== */

const darkModeButton = document.querySelector(
    "#darkModeToggle"
);


if(darkModeButton){

    darkModeButton.addEventListener(
        "click",
        function(){

            document.body.classList.toggle(
                "dark"
            );


            localStorage.setItem(
                "darkMode",
                document.body.classList.contains("dark")
            );


        }
    );

}


/* Load Saved Theme */

if(
    localStorage.getItem("darkMode") === "true"
){

    document.body.classList.add(
        "dark"
    );

}



/* ==========================
   SEARCH DOCUMENTS
========================== */


const searchInput =
document.querySelector(
    ".top-actions input"
);



if(searchInput){

searchInput.addEventListener(
"keyup",
function(){

let value =
this.value.toLowerCase();


let rows =
document.querySelectorAll(
"tbody tr"
);



rows.forEach(function(row){

let text =
row.innerText.toLowerCase();


if(text.includes(value)){

row.style.display="";

}
else{

row.style.display="none";

}


});


});


}


/* ==========================
   CONFIRM DELETE
========================== */


function confirmDelete(){

let answer =
confirm(
"Are you sure you want to delete this document?"
);


return answer;

}


/* ==========================
   BUTTON CLICK EFFECT
========================== */


const buttons =
document.querySelectorAll(
"button"
);


buttons.forEach(function(button){

button.addEventListener(
"click",
function(){

this.style.transform =
"scale(.95)";


setTimeout(()=>{

this.style.transform =
"scale(1)";

},100);


});

});
/* ===================================================
   DOCUMENT DATA LOADER
=================================================== */


/*
   This function loads documents
   from data/files.json
*/

async function loadDocuments(){

    try{

        const response =
        await fetch(
            "data/files.json"
        );


        const documents =
        await response.json();


        displayDocuments(
            documents
        );


        updateDashboardCount(
            documents
        );


    }

    catch(error){

        console.error(
            "Unable to load documents:",
            error
        );

    }

}



/* ==========================
   DISPLAY DOCUMENTS
========================== */

function displayDocuments(
    documents
){


const tableBody =
document.querySelector(
"tbody"
);



if(!tableBody){

return;

}



tableBody.innerHTML="";



documents.forEach(function(doc,index){


let row = `

<tr>

<td>
${index + 1}
</td>


<td>
${doc.name}
</td>


<td>
${doc.category}
</td>


<td>
${doc.department}
</td>


<td>
${doc.date}
</td>


<td>

<span class="status ${doc.status.toLowerCase()}">

${doc.status}

</span>

</td>


<td>


<button onclick="viewDocument('${doc.id}')">

<i class="fa-solid fa-eye"></i>

</button>


<button onclick="downloadDocument('${doc.file}')">

<i class="fa-solid fa-download"></i>

</button>


</td>


</tr>

`;


tableBody.innerHTML += row;


});


}



/* ==========================
   VIEW DOCUMENT
========================== */


function viewDocument(id){

window.location.href =
"viewer.html?id=" + id;

}



/* ==========================
   DOWNLOAD DOCUMENT
========================== */


function downloadDocument(
file
){

let link =
document.createElement(
"a"
);


link.href =
file;


link.download =
"";


document.body.appendChild(
link
);


link.click();


document.body.removeChild(
link
);


}



/* ==========================
   DASHBOARD COUNTER
========================== */


function updateDashboardCount(
documents
){


let total =
documents.length;


let active =
documents.filter(
doc =>
doc.status === "Active"
).length;


let archived =
documents.filter(
doc =>
doc.status === "Archived"
).length;


let pending =
documents.filter(
doc =>
doc.status === "Pending"
).length;



let totalElement =
document.querySelector(
"#totalDocuments"
);


let activeElement =
document.querySelector(
"#activeDocuments"
);


let pendingElement =
document.querySelector(
"#pendingDocuments"
);


let archivedElement =
document.querySelector(
"#archivedDocuments"
);



if(totalElement)
totalElement.innerHTML =
total;


if(activeElement)
activeElement.innerHTML =
active;


if(pendingElement)
pendingElement.innerHTML =
pending;


if(archivedElement)
archivedElement.innerHTML =
archived;


}


/* ==========================
   START SYSTEM
========================== */


loadDocuments();
/* ===================================================
   ADVANCED FILTER SYSTEM
=================================================== */


const categoryFilter =
document.querySelector(
".filter-panel select:nth-child(1)"
);


const statusFilter =
document.querySelector(
".filter-panel select:nth-child(2)"
);



function filterDocuments(){


const category =
categoryFilter ?
categoryFilter.value :
"All Categories";


const status =
statusFilter ?
statusFilter.value :
"All Status";



const rows =
document.querySelectorAll(
"tbody tr"
);



rows.forEach(function(row){


const rowCategory =
row.children[2]?.innerText;


const rowStatus =
row.children[5]?.innerText;



let show = true;



if(
category !== "All Categories" &&
rowCategory !== category
){

show = false;

}



if(
status !== "All Status" &&
rowStatus !== status
){

show = false;

}



row.style.display =
show ? "" : "none";


});


}



if(categoryFilter){

categoryFilter.addEventListener(
"change",
filterDocuments
);

}



if(statusFilter){

statusFilter.addEventListener(
"change",
filterDocuments
);

}



/* ===================================================
   VIEWER AUTO LOAD
=================================================== */


async function loadViewer(){


const params =
new URLSearchParams(
window.location.search
);


const id =
params.get("id");



if(!id){

return;

}



try{


const response =
await fetch(
"data/files.json"
);



const documents =
await response.json();



const documentFile =
documents.find(
doc =>
doc.id === id
);



if(!documentFile){

console.error(
"Document not found"
);

return;

}



const title =
document.querySelector(
"#documentTitle"
);


const preview =
document.querySelector(
"#documentPreview"
);



if(title){

title.innerHTML =
documentFile.name;

}



if(preview){

preview.src =
documentFile.file;

}



}

catch(error){

console.error(
error
);

}


}



loadViewer();



/* ===================================================
   UPLOAD FORM VALIDATION
=================================================== */


const uploadForm =
document.querySelector(
".upload-form form"
);



if(uploadForm){


uploadForm.addEventListener(
"submit",
function(event){


event.preventDefault();



const file =
document.querySelector(
"#documentFile"
);



if(
!file ||
file.files.length === 0
){

alert(
"Please select a document first."
);

return;

}



alert(
"Document information validated successfully."
);



});


}



/* ===================================================
   LOCAL STORAGE SETTINGS
=================================================== */


function saveSetting(
key,
value
){

localStorage.setItem(
key,
value
);

}



function getSetting(
key
){

return localStorage.getItem(
key
);

}



/* ===================================================
   SYSTEM NOTIFICATION
=================================================== */


function showNotification(
message
){


const notification =
document.createElement(
"div"
);


notification.className =
"system-notification";


notification.innerHTML =
message;



document.body.appendChild(
notification
);



setTimeout(
()=>{

notification.remove();

},
3000
);


}
