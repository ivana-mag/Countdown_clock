var ivanasClock = {
    container: null,
    header: null,
    clockHolder: null,
    countDownClock: null,
    theDate: null,
    theDays: null,
    theHours: 0,
    theMinutes: 0,
    theSeconds: 0,
    format: null,
    noon: 12,
    meridian: "",
    theWeekend: null,
    countdownDate: null,
    now: null,
    daysToWE: null,
    theWeekend: null,
    clockInterval: null,
    chooseDay: "",
    chooseMonth: "",
    chooseYear: "",
    submitBtn: null,

    init() {
        var t = this;
        if (!t.clockHolder) {
            return false;
        };
        t.startClock("24")
        t.chooseFormat();
    },

    startClock(format) {
        var t = this;

        t.clockInterval = setInterval(() => {
            t.clockHolder.innerHTML = t.setupDate(format);
            t.submitBtn.addEventListener('click', () => {
                t.countdownWeekend();
                
                if (t.daysToWE <= 0) {
                    clearInterval(countDown);
                    t.countDownClock.innerHTML = "Enjoy the weekend!";
                }
                t.submitBtn.style.display = "none";
                t.countDownClock.style.display = "block";
            });

        }, 1000)
    },

    chooseFormat() {
        var t = this;
        t.format.addEventListener("change", () => {
            if (t.format.value === "12") {
                clearInterval(t.clockInterval);
                t.startClock("12")
                return;
            }
            clearInterval(t.clockInterval);
            t.startClock("24");
            return;
        });
    },

    setupDate(format) {
        var t = this;
        t.theDate = new Date();
        t.theHours = t.theDate.getHours();
        t.theMinutes = t.theDate.getMinutes();
        t.theSeconds = t.theDate.getSeconds();
        if (format === "12") {
            t.clock12H();
            var output = `${t.fixDigits(t.theHours)}:${t.fixDigits(t.theMinutes)}:${t.fixDigits(t.theSeconds)} ${t.meridian}`;
        }
        if (format === "24") {
            output = `${t.fixDigits(t.theHours)}:${t.fixDigits(t.theMinutes)}:${t.fixDigits(t.theSeconds)}`;
        }
        // t.countdownWeekend(`${t.chooseMonth.value}`, `${t.chooseDay.value}`, `${t.chooseYear.value}`, '00:00:00');
        t.countdownWeekend(t.chooseMonth.value, t.chooseDay.value, t.chooseYear.value, '00:00:00');
        return output;
    },

    clock12H() {
        var t = this;

        if (t.theHours >= t.noon) {
            t.meridian = "PM"
        }
        t.meridian = "AM"

        if (t.theHours > t.noon) {
            t.theHours = t.theHours - 12;
            t.meridian = "PM"
        }
    },

    fixDigits(digit) {
        return parseInt(digit) < 10 ? `0${digit}` : digit;
    },


    countdownWeekend(month, day, year, time) {

        var t = this;
        t.countdownDate = new Date(`${month} ${day} , ${year} ${time}`).getTime();
        t.countdownDate = new Date(`${month} ${day} , ${year} ${time}`).getTime();
        //console.log(month, day, year, time)
        t.now = new Date().getTime();
        t.daysToWE = t.countdownDate - t.now
        t.theDays = Math.floor(t.daysToWE / (1000 * 60 * 60 * 24));
        t.theHours = Math.floor((t.daysToWE % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));;
        t.theMinutes = Math.floor((t.daysToWE % (1000 * 60 * 60)) / (1000 * 60));
        t.theSeconds = Math.floor((t.daysToWE % (1000 * 60)) / 1000);
        t.countDownClock.innerHTML = `${t.theDays}d ${t.theHours}h ${t.theMinutes}m ${t.theSeconds}s to go`
    }
};



