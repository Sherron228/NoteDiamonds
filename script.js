let notes = {};
let currentNote = null;

document.getElementById('addNoteButton').addEventListener('click', function() {
    const noteName = prompt("Введите имя новой заметки:");
    if (noteName) {
        notes[noteName] = '';
        createTab(noteName);
        switchToNote(noteName);
    }
});

document.getElementById('saveNotesButton').addEventListener('click', function() {
    if (currentNote) {
        notes[currentNote] = document.getElementById('noteInput').value;

        const blob = new Blob([notes[currentNote]], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${currentNote}.txt`;
        link.click();
    }
});

document.getElementById('loadNoteButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
    fileInput.onchange = function() {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const noteName = file.name.split('.')[0];
            notes[noteName] = content;
            createTab(noteName);
            switchToNote(noteName);
        };
        reader.readAsText(file);
    };
});

function createTab(noteName) {
    const tabs = document.getElementById('tabs');
    const tab = document.createElement('button');
    tab.innerText = noteName;
    tab.onclick = function() {
        switchToNote(noteName);
    };
    tabs.appendChild(tab);
}

function switchToNote(noteName) {
    currentNote = noteName;
    document.getElementById('noteInput').value = notes[noteName] || '';
}


const noteInput = document.getElementById('noteInput');
noteInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

document.getElementById('deleteNoteButton').addEventListener('click', function() {
    if (currentNote) {
        const confirmation = confirm(`Вы уверены, что хотите удалить заметку "${currentNote}"?`);
        if (confirmation) {
            delete notes[currentNote]; 
            const tabs = document.getElementById('tabs');
            const tabButtons = tabs.getElementsByTagName('button');
            for (let i = 0; i < tabButtons.length; i++) {
                if (tabButtons[i].innerText === currentNote) {
                    tabs.removeChild(tabButtons[i]); 
                    break;
                }
            }
            currentNote = null;
            document.getElementById('noteInput').value = '';
        }
    } else {
        alert('Сначала выберите заметку для удаления.');
    }
});