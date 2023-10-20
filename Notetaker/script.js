function saveNote() {
    let noteContent = $('#noteArea').val();
    if (noteContent.trim() === '') {
        alert('Cannot save an empty note.');
        return;
    }

    let noteTitle = prompt("Enter the title for this note:");
    if (!noteTitle) return;
    
    let notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push({title: noteTitle, content: noteContent});
    localStorage.setItem("notes", JSON.stringify(notes));
}

function emailToSelf() {
    let noteContent = $('#noteArea').val();
    if (noteContent.trim() === '') {
        alert('Note is empty. Cannot email.');
        return;
    }
    window.location.href = `mailto:?subject=My Note&body=${encodeURIComponent(noteContent)}`;
}

function displayTime() {
    let options = {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    let formatter = new Intl.DateTimeFormat([], options);
    $('#currentTime').text(formatter.format(new Date()));
}

$(document).ready(function() {
    displayTime();
    setInterval(displayTime, 1000);

    $('#exportPdf').on('click', function() {
        let noteText = $('#noteArea').val();
        if (noteText.trim() === '') {
            alert('Note is empty. Cannot export.');
            return;
        }
        let docDefinition = {
            content: [
                { text: 'Note', style: 'header' },
                noteText
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                }
            }
        };
        pdfMake.createPdf(docDefinition).download('Note.pdf');
    });
});
