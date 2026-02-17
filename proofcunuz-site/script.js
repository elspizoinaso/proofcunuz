import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    updateDoc,
    doc,
    increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* 🔥 SENİN FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyAAKYEtIsAm-9KJZo7Q7QLWHy9kBTGrOmI",
  authDomain: "proofcunuz.firebaseapp.com",
  projectId: "proofcunuz",
  storageBucket: "proofcunuz.firebasestorage.app",
  messagingSenderId: "735014919300",
  appId: "1:735014919300:web:4a80ff283ece6cc05cf6d1"
};

/* Firebase Başlat */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Koleksiyon */
const tradersRef = collection(db, "traders");

/* 🔥 TAKASÇILARI CANLI ÇEK */
onSnapshot(tradersRef, (snapshot) => {
    const container = document.getElementById("main-trader-display");
    container.innerHTML = "";

    snapshot.forEach((docSnap) => {
        const t = docSnap.data();
        const id = docSnap.id;

        const div = document.createElement("div");
        div.className = "glass-card p-6 rounded-3xl text-center";

        div.innerHTML = `
            <img src="${t.img}" class="w-20 h-20 mx-auto rounded-full mb-4 object-cover">
            <h4 class="font-bold text-lg">@${t.insta}</h4>

            <div class="flex justify-center gap-4 my-4">
                <span class="text-green-400 font-bold">✅ ${t.safe || 0}</span>
                <span class="text-red-400 font-bold">❌ ${t.scam || 0}</span>
            </div>

            <div class="flex flex-col gap-2">
                <button onclick="voteSafe('${id}')" class="bg-green-600 py-2 rounded-lg text-sm font-bold">
                    GÜVENİLİR
                </button>
                <button onclick="voteScam('${id}')" class="bg-red-600 py-2 rounded-lg text-sm font-bold">
                    DOLANDIRICI
                </button>
            </div>
        `;

        container.appendChild(div);
    });
});

/* 🔥 ADMIN TAKASÇI EKLEME */
window.addTrader = async function (insta, img) {
    if (!insta) {
        alert("Instagram gerekli");
        return;
    }

    await addDoc(tradersRef, {
        insta: insta,
        img: img || "https://via.placeholder.com/150",
        safe: 0,
        scam: 0,
        createdAt: Date.now()
    });
};

/* 🔥 OY VERME */
window.voteSafe = async function (id) {
    const ref = doc(db, "traders", id);
    await updateDoc(ref, {
        safe: increment(1)
    });
};

window.voteScam = async function (id) {
    const ref = doc(db, "traders", id);
    await updateDoc(ref, {
        scam: increment(1)
    });
};
