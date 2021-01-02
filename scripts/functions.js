/*Functions for Interest Calculation Start*/


function simpleinterest() {
    buttonToggle();
    spinLoader();
    var p = parseInt(document.getElementById('input1').value);
    var t = parseInt(document.getElementById('input2').value);
    var r = (document.getElementById('input3').value);
    var principle = [],
        interest = [],
        nums = [];
    var i = Math.round(p * t * r / 100);
    var total = i + p;

    document.getElementById('principleResult').innerHTML = numberWithCommas(p);
    document.getElementById('totalResult').innerHTML = numberWithCommas(total);
    document.getElementById('interestResult').innerHTML = numberWithCommas(i);

    document.getElementById('showip1').innerHTML = numberWithCommas(p);
    document.getElementById('showip2').innerHTML = t + " years";
    document.getElementById('showip3').innerHTML = r + "% per annum";

    for (var temp = 0; temp < t; temp++) {
        principle[temp] = p;
        interest[temp] = Math.round(p * (temp + 1) * r / 100);
        nums[temp] = temp + 1;
    }

    Piechart(p, i);
    Barchart(principle, interest, nums);
}

function compoundinterest() {
    buttonToggle();
    spinLoader();
    var p = parseInt(document.getElementById('input1').value);
    var t = parseInt(document.getElementById('input2').value);
    var r = (document.getElementById('input3').value);
    var ci = parseInt(document.getElementById('input4').value);

    var n = 12 / ci;
    var tot = p * (Math.pow(1 + 0.01 * r / n, n * t));
    tot = Math.round(tot);
    var i = tot - p;
    document.getElementById("principleResult").innerHTML = numberWithCommas(p);
    document.getElementById("interestResult").innerHTML = numberWithCommas(i);
    document.getElementById("totalResult").innerHTML = numberWithCommas(tot);
    document.getElementById('showip1').innerHTML = numberWithCommas(p);
    document.getElementById('showip2').innerHTML = t + " years";
    document.getElementById('showip3').innerHTML = r + "% per annum";
    document.getElementById('showip4').innerHTML = "Every " + ci + " month(s)";

    var principleArray = [],
        labelsArray = [],
        interestArray = [];
    for (var temp = 0; temp < t; temp++) {
        principleArray[temp] = p;
        interestArray[temp] = Math.round(p * (Math.pow(1 + 0.01 * r / n, n * (temp + 1))) - p);
        labelsArray[temp] = temp + 1;
    }
    Piechart(p, i);
    Barchart(principleArray, interestArray, labelsArray);
};

function fixeddeposit() {
    buttonToggle();
    spinLoader();
    var p = parseInt(document.getElementById('input1').value);
    var t = parseInt(document.getElementById('input2').value);
    var r = (document.getElementById('input3').value);
    var ci = 3;
    var n = 12 / ci;
    var tot = p * (Math.pow(1 + 0.01 * r / n, n * t));
    tot = Math.round(tot);
    var i = tot - p;
    document.getElementById("principleResult").innerHTML = numberWithCommas(p);
    document.getElementById("interestResult").innerHTML = numberWithCommas(i);
    document.getElementById("totalResult").innerHTML = numberWithCommas(tot);
    document.getElementById('showip1').innerHTML = numberWithCommas(p);
    document.getElementById('showip2').innerHTML = t + " years";
    document.getElementById('showip3').innerHTML = r + "% per annum";

    Piechart(p, i);
    var principleArray = [];
    var labelsArray = [];
    var interestArray = [];
    for (var temp = 0; temp < t; temp++) {
        principleArray[temp] = p;
        interestArray[temp] = p * (Math.pow(1 + 0.01 * r / n, n * (temp + 1))) - p;
        labelsArray[temp] = temp + 1;
    }
    Barchart(principleArray, interestArray, labelsArray);
};

