import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const filesCollection = collection(db,"files");

const filesTable = document.getElementById("filesTable");

const filesCount = document.getElementById("filesCount");

const categoriesCount = document.getElementById("categoriesCount");

const downloadsCount = document.getElementById("downloadsCount");

async function loadFiles(){

filesTable.innerHTML = "";

const snapshot = await getDocs(filesCollection);

let totalFiles = 0;

let totalDownloads = 0;

let categories = new Set();

snapshot.forEach((item)=>{

const data = item.data();

totalFiles++;

categories.add(data.category);

totalDownloads += data.downloads || 0;

filesTable.innerHTML += `

<tr>

<td>
<img
src="${data.image}"
width="50"
height="50"
style="border-radius:8px">
</td>

<td>${data.title}</td>

<td>${data.category}</td>

<td>${data.version}</td>

<td>${data.size}</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteFile('${item.id}')">

حذف

</button>

</td>

</tr>

`;

});

filesCount.textContent = totalFiles;

downloadsCount.textContent = totalDownloads;

categoriesCount.textContent = categories.size;

}

window.deleteFile = async(id)=>{

if(!confirm("حذف الملف ؟")) return;

await deleteDoc(
doc(db,"files",id)
);

loadFiles();

};

document
.getElementById("saveBtn")
.addEventListener("click",async()=>{

const title =
document.getElementById("title").value;

const category =
document.getElementById("category").value;

const version =
document.getElementById("version").value;

const size =
document.getElementById("size").value;

const image =
document.getElementById("image").value;

const download =
document.getElementById("download").value;

const description =
document.getElementById("description").value;

if(!title || !download){

alert("أدخل اسم الملف ورابط التحميل");

return;

}

await addDoc(filesCollection,{

title,
category,
version,
size,
image,
download,
description,
downloads:0,
createdAt:Date.now()

});

alert("تمت إضافة الملف");

document.getElementById("title").value="";
document.getElementById("category").value="";
document.getElementById("version").value="";
document.getElementById("size").value="";
document.getElementById("image").value="";
document.getElementById("download").value="";
document.getElementById("description").value="";

loadFiles();

});

loadFiles();
