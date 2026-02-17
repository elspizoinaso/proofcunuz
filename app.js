import { firebaseConfig, ADMIN_PASSWORD } from "./config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ADMIN LOGIN */
window.login = function(){
    const pass = document.getElementById("pass").value;
    if(pass === ADMIN_PASSWORD){
        document.getElementById("panel").style.display="block";
        loadAdmin();
    }else{
        alert("Şifre yanlış");
    }
}

/* PROOF EKLE */
window.addProof = async function(){
    const user = document.getElementById("user").value;
    const link = document.getElementById("link").value;

    await addDoc(collection(db,"proofs"),{
        user,
        link,
        date:Date.now()
    });

    loadAdmin();
}

/* ANA SAYFA LİSTE */
async function loadPublic(){
    const list = document.getElementById("proofList");
    if(!list) return;

    const snap = await getDocs(collection(db,"proofs"));
    list.innerHTML="";

    snap.forEach(d=>{
        const data = d.data();
        list.innerHTML += `
        <div class="card">
            <b>${data.user}</b><br>
            <a href="${data.link}" target="_blank">${data.link}</a>
        </div>`;
    });
}

/* ADMİN LİSTE + SİLME */
async function loadAdmin(){
    const list = document.getElementById("adminList");
    if(!list) return;

    const snap = await getDocs(collection(db,"proofs"));
    list.innerHTML="";

    snap.forEach(d=>{
        const data = d.data();
        list.innerHTML += `
        <div class="card">
            <b>${data.user}</b>
            <button onclick="removeProof('${d.id}')">Sil</button>
        </div>`;
    });
}

window.removeProof = async function(id){
    await deleteDoc(doc(db,"proofs",id));
    loadAdmin();
}

/* SAYFA YÜKLE */
loadPublic();
