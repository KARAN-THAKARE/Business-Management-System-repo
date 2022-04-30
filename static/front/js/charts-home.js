/*global $, document, Chart, LINECHART, data, options, window*/
$(document).ready(function () {

    'use strict';

    // ------------------------------------------------------- //
    // Line Chart
    // ------------------------------------------------------ //
    var legendState = true;
    if ($(window).outerWidth() < 576) {
        legendState = false;
    }



    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    var BARCHARTHOME = $('#AvgTotalSalePerMonth');
    var barChartHome = new Chart(BARCHARTHOME, {
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
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"],
            datasets: [
                {
                    label: "₹ ",
                    backgroundColor: [
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)'
                    ],
                    borderColor: [
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)',
                        'rgb(121, 106, 238)'
                    ],
                    borderWidth: 1,
                    data: $('#my-data').data().data2,
                }
            ]
        }
    });

    var BARCHARTHOME = $('#barChartHome');
    var barChartHome = new Chart(BARCHARTHOME, {
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
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"],
            datasets: [
                {
                    label: "Total order",
                    backgroundColor: [
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e',
                        '#2f333e'
                    ],
                    borderColor: [
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000',
                        '#000'
                    ],
                    borderWidth: 1,
                    data: $('#my-data').data().data1,
                }
            ]
        }
    });

});
