var map;

var tipo = {};

var indiceRegione = {
    "gii": 0,
    "ffl": 1
}

$(document).ready(function() {

    map = new jvm.Map({
        map: 'world_mill',
        backgroundColor: 'white',
        container: $('#world-map'),
        regionStyle: {
            initial: {
                fill: '#edfff0',
                "fill-opacity": 1,
                stroke: 'black',
                "stroke-width": 1,
                "stroke-opacity": 1
            },
            hover: {
                "fill-opacity": 0.8,
                cursor: 'pointer'
            },
            selected: {
                fill: 'yellow'
            },
            selectedHover: {}
        },
        series: {
            regions: [{
                values: tipo,
                scale: ['#f2fbff', '#000a68'],
                normalizeFunction: 'polynomial',
                min: '1',
                max: '83',
                legend: {
                    vertical: true,
                    cssClass: 'legenda'
                }
            }, {
                values: tipo,
                scale: ['#fffddd', '#8c0000'],
                normalizeFunction: 'polynomial',
                min: '10',
                max: '89',
                legend: {
                    vertical: true,
                    cssClass: 'legendaD'
                }
            }]
        },
        onRegionTipShow: function(e, el, code) {
            el.html(el.html() + ' (Indice - ' + tipo[code] + '%)');
        }
    });

    $("#scelte").click(function(e) {

        var indice = $("#scelte input:checked").val();
        var url = "./api/mappa.php";
        var color = indiceRegione[indice];

        if (indice == "gii") {
            $(".legenda").css('visibility', 'visible');
            $("#tips").css('visibility', 'visible');
            $(".legendaD").css('visibility', 'hidden');
            $("#tipsD").css('visibility', 'hidden');
        } else if (indice == "ffl") {
            $(".legendaD").css('visibility', 'visible');
            $(".legendaD").css('margin-top', '-132px');
            $(".legenda").css('visibility', 'hidden');
            $("#tips").css('visibility', 'hidden');
            $("#tipsD").css('visibility', 'visible');

        }

        if (indice != "ffl" || "gii") {
            getJSONstatus(url, { "status": indice }, map, color);
        } else {
            getJSONstatus(url, { "status": "ffl" }, map, color);
            getJSONstatus(url, { "status": "gii" }, map, color);
        }

    });

    function getJSONstatus(url, data, map, color) {

        $.getJSON(url, data, function(result) {
            // chiamata Ajax
            // ogni elemento viene marcato e vengono assegnati i dati
            $.each(result, function(index, item) {

                //formattazione dati
                tipo[item["iso2"]] = parseFloat(item["valore"]);

            });

            map.reset();
            map.series.regions[color].setValues(tipo);
        });
    }
});