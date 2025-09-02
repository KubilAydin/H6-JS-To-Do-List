//Yazdırılan elementleri ekleme ve silme fonksu.
function newElement () {
    // li elementi yaratma
    var li = document.createElement("li");
    // id ile değer alma
    var inputValue = document.getElementById("task").value;
    // alınan değeri textnode ile yazdırma
    var t = document.createTextNode(inputValue);
    //textnode li içine ekleniyor.
    li.appendChild(t);
    // Boşluk ve uzunluğu 0'alan karakterler error atar.
    if(inputValue === " " || inputValue.trim().length == 0) {
        $(".error").toast("show");
    } else { // Değilse list elemanı olarak eklenir ve toast ile gösterilir.
        $(".success").toast("show");
        document.getElementById("list").appendChild(li);
    }
    document.getElementById("task").value = "";

    var span = document.createElement("span");
    //Bu bir unicode x işareti için tanımlandı.
    var text = document.createTextNode("\u00D7");
    // close elemanı getirtme
    var close = document.getElementsByClassName("close");
    span.className = "close";
    span.appendChild(text);
    li.appendChild(span);

    for (i=0; i< close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        };
    }
    // ul elemanını seç.
    
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
    li.textContent = text;

    //Id ataması
    if (customId) {
        li.id = customId;
        let num = parseInt(customId.split("-"[1]));
        if(num >= taskCounter) taskCounter = num + 1;// Sayaç Güncelle
    } else {
        li.id = "task-" + taskCounter++;
    }

    if (checked) li.classList.add("checked");

    let span = document.createElement("span");
    span.textContent = "x";
    span.className = "close";
    span.onclick = () => {li.remove(); saveTasks();};

    li.appendChild(span);
    li.onclick = (e) => {
        if (e.target.tagName === "LI") {
            li.classList.toggle("checked");
            saveTasks();
        }
    };
    document.getElementById("list").appendChild(li);
}

//Yeni görev ekle
function newElement() {
    let input = document.getElementById("task");
    let value = input.value.trim();
    if(!value) return;
    addTaskToDoom(value);
    saveTasks();
    input.value = "";
}

//Sayfa her açıldığında görev yükleme 
window.onload = loadTasks;
