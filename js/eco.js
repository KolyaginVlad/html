let qnumcur = -1;


class Question {
    constructor(qtype, qtext, answers, correctansw) {
        this.qtype = qtype;
        this.qtext = qtext;
        this.answers = answers;
        this.correctansw = correctansw;
        this.useransws = [];
        if (this.qtype === 'checkbox') {
            for (var i = 0; i < correctansw.length; i++)
                this.useransws[i] = false;
        } else if (this.qtype === 'radiobutton') {
            this.useransws = -1;
        } else if (this.qtype === 'select') {
            this.useransws = "Выберите ответ";
        } else if (this.qtype === 'text') {
            this.useransws = "";
        }
    }


    addansw() {

        if (this.qtype === 'checkbox') {
            let answarr = [];
            for (var i = 0; i < this.answers.length; i++) {
                answarr[i] = document.getElementById('chck' + i).checked;
                this.useransws = answarr;

            }
        } else if (this.qtype === 'radiobutton') {
            this.useransws = -1;
            for (var i = 0; i < this.answers.length; i++) {
                if (document.getElementById('rdbt' + i).checked) {
                    this.useransws = i;
                    break;
                }
            }

        } else if (this.qtype === 'select') {
            let answsec = document.getElementById('sec').value;
            this.useransws = answsec;
        } else if (this.qtype === 'text') {
            let answtext = document.getElementById('textt').value;
            this.useransws = answtext;
        }
    }

}

let questions =
    [
        new Question("radiobutton", "1. Участок территории,на котором сохраняется \n\
\n\ в естественном состоянии весь его природный комплекс, как правило, закрытый для посещения туристами.",
            ["Заповедник", "Зоопарк", "Зона отдыха", "Национальный парк"], 0),

        new Question("radiobutton", "2. Какого числа отмечается день заповедников?",
            ["23 февраля", "11 января", "12 апреля", "9 июня"], 1),

        new Question("checkbox", "3. В чем сущность заповедников?",
            ["Сохранение редких видов животных", "Сохранение экосистем", "Ограждение территории от людских глаз",
                "Ограждение территории для сдачи в аренду"], [true, true, false, false]),

        new Question("checkbox", "4. Какую функцию не выполняют заповедники?",
            ["сохранение экологического равновесия, биоразнообразия",
                "предотвращение ущерба от неадекватной эксплуатации и косвенных антропогенных воздействий",
                "ресурсоохранная, ресурсосберегающая, ресурсовосстановительная, охрана и восстановление генофонда",
                "информационная,просветительская, рекреационная, эксплуатационная",
                "туристическая, развлекательная"], [false, false, false, false, true]),

        new Question("select", "5. Сколько существует заповедников на сегодняшний день во всем мире?",
            ["123", "654", "1090", "309"], '654'),

        new Question("select", "6. Какой заповедник считается самым известным в мире?",
            ["Национальный парк Крюгера, Южная Африка", "Национальный заповедник Сагарматха, Непал",
                "Заповедник Фьордланд, Новая Зеландия", "Национальный парк Галапагосских островов, Эквадор"],
            'Заповедник Фьордланд, Новая Зеландия'),

        new Question("select", "7. Какое из этих мест стало первым официальным заповедником в мире?",
            ["Баргузинский заповедник", "Швейцарский кантоне Граубюнден",
                "Йеллоустонский национальный парк в США", "Михинталь"], 'Йеллоустонский национальный парк в США'),

        new Question("text",
            "8. Решите ребус, чтобы узнать, какое животное считается одним из самых красивых в Байкальском заповеднике: изюм'+''бобр+''''олень",
            "изюбрь", 'Изюбрь')];

let sinterval;