function recurringdeposit() {
    buttonToggle();
    spinLoader();
    var mi = parseInt(document.getElementById('input1').value);
    var t = parseInt(document.getElementById('input2').value);
    var r = (document.getElementById('input3').value);

    var n = t * 4;
    var i = r / 400;
    var tot = (mi * (Math.pow(1 + i, n) - 1)) / (1 - Math.pow(1 + i, -1 / 3));
    tot = Math.round(tot);
    i = tot - t * 12 * mi;
    document.getElementById("principleResult").innerHTML = numberWithCommas(mi * t * 12);
    document.getElementById("interestResult").innerHTML = numberWithCommas(i);
    document.getElementById("totalResult").innerHTML = numberWithCommas(tot);
    document.getElementById('showip1').innerHTML = numberWithCommas(mi);
    document.getElementById('showip2').innerHTML = t + " years";
    document.getElementById('showip3').innerHTML = r + "% per annum";

    Piechart(mi * t, i);
    var principleArray = [];
    var labelsArray = [];
    var interestArray = [];
    for (var temp = 0; temp < t; temp++) {
        principleArray[temp] = mi * (temp + 1) * 12;
        labelsArray[temp] = temp + 1;
        n = (temp + 1) * 4;
        i = r / 400;
        tot = (mi * (Math.pow(1 + i, n) - 1)) / (1 - Math.pow(1 + i, -1 / 3));
        interestArray[temp] = Math.round(tot) - (temp + 1) * 12 * mi;
    }
    Barchart(principleArray, interestArray, labelsArray);
};

function lumpSum() {
    buttonToggle();
    spinLoader();
    var p = parseInt(document.getElementById('input1').value);
    var t = parseInt(document.getElementById('input2').value);
    var r = (document.getElementById('input3').value);
    var tot = p * (Math.pow(1 + 0.01 * r, t));
    tot = Math.round(tot);
    var i = tot - p;
    document.getElementById("principleResult").innerHTML = numberWithCommas(p);
    document.getElementById("interestResult").innerHTML = numberWithCommas(i);
    document.getElementById("totalResult").innerHTML = numberWithCommas(tot);
    document.getElementById('showip1').innerHTML = numberWithCommas(p);
    document.getElementById('showip2').innerHTML = t + " years";
    document.getElementById('showip3').innerHTML = r + "% per annum";

    Piechart(p, i);
    var principleArray = [];
    var labelsArray = [];
    var interestArray = [];
    for (var temp = 0; temp < t; temp++) {
        principleArray[temp] = p;
        interestArray[temp] = Math.round(p * (Math.pow(1 + 0.01 * r, (temp + 1))) - p);
        labelsArray[temp] = temp + 1;
    }
    Barchart(principleArray, interestArray, labelsArray);
};

function sip() {
    buttonToggle();
    spinLoader();
    var mi = parseInt(document.getElementById('input1').value);
    var t = parseInt(document.getElementById('input2').value);
    var r = parseInt(document.getElementById('input3').value);
    var n = t * 12;
    var i = r / 1200;
    var tot = mi * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    tot = Math.round(tot);
    i = tot - t * 12 * mi;
    document.getElementById("principleResult").innerHTML = numberWithCommas(mi * t * 12);
    document.getElementById("interestResult").innerHTML = numberWithCommas(i);
    document.getElementById("totalResult").innerHTML = numberWithCommas(tot);

    document.getElementById('showip1').innerHTML = numberWithCommas(mi);
    document.getElementById('showip2').innerHTML = t + " years";
    document.getElementById('showip3').innerHTML = r + "% per annum";


    Piechart(mi * t, i);
    var principleArray = [];
    var labelsArray = [];
    var interestArray = [];
    for (var temp = 0; temp < t; temp++) {
        principleArray[temp] = mi * (temp + 1) * 12;
        labelsArray[temp] = temp + 1;
        n = (temp + 1) * 12;
        i = r / 1200;
        tot = mi * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
        interestArray[temp] = Math.round(tot) - (temp + 1) * 12 * mi;
    }
    Barchart(principleArray, interestArray, labelsArray);
};


