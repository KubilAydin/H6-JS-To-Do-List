//Yazdırılan elementleri ekleme ve silme fonksu.
function newElement () {
    let input = document.getElementById("task");
    let value = input.value.trim();

    // Boş karakter kontrolü
    if (!value) {
        $(".error").toast("show");
        return;
    }

    // Görevi DOM’a ekle
    $(".success").toast("show");
    addTaskToDoom(value);

    // Kaydet
    saveTasks();

    // Input sıfırla
    input.value = "";    
}

var myList = document.getElementsByTagName("LI");
var i;
for(i = 0; i < myList.length; i++) {
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myList[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
} 

var list = document.querySelector("ul");
    list.addEventListener("click",function (event) {
         if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        }
    },
    false
);

// Local Storage 
const STORAGE_KEY = "myTodoTasks"; // Bu sayfaya özel key tanımlandı.
let taskCounter = 0;
//Görevleri kaydetme
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#list li").forEach(li => {
        if(li.id) {
            tasks.push({
                id:li.id,
                text:li.firstChild.textContent,
                checked:li.classList.contains("checked")
            });
        }
    });
    localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));
}

//Local stroge'dan görevleri yükle 
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    tasks.forEach(task => addTaskToDoom(task.text, task.checked, task.id));
}

//Görevleri Doom'a ekleme
function addTaskToDoom(text, checked = false, customId = null){
    let li = document.createElement("li");

    if (customId) {
        li.id = customId;
        let num = parseInt(customId.split("-")[1]);
        if (num >= taskCounter) taskCounter = num + 1;
    } else {
        li.id = "task-" + taskCounter++;
    }

    li.appendChild(document.createTextNode(text));
    if (checked) li.classList.add("checked");

    let span = document.createElement("span");
    span.textContent = "×";
    span.className = "close";
    span.onclick = (e) => {
        e.stopPropagation(); // checked olayı tetiklenmesin
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    document.getElementById("list").appendChild(li);
}

//Sayfa her açıldığında görev yükleme 
window.onload = loadTasks;
