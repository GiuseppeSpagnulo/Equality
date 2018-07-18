function Grafico(node, titolo, sottotitolo, url) {
    $.getJSON(url, function(data) {
        creaGrafico(data, node, titolo, sottotitolo);
    });
}

function GraficoSeg(node, titolo, sottotitolo, url) {
    $.getJSON(url, function(data) {
        creaGraficoSeg(data, node, titolo, sottotitolo);
    });
}

function GraficoRuw(node, titolo, sottotitolo, url) {
    $.getJSON(url, function(data) {
        creaGraficoRuw(data, node, titolo, sottotitolo);
    });
}

function modificaGraficoRuw() {
    GraficoRuw("container5", "Percentuale di disuguaglianza comparata alla percentuale di donne al parlamento ", "Rwanda - dal 1995 al 2015 ", "./api/rwanda.php?tab=indicedisug");
}

function modificaGrafico(anno) {
    Grafico("container1", "Percentuale di donne impiegate in Agricoltura nell'anno " + anno, "Nazioni ordinate per GII crescente ", "./api/grafici.php?tab=agricoltura&anno=" + anno);
    Grafico("container2", "Percentuale di donne impiegate in Industria nell'anno " + anno, "Nazioni ordinate per GII crescente ", "./api/grafici.php?tab=industria&anno=" + anno);
    Grafico("container3", "Percentuale di donne impiegate nei Servizi nell'anno " + anno, "Nazioni ordinate per GII crescente ", "./api/grafici.php?tab=servizi&anno=" + anno);
    GraficoSeg("container4", "Percentuale di seggi parlamentari presieduti da donne nell'anno " + anno, "Nazioni ordinate per GII crescente in senso orario  ", "./api/grafici.php?tab=numseggi&anno=" + anno);
}

function cambiaAnno() {
    var anno = document.getElementById("anni");
    modificaGrafico(anno.value);
}

function caricaGrafico() {
    modificaGrafico(1995);
    var anno = document.getElementById("anni");
    anno.onchange = cambiaAnno;
}

function creaGrafico(series, node, title, subtitle) {
    var country = [];
    var perc = [];
    var gii = [];

    function percentuale(n) {
        return parseFloat(n);
    }
    for (var i in series) {
        country[i] = series[i]['naz'];
        perc[i] = percentuale(series[i]['PR']);
        gii[i] = percentuale(series[i]['gii']);
    }
    var json = {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            type: 'category',
            categories: country,
            crosshair: true
        },
        yAxis: [{
                labels: {
                    format: '{value}%'
                },
                min: 0.01,


            },
            {
                labels: {
                    format: '{value}%'
                },
                min: 0.01,

                opposite: true
            }
        ],
        tooltip: {
            shared: true
        },
        legend: {
            enabled: true,
            borderWidth: 1,
            shadow: true,
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            width: 200
        },
        series: [{
            data: perc,
            type: 'column',
            name: 'Percentuale donne impiegate'
        }, {
            data: gii,
            lineWidth: 0,
            marker: {
                enabled: true,
                radius: 3
            },
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            },
            name: 'Indice Disuguaglianza'

        }],

    }
    $('#' + node).highcharts(json);
}

function creaGraficoSeg(series, node, title, subtitle) {
    var country = [];
    var perc = [];
    var gii = [];

    function percentuale(n) {
        return parseFloat(n);
    }
    for (var i in series) {
        country[i] = series[i]['naz'];
        perc[i] = percentuale(series[i]['PR']);
        gii[i] = percentuale(series[i]['gii']);
    }
    var json = {
        chart: {
            type: 'pie',
        },
        tooltip: {
            formatter: function() {
                var sliceIndex = this.point.index;

                return '<b> Percentuale seggi femminili: <b>' + this.y + '%</b>';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        var dataIndex = this.point.index;
                        var dataName = this.series.chart.axes[0].categories[dataIndex];

                        return dataName;
                    },

                }
            }
        },

        legend: {
            enabled: true,
            labelFormatter: function() {
                var legendIndex = this.index;
                var legendName = this.series.chart.axes[0].categories[legendIndex];

                return legendName;
            }
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            categories: country
        },
        series: [{
            data: perc
        }]
    };
    $('#' + node).highcharts(json);
}

function creaGraficoRuw(series, node, title, subtitle) {
    var periodo = [];
    var perc = [];
    var gii = [];

    function percentuale(n) {
        return parseFloat(n);
    }
    for (var i in series) {
        periodo[i] = series[i]['periodo'];
        perc[i] = percentuale(series[i]['PR']);
        gii[i] = percentuale(series[i]['gii']);
    }
    var json = {
        chart: {
            zoomType: 'spline'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: {
            type: 'category',
            categories: periodo,
            crosshair: true,

        },
        yAxis: [{
                labels: {
                    format: '{value}%'
                },
                min: 0.01,

            },
            {
                labels: {
                    format: '{value}%'
                },
                min: 0.01,

                opposite: true
            }
        ],
        tooltip: {
            shared: true
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },

        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            data: perc,
            type: 'spline',
            name: 'Numero seggi Donne'
        }, {
            data: gii,
            type: 'spline',
            name: 'Indice Disuguaglianza'
        }],

    }
    $('#' + node).highcharts(json);
}

function gestoreLoad() {
    try {
        caricaGrafico()
        modificaGraficoRuw()
    } catch (e) {
        alert("gestoreLoad" + e);

    }
}

window.onload = gestoreLoad;