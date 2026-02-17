// TAKASÇILARI YÜKLE
db.collection("traders").onSnapshot(snap => {
    const area = document.getElementById("traders");
    if (!area) return;

    area.innerHTML = "";

    snap.forEach(doc => {
        const t = doc.data();

        area.innerHTML += `
        <div class="card">
            <img src="${t.img}">
            <h3>@${t.insta}</h3>

            <p>SAFE: ${t.safe}</p>
            <p>SCAM: ${t.scam}</p>

            <button onclick="vote('${doc.id}','safe')">SAFE</button>
            <button onclick="vote('${doc.id}','scam')">SCAM</button>
        </div>`;
    });
});

// OY VERME
function vote(id,type){
    const ref = db.collection("traders").doc(id);

    db.runTransaction(async t=>{
        const doc = await t.get(ref);
        const data = doc.data();

        if(type==="safe") data.safe++;
        else data.scam++;

        t.update(ref,data);
    });
}

// ADMIN LOGIN
function login(){
    auth.signInWithEmailAndPassword(
        email.value,
        pass.value
    );
}

// TAKASÇI EKLE
function addTrader(){
    db.collection("traders").add({
        insta: insta.value,
        img: img.value,
        safe: 0,
        scam: 0
    });
}

// SİLME
function deleteTrader(id){
    db.collection("traders").doc(id).delete();
}