function showdisplay() {

    begint();
    sinterval = setInterval(interval, 1000);
    document.getElementById('1').innerHTML = "";
    display = "";
    display += '<div id="end"> Осталось: <div id="clock">' + document.getElementById('timer').value + ':00</div></div>';
    display += '<div id="question"> \n\ Выберите вoпрос ';
    display += '<div ><br></div>';
    display += '<div id="button">';
    display += '<div id="qst"></div>';
    display += '<div id="answ"></div>';
    display += '<input class="button_q" id="answer1" type="button" value="1" \n\
                \n\ onclick="show_question(1)"> <br>';
    display += '<input class="button_q" id="answer2" type="button" value="2" \n\
                \n\ onclick="show_question(2)"> <br>';
    display += '<input class="button_q" id="answer3" type="button" value="3" \n\
                \n\ onclick="show_question(3)"> <br>';
    display += '<input class="button_q" id="answer4" type="button" value="4" \n\
                \n\ onclick="show_question(4)"> <br>';
    display += '<input class="button_q" id="answer5" type="button" value="5" \n\
                \n\ onclick="show_question(5)"> <br>';
    display += '<input class="button_q" id="answer6" type="button" value="6" \n\
                \n\ onclick="show_question(6)"> <br>';
    display += '<input class="button_q" id="answer7" type="button" value="7" \n\
                \n\ onclick="show_question(7)"> <br>';
    display += '<input class="button_q" id="answer8" type="button" value="8" \n\
                \n\ onclick="show_question(8)"> <br>';
    display += '</div><br>';
    display += '<input class="button_q" id="finish" type="button" \n\
                value="Завершить тестирование" onclick="finish()" > </div>';
    document.getElementById('1').innerHTML = display;
    document.getElementById('board').style.display = 'none';
}

let Itimeout;

function begint() {
    var timer1 = document.getElementById('timer');
    Itimeout = setTimeout(timeout, parseInt(timer1.value) * 60000);
}

function timeout() {
    alert("Время вышло!");
    finish();
}

function interval() {
    let timer = document.getElementById("clock");
    let time = timer.innerText.split(":");
    if (time[1] === "00" && time[0] !== "0") {
        time[0] = Number.parseInt(time[0]) - 1;
        time[1] = 59;
    } else if (time[1] !== "00") {
        time[1] = Number.parseInt(time[1]) - 1;
        if ((time[1] + "").length < 2) time[1] = "0" + time[1];
    }
    timer.innerText = time[0] + ":" + time[1];
}

function show_question(num) {
    if (qnumcur !== -1) {
        questions[qnumcur].addansw();
        if (questions[qnumcur].qtype === 'checkbox') {
            let flag = true;
            for (var i = 0; i < questions[qnumcur].answers.length; i++) {
                if (document.getElementById('chck' + i).checked) {
                    flag = false;
                    break;
                }

            }
            if (flag) {
                //Покрасить кнопку вопроса в цвет, обозначающий, что нет ответа
                //document.getElementById('answer'+(qnumcur+1)).style.background = "red"
            } else {
                //Покрасить кнопку вопроса в цвет, обозначающий, что есть ответ
                //document.getElementById('answer'+(qnumcur+1)).style.background = "green"
            }
        } else if (questions[qnumcur].qtype === 'radiobutton') {
            let flag = true;
            for (var i = 0; i < questions[qnumcur].answers.length; i++) {
                if (document.getElementById('rdbt' + i).checked) {
                    flag = false;
                    break;
                }

            }
            if (flag) {
                //Покрасить кнопку вопроса в цвет, обозначающий, что нет ответа
                //document.getElementById('answer'+(qnumcur+1)).style.background = ...
            } else {
                //Покрасить кнопку вопроса в цвет, обозначающий, что есть ответ
            }

        } else if (questions[qnumcur].qtype === 'select') {
            if (document.getElementById('sec').value === "Выберите ответ") {
                //Покрасить кнопку вопроса в цвет, обозначающий, что нет ответа
                //document.getElementById('answer'+(qnumcur+1)).style.background = ...
            } else {
                //Покрасить кнопку вопроса в цвет, обозначающий, что есть ответ
            }
            let answsec = document.getElementById('sec').value;
            this.useransws = answsec;
        } else if (questions[qnumcur].qtype === 'text') {
            if (document.getElementById('textt').value === "") {
                //Покрасить кнопку вопроса в цвет, обозначающий, что нет ответа
                //document.getElementById('answer'+(qnumcur+1)).style.background = "red"
            } else {
                //Покрасить кнопку вопроса в цвет, обозначающий, что есть ответ
                //document.getElementById('answer'+(qnumcur+1)).style.background = "green"
            }
            let answtext = document.getElementById('textt').value;
            this.useransws = answtext;
        }
    }
    qnumcur = num - 1;
    document.getElementById('qst').innerHTML = questions[num - 1].qtext;
    document.getElementById('answ').innerHTML = "";
    if (questions[num - 1].qtype === "checkbox") {
        let answ = document.getElementById('answ');
        for (var i = 0; i < questions[num - 1].answers.length; i++) {
            if (questions[num - 1].useransws[i])
                answ.innerHTML +=
                    "<label><input type='checkbox' id='chck" + i + "' name='ch' checked='checked'>" +
                    questions[num - 1].answers[i] + "</label>";
            else
                answ.innerHTML +=
                    "<label><input type='checkbox' id='chck" + i + "' name='ch'>" + questions[num - 1].answers[i] +
                    "</label>";
            // let chck = document.createElement('input');
            // let lbl = document.createElement('label');
            // chck.type = 'checkbox';
            // chck.name = 'ch';
            // chck.id = 'chck' + i;
            //
            // if (questions[num -1].useransws[i])
            //     chck.checked = true;
            // lbl.appendChild(chck);
            // lbl.innerHTML += questions[num - 1].answers[i];
            // answ.appendChild(lbl);
            answ.appendChild(document.createElement('br'));
        }
    } else if (questions[num - 1].qtype === "radiobutton") {
        let answ = document.getElementById('answ');
        for (var i = 0; i < questions[num - 1].answers.length; i++) {
            if (questions[num - 1].useransws === i)
                answ.innerHTML +=
                    "<label><input type='radio' id='rdbt" + i + "' name='rb'checked='checked'>" +
                    questions[num - 1].answers[i] + "</label>";
            else
                answ.innerHTML +=
                    "<label><input type='radio' id='rdbt" + i + "' name='rb'>" + questions[num - 1].answers[i] +
                    "</label>";
            // let rdb = document.createElement('input');
            // let lbl = document.createElement('label');
            // rdb.type = 'radio';
            // rdb.name = 'rb';
            // rdb.id = 'rdbt' + i;
            //
            // if (questions[num - 1].useransws===i)
            //     rdb.checked = true;
            // lbl.appendChild(rdb);
            // lbl.innerHTML += questions[num - 1].answers[i];
            // answ.appendChild(lbl);
            answ.appendChild(document.createElement('br'));
        }
    } else if (questions[num - 1].qtype === "select") {
        let answ = document.getElementById('answ');
        let slct = document.createElement('select');
        let option = document.createElement('option');
        option.innerHTML += "Выберите ответ";
        option.value = "Выберите ответ";
        slct.appendChild(option);
        for (var i = 0; i < questions[num - 1].answers.length; i++) {
            option = document.createElement('option');
            option.innerHTML += questions[num - 1].answers[i];
            option.value = questions[num - 1].answers[i];
            slct.appendChild(option);
        }
        slct.id = 'sec';

        if (questions[num - 1].useransws !== "")
            slct.value = questions[num - 1].useransws;
        answ.appendChild(slct);
        answ.appendChild(document.createElement('br'));
    } else if (questions[num - 1].qtype === "text") {
        let answ = document.getElementById('answ');
        let tx = document.createElement('input');
        let pod = document.createTextNode("Напишите ответ");
        answ.appendChild(pod);
        answ.appendChild(document.createElement('br'));
        tx.value = questions[num - 1].useransws;
        answ.appendChild(tx);
        tx.id = 'textt';
        answ.appendChild(document.createElement('br'));
    }

}


