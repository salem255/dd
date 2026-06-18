import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const filesContainer = document.getElementById("filesContainer");
const searchInput = document.getElementById("search");

let allFiles = [];

function driveToDirect(url){

if(!url) return "#";

const match = url.match(//d/(.*?)//);

if(match){
return `https://drive.google.com/uc?export=download&id=${match[1]}`;
}

return url;
}

function renderFiles(files){

filesContainer.innerHTML = "";

if(files.length === 0){

```
filesContainer.innerHTML = `
  <div style="padding:20px;text-align:center;width:100%;">
    لا توجد ملفات
  </div>
`;

return;
```

}

files.forEach(file=>{

```
filesContainer.innerHTML += `

<div class="card">

  <img src="${file.image || 'https://via.placeholder.com/400x200'}">

  <div class="card-body">

    <h3>${file.title || ''}</h3>

    <p><strong>القسم:</strong> ${file.category || ''}</p>

    <p><strong>الإصدار:</strong> ${file.version || ''}</p>

    <p><strong>الحجم:</strong> ${file.size || ''}</p>

    <p>${file.description || ''}</p>

    <a
      class="download-btn"
      href="${driveToDirect(file.download)}"
      target="_blank">

      تحميل الملف

    </a>

  </div>

</div>

`;
```

});

}

async function loadFiles(){

try{

```
const querySnapshot =
  await getDocs(collection(db,"files"));

allFiles = [];

querySnapshot.forEach((doc)=>{

  allFiles.push({
    id: doc.id,
    ...doc.data()
  });

});

renderFiles(allFiles);
```

}
catch(error){

```
console.error(error);

filesContainer.innerHTML = `
  <div style="padding:20px;color:red">
    خطأ في تحميل الملفات
  </div>
`;
```

}

}

searchInput?.addEventListener("input",()=>{

const value = searchInput.value.toLowerCase();

const filtered = allFiles.filter(file =>

```
(file.title || "")
.toLowerCase()
.includes(value)
```

);

renderFiles(filtered);

});

loadFiles();
