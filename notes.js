let addbtn = document.getElementById("addbtn");

shownotes();
addbtn.addEventListener("click", function (e) {
    let txtbtn = document.getElementById("txtbtn");
    let titlebtn = document.getElementById("titlebtn");
    let title = localStorage.getItem("title");
    if (title == null) {
        titleobj = [];
    }
    else {
        titleobj = JSON.parse(title);
    }
    titleobj.push(titlebtn.value);
    localStorage.setItem("title", JSON.stringify(titleobj));
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(txtbtn.value);

    localStorage.setItem("notes", JSON.stringify(notesobj));

    txtbtn.value = "";
    titlebtn.value = "";
    shownotes();
});

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let title = localStorage.getItem("title");
    if (title == null) {
        titleobj = [];
    }
    else {
        titleobj = JSON.parse(title);
    }
    let html = "";

    let an = localStorage.getItem("a");
    if (an == null) {
        ans = [];
    }
    else {
        ans = JSON.parse(an);
    }

    let btna = localStorage.getItem("btn");
    if (btna == null) {
        btnimp = [];
    }
    else {
        btnimp = JSON.parse(btna);
    }

    notesobj.forEach(function (element, index) {
        if (ans[index] == undefined || ans[index] == null) {
            ans[index] = "";
        }
        if (btnimp[index] == undefined || btnimp[index] == null) {
            btnimp[index] = "Mark as Important";
        }

        html += `<div class="card notecard mx-3 my-3" style="width: 20rem;">
        <div class="card-body">
            <h5 class="card-title" style="font-family:Lucida Console;">${titleobj[index]} ${ans[index]}</h5>
            <p class="card-text" style="font-family:Times New Roman;">${element}</p>
            <button id="delbtn" onclick="deleteN(${index})" class="btn btn-outline-primary">Delete node</button>
            <button id="impbtn" onclick="markimp(${index})" ondblclick="unmark(${index})" class="btn btn-outline-primary cardtlt">${btnimp[index]}</button>
        </div>
    </div>`;
    });
    let noteselm = document.getElementById("notes");
    if (notesobj != 0) {
        noteselm.innerHTML = html;
    }
    else {
        noteselm.innerHTML = `<h3 style="color:white;">Enter the notes to add</h3>`
    }
}


function deleteN(index) {
    notesobj.splice(index, 1);
    titleobj.splice(index, 1)
    ans.splice(index, 1);
    btnimp.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    localStorage.setItem("a", JSON.stringify(ans));
    localStorage.setItem("btn", JSON.stringify(btnimp));
    localStorage.setItem("title", JSON.stringify(titleobj));
    shownotes();
}

function markimp(index) {
    let card = document.getElementsByClassName("notecard");
    Array.from(card).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("h5")[0];
        cardt = cardtxt.innerText;
        let n = titleobj.indexOf(cardt)
        if (index == n) {
            ans[index] = "  ( *Imp ) ";
            btnimp[index] = "Mark as Unimportant";
        }

    })
    localStorage.setItem("a", JSON.stringify(ans));
    localStorage.setItem("btn", JSON.stringify(btnimp));
    shownotes();

}

function unmark(index) {
    let card = document.getElementsByClassName("notecard");
    Array.from(card).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("h5")[0];
        let txt = "";
        cardt = cardtxt.innerText;
        if (cardt.endsWith("( *Imp )") == true) {
            for (i = 0; cardt[i] != " "; i++) {
                txt += cardt[i];
            }
        }
        let n = titleobj.indexOf(txt);
        if (index == n) {
            ans[index] = "";
            btnimp[index] = "Mark as Important";
        }
    });
    localStorage.setItem("a", JSON.stringify(ans));
    localStorage.setItem("btn", JSON.stringify(btnimp));
    shownotes();
}

let searchtxt = document.getElementById("searchtxt");
searchtxt.addEventListener("input", function () {
    let input = searchtxt.value
    let notecard = document.getElementsByClassName("notecard");
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;
        if (cardtxt.includes(input)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

})