function tambahDiary() {

    const isiDiary = document.getElementById("diary").value;

    if(isiDiary === ""){
        alert("Diary tidak boleh kosong");
        return;
    }

    diaries.push(isiDiary);

    tampilDiary();

    document.getElementById("diary").value = "";
}

function tampilDiary() {

    const listDiary = document.getElementById("listDiary");

    listDiary.innerHTML = "";

    diaries.forEach((item, index) => {

        listDiary.innerHTML += `
            <li>${item}</li>
        `;
    });
}