function personalloan() {
    buttonToggle();
    spinLoader();
    var p = parseInt(document.getElementById('input1').value);
    var n = parseInt(document.getElementById('input2').value);
    var r = (document.getElementById('input3').value);

    var rm = r / 1200;
    var emi = p * rm * Math.pow(1 + rm, n) / (Math.pow(1 + rm, n) - 1);
    var principle = [];
    var interest = [];
    var remPrinciple = [];
    var nums = [];
    interest[0] = (rm * p);
    principle[0] = emi - interest[0];
    remPrinciple[0] = (p - (principle[0]));
    nums[0] = 1;
    for (var temp = 1; temp < n; temp++) {
        interest[temp] = (remPrinciple[temp - 1] * rm);
        principle[temp] = emi - interest[temp];
        remPrinciple[temp] = (remPrinciple[temp - 1] - principle[temp]);
        nums[temp] = temp + 1;
    }
    var interestSum = 0;
    for (var temp = 0; temp < n; temp++) {
        interestSum = interestSum + interest[temp];
    }
    var totalRes = interestSum + p;
    document.getElementById("EMIresult").innerHTML = numberWithCommas(Math.round(emi));
    document.getElementById("interestResult").innerHTML = numberWithCommas(Math.round(interestSum));
    document.getElementById("totalResult").innerHTML = numberWithCommas(Math.round(totalRes));

    document.getElementById('showip1').innerHTML = numberWithCommas(p);
    document.getElementById('showip2').innerHTML = n + " months";
    document.getElementById('showip3').innerHTML = r + "% per annum";


    Piechart(p, emi * n - p);
    principle = roundArray(principle);
    interest = roundArray(interest);
    Barchart(principle, interest, nums);
    createTable(principle, interest, remPrinciple, n);
};

function roundArray(ar) {
    var roundar = [];
    var len = ar.length;
    for (var temp = 0; temp < len; temp++) {
        roundar[temp] = Math.round(ar[temp]);
    }
    return roundar;
};

function createTable(princpleArray, interestArray, remPrincipleArray, time) {
    var table = "";
    table += "<table id='myTable'>";
    table += "<tr><th>Months</th><th>Principle</th><th>Interest</th><th>Rem Principle</th></tr>"
    for (var temp = 0; temp < time; temp++) {
        table += "<tr>"
        table += "<td>" + (temp + 1) + "</td>";
        table += "<td>" + numberWithCommas(Math.round(princpleArray[temp])) + "</td>";
        table += "<td>" + numberWithCommas(Math.round(interestArray[temp])) + "</td>";
        table += "<td>" + numberWithCommas(Math.round(remPrincipleArray[temp])) + "</td>";
        table += "</tr>"
    }
    table += "</table>";
    document.getElementById("tableContainer").innerHTML = table;
};

function showTable() {
    document.getElementById("tableContainer").style.display = "block";
    document.getElementById("showTableButton").style.display = "none";
    document.getElementById("hideTableButton").style.display = "block";
};

function hideTable() {
    document.getElementById("tableContainer").style.display = "none";
    document.getElementById("showTableButton").style.display = "block";
    document.getElementById("hideTableButton").style.display = "none";
}

function Piechart(p, i) {
    pieDiagram.data.datasets[0].data = [p, Math.round(i)];
    pieDiagram.update();
};

function Barchart(principle, interest, nums) {
    bargraph.data.labels = nums;
    bargraph.data.datasets[0].data = principle;
    bargraph.data.datasets[1].data = interest;
    bargraph.update();
};




var ctx1 = document.getElementById("pieChart").getContext('2d');
var pieDiagram = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ['Principle', 'Interest'],
        datasets: [{
            data: [100, 10],
            backgroundColor: ['rgba(54, 162, 235,1)', '#57cf87', ],
            borderColor: ['white', 'white', ],
        }]
    },
    options: {
        aspectRatio: 1,
        scales: {
            yAxes: [{
                ticks: {
                    display: false
                },
                gridLines: {
                    display: false
                },
            }],
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: false
                },
            }]
        }
    }
});

var ctx2 = document.getElementById("barChart").getContext('2d');
var bargraph = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [10, 20, 30],
        datasets: [{
            label: 'Principle',
            backgroundColor: "rgba(54, 162, 235,1)",
            data: [10, 20, 30],
        }, {
            label: 'Interest',
            backgroundColor: "#57cf87",
            data: [10, 20, 30],
        }],
    },
    options: {
        tooltips: {
            displayColors: true,
            callbacks: {
                mode: 'x',
            },
        },
        scales: {
            xAxes: [{
                stacked: true,
                gridLines: {
                    display: false,
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                },
                type: 'linear',
            }]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'bottom'
        },
    }
});


