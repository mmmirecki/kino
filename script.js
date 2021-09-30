class Main {
    constructor() {
        this.start()
        this.info
        this.miejsca
        this.title
        this.board = []
    }

    start() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", "./connect.php");
        xhttp.onload = () => {
            let data = xhttp.response
            let arr = data
            this.info = JSON.parse(arr)
            this.generateSite()
        }
        xhttp.send();
        //   let arr = []
        //   for(let i = 0;i<10;i++){
        //       arr[i] = []
        //       for(let j = 0;j<20;j++){
        //         arr[i][j] = 0
        //       }
        //   }
        //   console.log(JSON.stringify(arr))
    }

    generateSite() {
        let info = this.info
        document.getElementById("body").innerHTML = "<div id='filmy'></div>"
        for (let i = 0; i < info.length; i++) {
            console.log("miejsca")
            let div = document.createElement('div')
            div.id=info[i].nazwa
            div.innerText = "seans"+i
            div.className = "seans"
            self = this
            div.onclick = function () {
                self.title = this.id
                self.goToSite(info[i])
            }
            document.getElementById("filmy").appendChild(div)
            console.log("strona" + i)
        }
    }

    goToSite(sala) {
        console.log("mieejsa")
        this.miejsca = JSON.parse(sala.miejsca)
        document.getElementById("body").innerHTML = ""
        let back = document.createElement("button")
        back.innerHTML = "wroć"
        self = this
        back.onclick = function () {
            self.generateSite()
        }
        document.getElementById("body").appendChild(back)
        let table = document.createElement("table")
        for (let i = 0; i < this.miejsca.length; i++) {
            let tr = document.createElement("tr")
            this.board.push([])
            for (let j = 0; j < this.miejsca[i].length; j++) {
                let td = document.createElement("td")
                td.innerText = this.miejsca[i][j]
                td.className = "seat"
                td.id = i+"_"+j
                if(td.innerHTML=="1"){
                   td.style.backgroundColor="red" 
                }
                td.onclick = function () {
                    console.log("kilk")
                    if(this.innerHTML=="0"){
                    if (this.className == "seat") {
                        this.className = "rez"
                        self.miejsca[i][j] = 1
                    }
                    else if (this.className == "rez") {
                        this.className = "seat"
                        self.miejsca[i][j] = 0
                    }}
                    else{
                        alert("Wybierz puste miejsce")
                    }
                }
                tr.appendChild(td)
                console.log(td)
                this.board[i].push(td)
            }
            table.appendChild(tr)
        }
        document.getElementById("body").appendChild(table)
        let name = document.createElement("input")
        name.setAttribute("type","text")
        name.id="name"
        let nameLabel = document.createElement("label")
        nameLabel.innerHTML = "Podaj Imie:"
        document.getElementById("body").appendChild(nameLabel)
        document.getElementById("body").appendChild(name)

        let mail = document.createElement("input")
        mail.setAttribute("type","text")
        mail.id ="mail"
        let mailLabel = document.createElement("label")
        mailLabel.innerHTML = "Podaj Mail:"
        document.getElementById("body").appendChild(mailLabel)
        document.getElementById("body").appendChild(mail)

        let reserve = document.createElement("button")
        reserve.innerHTML = "rezerwuj"
        self = this
        reserve.onclick = function () {
            self.reserve()
        }
        document.getElementById("body").appendChild(reserve)
    }

    reserve(){
        let rez = []
        console.log(this.board)
        this.board.forEach(element => {
            element.forEach(element2 => {
                console.log(element2)
                if(element2.className=="rez"){
                    rez.push(element2.id)
                    
                }
            });
        });
        console.log(rez)

        if(document.getElementById("name").value!=""&&document.getElementById("mail").value!=""){
            $.post("./sendData.php",{
                miejsca:JSON.stringify(this.miejsca),
                rez:JSON.stringify(rez),
                film:JSON.stringify(this.title),
                imie:JSON.stringify(document.getElementById("name").value),
                mail:JSON.stringify(document.getElementById("mail").value)
            },function(response){
                console.log(response)
            })
            //alert("dziekujemy za rezerwacje")
            this.generateSite()
        }
        else(
            alert("Wybierz miejsce oraz podaj imie i mail")
        )
        
    }
}

let main = new Main