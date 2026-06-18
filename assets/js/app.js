import { db } from "./firebase.js";

import {

collection,

getDocs

} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const filesContainer = document.getElementById("filesContainer");

const searchInput = document.getElementById("search");

let allFiles = [];

function driveToDirect(url) {
window.downloadFile = async function(id,url){

  try{

    await updateDoc(
      doc(db,"files",id),
      {
        downloads: increment(1)
      }
    );

  }catch(error){

    console.error(error);

  }

  window.open(
    driveToDirect(url),
    "_blank"
  );

};
if (!url) return "#";

try {

const parts = url.split("/d/");



if (parts.length > 1) {



  const fileId = parts[1].split("/")[0];



  return `https://drive.google.com/uc?export=download&id=${fileId}`;



}

} catch (error) {

console.log(error);

}

return url;

}

function renderFiles(files) {

filesContainer.innerHTML = "";

if (files.length === 0) {

filesContainer.innerHTML = `

  <div style="padding:20px;text-align:center;width:100%;">

    لا توجد ملفات

  </div>

`;



return;

}

files.forEach(file => {

filesContainer.innerHTML += `



  <div class="card">



    <img src="${file.image || 'https://via.placeholder.com/400x200'}">



    <div class="card-body">



      <h3>${file.title || ''}</h3>



      <p><strong>القسم:</strong> ${file.category || ''}</p>



      <p><strong>الإصدار:</strong> ${file.version || ''}</p>



      <p><strong>الحجم:</strong> ${file.size || ''}</p>

<p><strong>التحميلات:</strong> ${file.downloads || 0}</p>

<p>${file.description || ''}</p>



     <button
class="download-btn"
onclick="downloadFile('${file.id}','${file.download}')">

تحميل الملف

</button>


    </div>



  </div>



`;

});

}

async function loadFiles() {

try {

const querySnapshot =

  await getDocs(collection(db, "files"));



allFiles = [];



querySnapshot.forEach((doc) => {



  allFiles.push({

    id: doc.id,

    ...doc.data()

  });



});



console.log("Files:", allFiles);



renderFiles(allFiles);

}

catch (error) {

console.error(error);



filesContainer.innerHTML = `

  <div style="padding:20px;color:red">

    خطأ في تحميل الملفات

  </div>

`;

}

}

searchInput?.addEventListener("input", () => {

const value = searchInput.value.toLowerCase();

const filtered = allFiles.filter(file =>

(file.title || "")

  .toLowerCase()

  .includes(value)

);

renderFiles(filtered);

});

loadFiles();