function finish() {
    if (qnumcur !== -1)
        questions[qnumcur].addansw();
    document.getElementById('finish').hidden = true;
    document.getElementById('clock1').style.display = 'none';
    clearInterval(sinterval);
    clearTimeout(Itimeout);
    document.getElementById('1').style.display = "none";
    formTheTable();
}

function formTheTable() {
    document.getElementById('btn1').hidden = true;
    var x = document.createElement("TABLE");
    x.setAttribute("id", "tbl");
    document.body.appendChild(x);

    var brr = document.createElement("tr");
    brr.setAttribute("id", "tr");
    document.getElementById("tbl").appendChild(brr);

    var vpr = document.createElement("Th");
    vpr.setAttribute("id", "vpr");
    var otvet = document.createElement("Th");
    otvet.setAttribute("id", "otvet");
    var right = document.createElement("Th");
    right.setAttribute("id", "right");
    document.getElementById("tbl").appendChild(vpr);
    document.getElementById("tbl").appendChild(otvet);
    document.getElementById("tbl").appendChild(right);

    var head = document.createTextNode("№");
    var head1 = document.createTextNode("Ваш ответ");
    var head2 = document.createTextNode("Правильный ответ");

    vpr.appendChild(head);
    otvet.appendChild(head1);
    right.appendChild(head2);

    var str, num, answ;

    for (var i = 0; i < 8; i++) {
        str = document.createElement("tr");
        str.setAttribute("id", "str");
        num = document.createTextNode(i + 1);
        str.appendChild(num);
        document.getElementById("vpr").appendChild(str);
    }

    for (var i = 0; i < 8; i++) {

        str = document.createElement("tr");
        str.setAttribute("id", "str");
        if (questions[i].qtype === 'checkbox') {
            let flag = false;
            let allCor = true;
            for (let j = 0; j < questions[i].useransws.length; j++) {
                if (questions[i].useransws[j]) {
                    flag = true;
                    break;
                }
                if (questions[i].useransws[j] !== questions[i].correctansw[j])
                    allCor = false;
            }
            if (flag)
                for (var j = 0; j < questions[i].useransws.length; j++) {
                    if (questions[i].useransws[j]) {
                        if (allCor) {
                            //Тут нужно покрасить в цвет правильного ответа
                        } else {
                            //Тут нужно покрасить в цвет неправильного ответа
                        }
                        answ = document.createTextNode(questions[i].answers[j]);
                        var f = document.createElement('br');
                        str.appendChild(answ);
                        str.appendChild(f);
                        document.getElementById("otvet").appendChild(str);
                    }

                }
            else {
                //Тут нужно покрасить в цвет неправильного ответа
                answ = document.createTextNode("Ответ не дан");
                str.appendChild(answ);
                document.getElementById("otvet").appendChild(str);
            }
        } else if (questions[i].qtype === 'radiobutton') {
            if (questions[i].useransws === -1) {
                //Тут нужно покрасить в цвет неправильного ответа
                answ = document.createTextNode("Ответ не дан");
            } else {
                if (questions[i].useransws === questions[i].correctansw) {
                    //Тут нужно покрасить в цвет правильного ответа
                } else {
                    //Тут нужно покрасить в цвет неправильного ответа
                }
                answ = document.createTextNode(questions[i].answers[questions[i].useransws]);
            }
            str.appendChild(answ);
            document.getElementById("otvet").appendChild(str);
        } else if (questions[i].qtype === 'select') {
            if (questions[i].useransws === "Выберите ответ") {
                //Тут нужно покрасить в цвет неправильного ответа
                answ = document.createTextNode("Ответ не дан");
            } else {
                if (questions[i].useransws === questions[i].correctansw) {
                    //Тут нужно покрасить в цвет правильного ответа
                } else {
                    //Тут нужно покрасить в цвет неправильного ответа
                }
                answ = document.createTextNode(questions[i].useransws);
            }
            str.appendChild(answ);
            document.getElementById("otvet").appendChild(str);
        } else if (questions[i].qtype === 'text') {
            //----------------------------------------------------------------------------------------------------------
            if (questions[i].useransws === "") {
                //Тут нужно покрасить в цвет неправильного ответа
                answ = document.createTextNode("Ответ не дан");
            } else {
                if (questions[i].useransws.toLowerCase() === questions[i].correctansw.toLowerCase()) {
                    //Тут нужно покрасить в цвет правильного ответа
                    //str.style.background = "green";
                } else {
                    //Тут нужно покрасить в цвет неправильного ответа
                    //str.style.background = "red";
                }
                answ = document.createTextNode(questions[i].useransws);
            }
            //Вот такие куски можешь вставить ниже и будет меняться цвет ещё и правильного ответа в зависимости
            //от верности данного пользователем
            //------------------------------------------------------------------------------------------------------
            str.appendChild(answ);
            document.getElementById("otvet").appendChild(str);
        }

    }

    for (var i = 0; i < 8; i++) {
        str = document.createElement("tr");
        str.setAttribute("id", "str");
        if (questions[i].qtype === 'checkbox') {
            for (var j = 0; j < questions[i].correctansw.length; j++) {
                if (questions[i].correctansw[j]) {
                    answ = document.createTextNode(questions[i].answers[j]);
                    var f = document.createElement('br');
                    str.appendChild(answ);
                    str.appendChild(f);
                    document.getElementById("right").appendChild(str);
                }
            }
        } else if (questions[i].qtype === 'radiobutton') {
            answ = document.createTextNode(questions[i].answers[questions[i].correctansw]);
            str.appendChild(answ);
            document.getElementById("right").appendChild(str);
        } else if (questions[i].qtype === 'select') {
            answ = document.createTextNode(questions[i].correctansw);
            str.appendChild(answ);
            document.getElementById("right").appendChild(str);
        } else if (questions[i].qtype === 'text') {
            answ = document.createTextNode(questions[i].correctansw);
            str.appendChild(answ);
            document.getElementById("right").appendChild(str);
        }
    }
}

/*const results =
[
   new Result("Вам многому нужно научиться", 3),
   new Result("Вы уже неплохо разбираетесь", 6),
   new Result("Ваш уровень выше среднего", 8),
   new Result("Вы в совершенстве знаете тему", 10)
];*/

