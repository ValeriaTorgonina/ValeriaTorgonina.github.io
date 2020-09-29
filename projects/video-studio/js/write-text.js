function writeTextByJS(id, text, speed = 100){
    return new Promise((resolve, reject) => {
        var elem = document.getElementById(id),
        txt = text.split("");
    
        var timerId = setInterval(function(){
            if(!txt[0]){
                clearInterval(timerId);
                resolve(false);
            }else {
                elem.innerHTML += txt.shift();
            }
        }, speed);
    })
}

async function typingText() {
    const arrOfTitle = [
        {id: 1, text: "научитесь создавать"}, 
        {id: 2, text: "популярные"},
        {id: 3, text: "видео"},
        {id: 4, text: "Своими руками"}
    ]
    for(const {id, text} of arrOfTitle) {
        if(id === 3) {
            document.getElementById(id).classList.add('main-title__red');
        }
        await writeTextByJS(
            `${id}`,
            text
        )
    }
}

typingText()