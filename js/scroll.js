$(document).ready(function() {
    setLegame();
    selectAnni();
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    $("#toTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });
});

function setLegame() {
    $("nav a").click(function(e) {
        var idSez = e.currentTarget.id + "Sez";
        $("html body").animate({
            scrollTop: $("#" + idSez).offset().top
        }, 1000)
    })
}

function selectAnni() {
    $(window).scroll(function() {

        if (($(this).scrollTop() > 2200) && ($(this).scrollTop() < 7000)) {
            $("#scegli").css('visibility', 'visible');
        } else {
            $("#scegli").css('visibility', 'hidden');
        }
    })
}

$(document).ready(function() {
    $('#nav li').hover(
        function() {
            //mostra sottomenu
            $('ul', this).stop(true, true).delay(50).slideDown(100);

        },
        function() {
            //nascondi sottomenu
            $('ul', this).stop(true, true).slideUp(200);
        }
    );
});