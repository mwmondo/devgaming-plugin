let UID = /[0-9]+/.exec(document.querySelector('.maintitle.ipsFilterbar.clear.clearfix>span').innerHTML)[0]

notification = (content) => {
    if (document.getElementById('devPlugin_notification') !== null) {
        document.querySelector("#devPlugin_notification").innerHTML = content;
    } else {
        let container = document.querySelector(".groupStats").parentElement
        let notification = document.createElement("div")
        notification.className = "message unspecific"
        notification.id = 'devPlugin_notification'
        notification.style.marginBottom = "-15px"
        notification.style.marginTop = "15px"
        notification.innerHTML = content
        container.appendChild(notification)
    
    }
}

calcPayday = (duty, rank) => {
    let settings = {
        time : [
            localStorage.getItem(`devPlugin_${UID}_time_1_${rank}`), 
            localStorage.getItem(`devPlugin_${UID}_time_2_${rank}`), 
            localStorage.getItem(`devPlugin_${UID}_time_3_${rank}`), 
            localStorage.getItem(`devPlugin_${UID}_time_4_${rank}`), 
            localStorage.getItem(`devPlugin_${UID}_time_5_${rank}`)
        ], 
        payday : [
            localStorage.getItem(`devPlugin_${UID}_payday_1_${rank}`), 
            localStorage.getItem(`devPlugin_${UID}_payday_2_${rank}`), 
            localStorage.getItem(`devPlugin_${UID}_payday_3_${rank}`), 
            localStorage.getItem(`devPlugin_${UID}_payday_4_${rank}`), 
            localStorage.getItem(`devPlugin_${UID}_payday_5_${rank}`)
        ]
    }
    var payday = 0;
    var maxtime = 0;
    for (let x = 0; x < 5; x++) {
        if (parseInt(duty) >= parseInt(settings.time[x])) {
            if (maxtime < parseInt(settings.time[x])) {
                var maxtime = parseInt(settings.time[x]);
                var payday = settings.payday[x];
            }
        }
    }
    return payday;
}

setPaydays = () => {
    if (localStorage.getItem(`devPlugin_${UID}`) == "1") {
        let employees = document.querySelectorAll('#groupsubmit tbody>tr[id]:not(.row_permissions)')
        let timeRegex = /[0-9]+(?=min)/

        employees.forEach((employee) => {
            let online = timeRegex.exec(employee.querySelectorAll('td')[3].innerHTML)[0]
            let duty = timeRegex.exec(employee.querySelectorAll('td')[2].innerHTML)[0]
            let rankdiv = employee.parentElement.parentElement.parentElement.previousElementSibling.innerHTML
            let rank = /[0-9]+/.exec(rankdiv)[0]

            if (localStorage.getItem(`devPlugin_${UID}_payday_1_${rank}`) !== null) {
                if (online < 30) {
                    var payday = 0
                } else {
                    var payday = calcPayday(duty, rank)
                }

                let paydayCell = employee.querySelectorAll('td')[5].querySelector('input')
                paydayCell && (paydayCell.value = payday)
            }
        })
        notification('Wypłaty zostały pomyślnie ustawione')
    } else {
        notification('Wypłaty nie mogą zostać ustawione, ponieważ nie znaleziono konfiguracji')
    }
}

button = () => {
    let container = document.querySelector(".groupStats").parentElement
    let button = document.createElement("a")
    button.id = "setPaydays"
    button.style = "margin-top: -5px; margin-right: 5px;"
    button.className = "ipsButton right"
    button.innerHTML = "<img src='https://puu.sh/CECnf/900ffc382c.png'> Ustaw wypłaty"
    button.addEventListener('click', setPaydays)
    container.appendChild(button)

    if (localStorage.getItem(`devPlugin_${UID}`) !== "1") {
        notification("Nie znaleziono konfiguracji do tego panelu.");
    }
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
                    <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_1" value ="${value.time[0]}">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_1" value="${value.payday[0]}"><br />
                    <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_2" value ="${value.time[1]}">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_2" value="${value.payday[1]}"><br />
                    <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_3" value ="${value.time[2]}">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_3" value="${value.payday[2]}"><br />
                    <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_4" value ="${value.time[3]}">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_4" value="${value.payday[3]}"><br />
                    <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_5" value ="${value.time[4]}">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_5" value="${value.payday[4]}"><br />
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
                <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_1">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_1"><br />
                <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_2">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_2"><br />
                <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_3">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_3"><br />
                <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_4">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_4"><br />
                <input type="number" maxlength="4" max="1440" size="4" min="30" placeholder="Czas" name="time${y}_5">min. <span style="margin-left: 15px; margin-right: 15px;">>=</span> $<input type="number" placeholder="Wypłata" maxlength="4" max="9999" size="4" name="payday${y}_5"><br />
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
        </form>
        <br />
        &copy; <a href = "https://devgaming.pl/user/108693-freeman/">Freeman</a> 2019 | ver. 1.0.2
        `;
        document.querySelector("div.ipsLayout.ipsLayout_withleft.ipsLayout_smallleft.ipsVerticalTabbed.clearfix").style.display = 'none';
        document.querySelector("div.clearfix.ipsLayout div.ipsBox.table_wrap").appendChild(div);
        let buttonS = document.createElement("div")
        buttonS.style.textAlign = "center"
        buttonS.id = "saveSettings"
        buttonS.innerHTML = "<a class='input_submit'>Zapisz zmiany</a>"
        buttonS.addEventListener('click', settingsForm)
        document.querySelector("form#settingssubmit").appendChild(buttonS);
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

settingsForm = () => {
    var form = document.getElementById('settingssubmit');

    for (let x = 0; x < form.elements.length; x++) {
        // console.log(form.elements[x].name);
        let name = form.elements[x].name;
        localStorage.setItem(`devPlugin_${UID}`, 1);        
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
    location.reload(); 
}

button();
settings();