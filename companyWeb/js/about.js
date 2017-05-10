var wH,wW;
var pngX = 0;
var pngWidth = 798;
var teamWidth = 848;
var aboutY = 0;
var serY = 0;
var aboutTop = 0;
var teamC = 0;
var listX = 0;

function wh(){
    wH = document.documentElement.clientHeight;
    wW = document.documentElement.clientWidth;
    wH = wH<700?700:wH;
    wW = wW<1000?1000:wW;
    $('.box').css('width',wW+'px');
    $('.box').css('height',wH+'px');
    $('.news-con,.works-con').css('height',wH-79+'px');
    $('.about-ul').css('top',-aboutY*wH+'px');
    $('.service-ul').css('top',-serY*wH+'px');
    if(wH>700){
        console.log(wH);
        $('.news-frame,.news-list').css('height',wH-700+456+'px');
    }
}
wh();
window.onresize = function(){
    wh();
};


$('.works-list ul').each(function(){
    $(this).css('width',$(this).children().length*pngWidth+'px');
    $(this).attr('list-li',$(this).children().length);
});



$('.team-top ul').css('width',$('.team-top ul').children().length*teamWidth+'px');
$('.slide-list').css('margin-top',-13*$('.slide-list ul').children().length-40+'px');
$('.team-r').find('p').css('font-size','0px');
$('.team-r').each(function(){
    $(this).find('p').eq(0).css('font-size','14px');
});

if(wH>700){
    $('.news-frame,.news-list').css('height',wH-700+456+'px');
}

$('.team-r i').click(function(){
    if($(this).attr('more')==null||$(this).attr('more')=='true'){
        $(this).parent().find('p').css('font-size','14px');
        $(this).html('More -');
        $(this).attr('more','false');
    }else{
        $(this).parent().find('p').css('font-size','0px');
        $(this).parent().find('p').eq(0).css('font-size','14px');
        $(this).html('More +');
        $(this).attr('more','true');
    }
});

$('.team-r .more-click').click();
$('.more-click').hide();


// $('.team-rIn').scroll(function(e){
//     if($(this).is($(e.target))){
//         aboutOff();
//         console.log('000998');
//     }else{
//         console.log('111211');
//     }
// });


$('.list-con span').click(function(){
    var i = $(this).index();
    listX = i;
    pngX = 0;
    $('.png-left').hide();
    $('.png-right').show();
    $('.works-list ul').css('left',0);
    $(this).addClass('list-click').siblings().removeClass('list-click');
    $('.list-ul-in').children().eq(i).show().siblings().hide();
});

$('.team-toR').click(function(){
    aboutOff();
    aboutOn();
    teamC++;
    $('.team-top ul').animate({'left':-teamC*teamWidth+'px'});
    $('.team-toL').show();
    if(teamC==$('.team-top ul').children().length-1){
        $('.team-toR').hide();
    }
});

$('.team-toL').click(function(){
    aboutOff();
    aboutOn();
    teamC--;
    $('.team-toR').show();
    $('.team-top ul').animate({'left':-teamC*teamWidth+'px'});
    if(teamC==0){
        $('.team-toL').hide();
    }
});




$('.news-con .close').click(function(){
    $('.news-con').slideUp();
});
$('.works-con .close').click(function(){
    $('.works-con').slideUp();
});






$('.png-right').click(function () {
    $(this).parent().find('p').show();
    $(this).parent().find('p').eq(pngX).hide();
    pngX++;
    console.log(pngX);
    $('.png-left').show();
    var i = $(this).parent().find('ul').attr('list-li');
    $(this).parent().find('ul').animate({'left':  -pngWidth * pngX+'px'});
    if (pngX == i - 1) {
        $('.png-right').hide();
    }
});

$('.png-left').click(function () {
    pngX--;
    $('.png-right').show();
    $(this).parent().find('ul').animate({'left':  -pngWidth * pngX+'px'},function(){
        $(this).parent().find('p').hide();
        $(this).parent().find('p').eq(pngX).show();
    });
    if (pngX == 0) {
        $('.png-left').hide();
    }
});



aboutOn();
serOn();

function aboutWheel(e){
    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
    console.log(delta);
    if (delta > 0) {
        // 向上滚
        aboutOff();
        aboutUp();
    } else if (delta < 0) {
        // 向下滚
        aboutOff();
        aboutDown();
    }
}

function serWheel(e){
    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
    console.log(delta);
    if (delta > 0) {
        // 向上滚
        serOff();
        serUp();
    } else if (delta < 0) {
        // 向下滚
        serOff();
        serDown();
    }
}


function aboutOn(){
    $('.about').on("mousewheel DOMMouseScroll", aboutWheel);
}
function serOn(){
    $('.service').on("mousewheel DOMMouseScroll", serWheel);
}
function aboutOff(){
    $('.about').off("mousewheel DOMMouseScroll", aboutWheel);
}
function serOff(){
    $('.service').off("mousewheel DOMMouseScroll", serWheel);
}

function aboutUp(){
    if(aboutY==0){
        aboutOn();
        return;
    }else{
        aboutY--;
        moveUpDown(aboutY);
    }
}
function serUp(){
    if(serY==0){
        serOn();
        return;
    }else{
        serY--;
        serUpDown(serY);
    }
}

function aboutDown(){
    if(aboutY==$('.about-ul').children().length-1){
        aboutOn();
        return;
    }else{
        aboutY++;
        moveUpDown(aboutY);
    }
}
function serDown(){
    if(serY==$('.service-ul').children().length-1){
        serOn();
        return;
    }else{
        serY++;
        serUpDown(serY);
    }
}

function moveUpDown(iNow){
    $('.about-list li').eq(iNow).addClass('about-click').siblings().removeClass('about-click');
    $('.about-ul').animate({'top':-iNow*wH+'px'},500,function(){
        setTimeout(function(){
            aboutOn();
        },500);
    });

}

function serUpDown(iNow){
    $('.service-list li').eq(iNow).addClass('about-click').siblings().removeClass('about-click');
    $('.service-ul').animate({'top':-iNow*wH+'px'},500,function(){
        setTimeout(function(){
            serOn();
        },500);
    });

}

$('.about-list li').click(function(){
    aboutOff();
    aboutOn();
    var i = $(this).index();
    if(i!=aboutY){
        aboutY = i;
        $('.about-list li').eq(i).addClass('about-click').siblings().removeClass('about-click');
        $('.about-ul').animate({'top':-i*wH+'px'});
    }
});

$('.service-list li').click(function(){
    var i = $(this).index();
    console.log(i);
    if(i!=serY){
        serY = i;
        $('.service-list li').eq(i).addClass('about-click').siblings().removeClass('about-click');
        $('.service-ul').animate({'top':-i*wH+'px'});
    }
});































