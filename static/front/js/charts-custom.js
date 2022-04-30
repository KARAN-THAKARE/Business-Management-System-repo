/*global $, document*/
$(document).ready(function () {

    'use strict';


    // ------------------------------------------------------- //
    // Charts Gradients
    // ------------------------------------------------------ //
    var ctx1 = $("canvas").get(0).getContext("2d");
    var gradient1 = ctx1.createLinearGradient(48, 27, 206, 0.73);
        var gradient5 = ctx1.createLinearGradient(43, 75, 226, 0.73);
    gradient1.addColorStop(0, 'rgba(48, 27, 206, 0.50)');
    gradient1.addColorStop(1, 'rgba(48, 27, 206, 0.50)');

    var gradient2 = ctx1.createLinearGradient(27, 183, 218, 0.50);
    gradient2.addColorStop(0, 'rgba(27, 183, 218, 0.50)');
    gradient2.addColorStop(1, 'rgba(27, 183, 218, 0.50)');


    // ------------------------------------------------------- //
    // Line Chart
    // ------------------------------------------------------ //
    var LINECHARTEXMPLE   = $('#lineChartExample');
    var lineChartExample = new Chart(LINECHARTEXMPLE, {
        type: 'line',
        options: {
            legend: {labels:{fontColor:"#777", fontSize: 14}},
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }]
            },
        },
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Aug","Oct","Nov","Dec"],
            datasets: [
                {
                    label: "Total client join",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: gradient1,
                    borderColor: gradient1,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: gradient1,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: gradient1,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [30, 50, 40, 61, 42, 35, 400,30, 50,70,210,300,144],
                    spanGaps: false
                },
                {
                    label: "Orders per client",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: gradient2,
                    borderColor: gradient2,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 1,
                    pointBorderColor: gradient2,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: gradient2,
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [50, 40, 50, 40, 45, 40, 200,250,41,23,75,320,350],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Doughnut Chart
    // ------------------------------------------------------ //
    var DOUGHNUTCHARTEXMPLE  = $('#doughnutChartExample');
    var pieChartExample = new Chart(DOUGHNUTCHARTEXMPLE, {
        type: 'doughnut',
        options: {
            cutoutPercentage: 70,
        },
        data: {
            labels: [
                "A",
                "B",
                "C",
                "D"
            ],
            datasets: [
                {
                    data: [250, 50, 100, 40],
                    borderWidth: 0,
                    backgroundColor: [
                        '#3eb579',
                        '#49cd8b',
                        "#54e69d",
                        "#71e9ad"
                    ],
                    hoverBackgroundColor: [
                        '#3eb579',
                        '#49cd8b',
                        "#54e69d",
                        "#71e9ad"
                    ]
                }]
            }
    });

    var pieChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Line Chart 1
    // ------------------------------------------------------ //
    var LINECHART1 = $('#lineChartExample1');
    var myLineChart = new Chart(LINECHART1, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 200,
                        min: 0,
                        stepSize: 0.5
                    },
                    display: false,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            }
        },
        data: {
          //for 2nd chart
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Aug","Oct","Nov","Dec"],
            datasets: [
                {
                    label: "Total New Client Joine",
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#000',
                    pointBorderColor: '#3653ff',
                    pointHoverBackgroundColor: '#3653ff',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#3653ff",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [80,50, 30, 80, 120, 110, 130,144,170,122,98,165],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Line Chart 2
    // ------------------------------------------------------ //
    var LINECHART1 = $('#lineChartExample2');
    var myLineChart = new Chart(LINECHART1, {
        type: 'line',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                        stepSize: 0.5
                    },
                    display: false,
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            }
        },
        data: {
          //for 2nd chart
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Aug","Oct","Nov","Dec"],
            datasets: [
                {
                    label: "Orders per client",
                    fill: true,
                    lineTension: 0,
                    backgroundColor: "transparent",
                    borderColor: '#000',
                    pointBorderColor: '#8e09e0',
                    pointHoverBackgroundColor: '#8e09e0',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    borderWidth: 3,
                    pointBackgroundColor: "#8e09e0",
                    pointBorderWidth: 0,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 4,
                    pointHitRadius: 0,
                    data: [20, 8, 30, 22, 24, 17, 20,55,40,80,90,77],
                    spanGaps: false
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Pie Chart
    // ------------------------------------------------------ //
    var PIECHARTEXMPLE    = $('#pieChartExample');
    var pieChartExample = new Chart(PIECHARTEXMPLE, {
        type: 'pie',
        data: {
            labels: [
                "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"
            ],
            datasets: [
                {
                    data: [300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,300, 50, 100, 80,400,10,35],
                    borderWidth: 0,
                    backgroundColor: [
                        '#512E5Fad',
                        "#5B2C6Fad",
                        "#6C3483ad",
                        "#7D3C98ad",
                        '#8E44ADad',
                        "#A569BDad",
                        "#BB8FCEad",
                        "#1B4F72ad",
                        "#21618Cad",
                        "#2874A6ad",
                        "#2E86C1ad",
                        "#3498DBad",
                        "#5DADE2ad",
                        "#85C1E9ad",
                        "#7D6608ad",
                        "#9A7D0Aad",
                        "#B7950Bad",
                        "#B7950Bad",
                        "#D4AC0Dad",
                        "#F1C40Fad",
                        "#F7DC6Fad",
                        "#7E5109ad",
                        "#9C640Cad",
                        "#B9770Ead",
                        "#F39C12ad",
                        "#78281Fad",
                        "#943126ad",
                        "#B03A2Ead",
                        "#E74C3Cad",
                        "#EC7063ad",
                        "#F5B7B1ad",
                        "#04A425ad",
                        "#145A32ad",
                        "#239B56ad",
                        "#28B463ad",
                        "#7DCEA0ad"
                    ],
                    hoverBackgroundColor: [
                      '#512E5F',
                      "#5B2C6F",
                      "#6C3483",
                      "#7D3C98",
                      '#8E44AD',
                      "#A569BD",
                      "#BB8FCE",
                      "#1B4F72",
                      "#21618C",
                      "#2874A6",
                      "#2E86C1",
                      "#3498DB",
                      "#5DADE2",
                      "#85C1E9",
                      "#7D6608",
                      "#9A7D0A",
                      "#B7950B",
                      "#B7950B",
                      "#D4AC0D",
                      "#F1C40F",
                      "#F7DC6F",
                      "#7E5109",
                      "#9C640C",
                      "#B9770E",
                      "#F39C12",
                      "#78281F",
                      "#943126",
                      "#B03A2E",
                      "#E74C3C",
                      "#EC7063",
                      "#F5B7B1",
                      "#04A425",
                      "#186A3B",
                      "#239B56",
                      "#28B463",
                      "#7DCEA0"
                  ],

                }]
            }
    });

    var pieChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    var BARCHARTEXMPLE    = $('#barChartExample');
    var barChartExample = new Chart(BARCHARTEXMPLE, {
        type: 'bar',
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: '#eee'
                    }
                }]
            },
        },
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December "],
            datasets: [
                {
                    label: "Data Set 1",
                    backgroundColor: [
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad'
                    ],
                    hoverBackgroundColor: [
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9',
                      '#9d60f9'
                    ],
                    borderColor: [
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad',
                      '#9d60f9ad'
                    ],
                    borderWidth: 1,
                    data: [50, 40, 50, 40, 45, 40, 200,250,41,23,75,320],
                },
                {
                    label: "Data Set 2",
                    backgroundColor: [
                      '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad',
                        '#3653ffad'
                    ],
                    hoverBackgroundColor: [
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff',
                      '#3653ff'
                    ],
                    borderColor: [
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2,
                      gradient2
                    ],
                    borderWidth: 1,
                    data: [50, 40, 50, 220, 45, 40, 140,250,158,43,99,230],
                }
            ]
        }
    });



    // ------------------------------------------------------- //
    // Bar Chart 1
    // ------------------------------------------------------ //
    var BARCHART1 = $('#barChart1');
    var barChartHome = new Chart(BARCHART1, {
        type: 'bar',
        options:
        {
            scales:
            {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }],
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G", "H"],
            datasets: [
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7'
                    ],
                    borderColor: [
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7',
                        '#44b2d7'
                    ],
                    borderWidth: 0,
                    data: [35, 55, 65, 85, 30, 22, 18, 35]
                },
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6'
                    ],
                    borderColor: [
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6',
                        '#59c2e6'
                    ],
                    borderWidth: 0,
                    data: [49, 68, 85, 40, 27, 35, 20, 25]
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Bar Chart 2
    // ------------------------------------------------------ //
    var BARCHART2 = $('#barChart2');
    var barChartHome = new Chart(BARCHART2, {
        type: 'bar',
        options:
        {
            scales:
            {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }],
            },
            legend: {
                display: false
            }
        },
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
            datasets: [
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d'
                    ],
                    borderColor: [
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d',
                        '#54e69d'
                    ],
                    borderWidth: 1,
                    data: [40, 33, 22, 28, 40, 25, 30, 40, 28, 27, 22, 15, 20, 24, 30]
                }
            ]
        }
    });


    // ------------------------------------------------------- //
    // Polar Chart
    // ------------------------------------------------------ //
    var POLARCHARTEXMPLE  = $('#polarChartExample');
    var polarChartExample = new Chart(POLARCHARTEXMPLE, {
        type: 'polarArea',
        options: {
            elements: {
                arc: {
                    borderWidth: 0,
                    borderColor: '#aaa'
                }
            }
        },
        data: {
            datasets: [{
                data: [
                    11,
                    16,
                    12,
                    11,
                    7
                ],
                backgroundColor: [
                    "#e05f5f",
                    "#e96a6a",
                    "#ff7676",
                    "#ff8b8b",
                    "#fc9d9d"
                ],
                label: 'My dataset' // for legend
            }],
            labels: [
                "A",
                "B",
                "C",
                "D",
                "E"
            ]
        }
    });

    var polarChartExample = {
        responsive: true
    };


    // ------------------------------------------------------- //
    // Radar Chart
    // ------------------------------------------------------ //
    var RADARCHARTEXMPLE  = $('#radarChartExample');
    var radarChartExample = new Chart(RADARCHARTEXMPLE, {
        type: 'radar',
        data: {
            labels: ["A", "B", "C", "D", "E", "C"],
            datasets: [
                {
                    label: "First dataset",
                    backgroundColor: "rgba(84, 230, 157, 0.4)",
                    borderWidth: 2,
                    borderColor: "rgba(75, 204, 140, 1)",
                    pointBackgroundColor: "rgba(75, 204, 140, 1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(75, 204, 140, 1)",
                    data: [65, 59, 90, 81, 56, 55]
                },
                {
                    label: "Second dataset",
                    backgroundColor: "rgba(255, 119, 119, 0.4)",
                    borderWidth: 2,
                    borderColor: "rgba(255, 119, 119, 1)",
                    pointBackgroundColor: "rgba(255, 119, 119, 1)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(255, 119, 119, 1)",
                    data: [50, 60, 80, 45, 96, 70]
                }
            ]
        }
    });
    var radarChartExample = {
        responsive: true
    };



});
