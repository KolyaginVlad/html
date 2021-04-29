let qnumcur = -1;

class Question {
    constructor(qtype, qtext, answers, correctansw) {
        this.qtype = qtype;
        this.qtext = qtext;
        this.answers = answers;
        this.correctansw = correctansw;
        this.useransws = [];
    }


    addansw() {
        //Теперь обрабатываем ответы тут
        //В классе мы имеем доступ к полям конкретного вопроса, поэтому нам не нужно смотреть в массив. Нужный
        //вопрос выбираем при вызове
        //this.useransws = answers;
        if (this.qtype === 'checkbox') {
            let answarr = [];
            for (var i = 0; i < this.answers.length; i++) {
                answarr[i] = document.getElementById('chck' + i).checked;
                this.useransws = answarr;
                //questions[qnumcur].addansw(answarr);
            }
        } else if (this.qtype === 'radiobutton') {
            //Добавил для будущих проверок на ответ. Теперь если никакой ответ не выбран, то в ответе будет -1 и мы
            //сможем это опознать
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
        //Этой строчкой можешь посмотреть что и в какой момент сохраняется
        //alert(this.useransws);
    }

}
let questions =
    [
        new Question("radiobutton",
            "1. Участок территории,на котором сохраняется в естественном состоянии весь его природный комплекс, как правило, закрытый для посещения туристами.",
            ["Заповедник", "Зоопарк", "Зона отдыха", "Национальный парк"],
            0),

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
                "туристическая, развлекательная"], [true, true, true, true, false]),

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
            "8. Решите ребус, чтобы узнать, какое животное считается одним из самых красивых,в Байкальском заповеднике: изюм'+''бобр+''''олень",
            "изюбрь", 'изюбрь')];

let sinterval;

function showdisplay() {
    begint();
    sinterval = setInterval(interval, 1000);
    document.getElementById('1').innerHTML = "";
    display = "";
    display += '<div> Осталось: <div id="clock">' + document.getElementById('timer').value + ':00</div></div>';
    display += '<div id="question"> \n\ Выберете вoпрос</div>';
    display += '<div id="answer"></div>';
    display += '<div id="button">';
    display += '<div id="qst"></div>';
    display += '<div id="answ"></div>';
    display += '<input class="button_q" type="button" value="1" \n\
                \n\ onclick="show_question(1)"> <br>';
    display += '<input class="button_q" type="button" value="2" \n\
                \n\ onclick="show_question(2)"> <br>';
    display += '<input class="button_q" type="button" value="3" \n\
                \n\ onclick="show_question(3), check(3)"> <br>';
    display += '<input class="button_q" type="button" value="4" \n\
                \n\ onclick="show_question(4)"> <br>';
    display += '<input class="button_q" type="button" value="5" \n\
                \n\ onclick="show_question(5)"> <br>';
    display += '<input class="button_q" type="button" value="6" \n\
                \n\ onclick="show_question(6)"> <br>';
    display += '<input class="button_q" type="button" value="7" \n\
                \n\ onclick="show_question(7)"> <br>';
    display += '<input class="button_q" type="button" value="8" \n\
                \n\ onclick="show_question(8)"> <br>';
    display += '</div><br>';
    display += '<input class="finish" type="button" \n\
                value="Завершить тестирование" onclick="finish()" >';
    document.getElementById('1').innerHTML = display;
}

function begint() {
    var timer1 = document.getElementById('timer');
    setTimeout(timeout, parseInt(timer1.value) * 60000);
}

function timeout() {
    alert("Время вышло!");
    //window.open("html/end.html","_self");
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
    if (qnumcur !== -1)
        questions[qnumcur].addansw();
    qnumcur = num - 1;
    document.getElementById('qst').innerHTML = questions[num - 1].qtext;
    document.getElementById('answ').innerHTML = "";
    if (questions[num - 1].qtype === "checkbox") {
        let answ = document.getElementById('answ');
        for (var i = 0; i < questions[num - 1].answers.length; i++) {
            let chck = document.createElement('input');
            let lbl = document.createElement('label');
            lbl.appendChild(chck);
            chck.type = 'checkbox';
            chck.name = 'ch';
            chck.id = 'chck' + i;
            lbl.innerHTML += questions[num - 1].answers[i];
            answ.appendChild(lbl);
            answ.appendChild(document.createElement('br'));
        }
    } else if (questions[num - 1].qtype === "radiobutton") {
        let answ = document.getElementById('answ');
        for (var i = 0; i < questions[num - 1].answers.length; i++) {
            let rdb = document.createElement('input');
            let lbl = document.createElement('label');
            lbl.appendChild(rdb);
            rdb.type = 'radio';
            rdb.name = 'rb';
            rdb.id = 'rdbt' + i;
            lbl.innerHTML += questions[num - 1].answers[i];
            answ.appendChild(lbl);
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
        answ.appendChild(slct);
        answ.appendChild(document.createElement('br'));
    } else if (questions[num - 1].qtype === "text") {
        let answ = document.getElementById('answ');
        let tx = document.createElement('input');
        answ.appendChild(tx);
        tx.id = 'textt';
        answ.appendChild(document.createElement('br'));

    }
}

function finish() {
    window.open("html/end.html", "_self");
    if (qnumcur !== -1)
        questions[questions].addansw();
}

/*const results =
[
   new Result("Вам многому нужно научиться", 3),
   new Result("Вы уже неплохо разбираетесь", 6),
   new Result("Ваш уровень выше среднего", 8),
   new Result("Вы в совершенстве знаете тему", 10)
];*/

