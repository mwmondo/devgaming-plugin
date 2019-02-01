let UID = /[0-9]+/.exec(document.querySelector('.maintitle.ipsFilterbar.clear.clearfix>span').innerHTML)[0]

button = () => {
    let container = document.querySelector(".groupStats").parentElement
    let button = document.createElement("a")
    button.id = "setPaydays"
    button.style = "margin-top: -5px; margin-right: 5px;"
    button.className = "ipsButton right"
    button.innerHTML = "<img src='https://puu.sh/CECnf/900ffc382c.png'> Ustaw wypłaty"
    // button.addEventListener('click', setPaydays)
    container.appendChild(button)
}

Settingsmenu = () => {
    if (document.getElementById('dutySettings') !== null) {
        if (document.querySelector('div#dutySettings').style.display == 'none') {
            document.querySelector('div#dutySettings').style.display = 'block';
            document.querySelector("div.ipsLayout.ipsLayout_withleft.ipsLayout_smallleft.ipsVerticalTabbed.clearfix").style.display = 'none';
        } else {
            document.querySelector('div#dutySettings').style.display = 'none';
            document.querySelector("div.ipsLayout.ipsLayout_withleft.ipsLayout_smallleft.ipsVerticalTabbed.clearfix").style.display = 'block';
        }
    } else {
        let UID = /[0-9]+/.exec(document.querySelector('.maintitle.ipsFilterbar.clear.clearfix>span').innerHTML)[0]
        var div = document.createElement("div");
        div.id = 'dutySettings';
        div.classList = 'ipsLayout ipsLayout_smallleft ipsVerticalTabbed clearfix';
        let devRole = document.querySelectorAll("form#groupsubmit div.maintitle.ipsFilterbar.clear.clearfix");
        var content = '';
        for(let x = 0; x < devRole.length; x++) {
            var str = devRole[x].textContent;
            var y = str.substring(6, 7);
            if (localStorage.getItem(`devPlugin_${UID}_time_1_${y}`) !== null) {
                let value = {
                    "time" : [
                        localStorage.getItem(`devPlugin_${UID}_time_1_${y}`),
                        localStorage.getItem(`devPlugin_${UID}_time_2_${y}`),
                        localStorage.getItem(`devPlugin_${UID}_time_3_${y}`),
                        localStorage.getItem(`devPlugin_${UID}_time_4_${y}`),
                        localStorage.getItem(`devPlugin_${UID}_time_5_${y}`)
                    ], 
                    "payday" : [
                        localStorage.getItem(`devPlugin_${UID}_payday_1_${y}`),
                        localStorage.getItem(`devPlugin_${UID}_payday_2_${y}`),
                        localStorage.getItem(`devPlugin_${UID}_payday_3_${y}`),
                        localStorage.getItem(`devPlugin_${UID}_payday_4_${y}`),
                        localStorage.getItem(`devPlugin_${UID}_payday_5_${y}`)
                    ]
                }
                var content = content + `
                <div class = "maintitle ipsFilterbar clear clearfix">
                    ${devRole[x].textContent}
                </div>
                <div class = "ipsBox table_wrap" style = "text-align: center;">
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_1" value = "${value.time[0]}"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_1" value = "${value.payday[0]}"><br />
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_2" value = "${value.time[1]}"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_2" value = "${value.payday[1]}"><br />
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_3" value = "${value.time[2]}"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_3" value = "${value.payday[2]}"><br />
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_4" value = "${value.time[3]}"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_4" value = "${value.payday[3]}"><br />
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_5" value = "${value.time[4]}"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_5" value = "${value.payday[4]}"><br />
                </div>
                <br />
                <br />`;
            } else {
                console.log('Brak konfiguracji dla rangi ' + y);
                var content = content + `
                <div class = "maintitle ipsFilterbar clear clearfix">
                    ${devRole[x].textContent}
                </div>
                <div class = "ipsBox table_wrap" style = "text-align: center;">
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_1"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_1"><br />
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_2"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_2"><br />
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_3"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_3"><br />
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_4"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_4"><br />
                    <input type="number" min="30" placeholder = "Czas" name = "time${y}_5"> > <input type="number" placeholder = "Wypłata" name = "payday${y}_5"><br />
                </div>
                <br />
                <br />`;
            }
        }
        div.innerHTML = `
        <form id = "settingssubmit">
            ${content}
            <br />
            <br />
            <div style = "text-align: center;">
                <a class="input_submit" onclick = "settingsForm(${UID})" id = "saveSettings">Zapisz zmiany</a>
            </div>
        </form>
        <br />
        &copy; <a href = "https://devgaming.pl/user/108693-freeman/">Freeman</a> 2019 | ver. 1.0
        `;
        document.querySelector("div.ipsLayout.ipsLayout_withleft.ipsLayout_smallleft.ipsVerticalTabbed.clearfix").style.display = 'none';
        document.querySelector("div.clearfix.ipsLayout div.ipsBox.table_wrap").appendChild(div);
    }
}

settings = () => {
    let container = document.querySelector("div#devMainMenu.maintitle.ipsFilterbar.clear.clearfix ul")
    let button = document.createElement("li")
    button.id = "settingsPaydays"
    button.innerHTML = "<a href='#'>Ustawienia wypłat</a>"
    button.addEventListener('click', Settingsmenu)
    container.appendChild(button)
}

settingsForm = (UID) => {
    var form = document.getElementById('settingssubmit');

    for (let x = 0; x < form.elements.length; x++) {
        // console.log(form.elements[x].name);
        let name = form.elements[x].name;
        // UID GRUPY | TYP | REGUŁA | NUMER RANGI
        if (name.substring(0, 4) == 'time') {
            let num = name.substring(6);
            let role = name.substring(4, 5);
            if (form.elements[x].value == '') {
                var value = 0;
            } else {
                var value = form.elements[x].value;
            }
            console.log('UID: ' + UID + '| ' + num + ' Zmienna czasu dla Rangi ' + role + ' ma wartość: ' + value);
            localStorage.setItem(`devPlugin_${UID}_time_${num}_${role}`, value); 
        } else if (name.substring(0, 6) == 'payday') {
            let num = name.substring(8);
            let role = name.substring(6, 7);
            if (form.elements[x].value == '') {
                var value = 0;
            } else {
                var value = form.elements[x].value;
            }
            console.log('UID: ' + UID + '| ' + num + ' Zmienna wypłaty dla Rangi ' + role + ' ma wartość: ' + value);
            localStorage.setItem(`devPlugin_${UID}_payday_${num}_${role}`, value); 
        }
    }
}
button();
settings();