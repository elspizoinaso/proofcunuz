import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
getFirestore,
collection,
addDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAKYEtIsAm-9KJZo7Q7QLWHy9kBTGrOmI",
  authDomain: "proofcunuz.firebaseapp.com",
  projectId: "proofcunuz",
  storageBucket: "proofcunuz.firebasestorage.app",
  messagingSenderId: "735014919300",
  appId: "1:735014919300:web:4a80ff283ece6cc05cf6d1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.addProof = async function () {
    const username = document.getElementById("username").value;
    const proof = document.getElementById("proof").value;

    if(!username || !proof) return alert("Boş bırakma");

    await addDoc(collection(db,"proofs"),{
        username,
        proof,
        date:Date.now()
    });

    loadProofs();
}

async function loadProofs(){
    const querySnapshot = await getDocs(collection(db,"proofs"));
    const list = document.getElementById("proofList");
    list.innerHTML="";

    querySnapshot.forEach(doc=>{
        const data = doc.data();

        list.innerHTML += `
        <div class="proofCard">
            <b>${data.username}</b><br>
            <a href="${data.proof}" target="_blank">${data.proof}</a>
        </div>`;
    });
}

loadProofs();
