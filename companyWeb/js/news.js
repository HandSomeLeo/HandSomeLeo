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
    $('.news-con').css('height',wH-79+'px');
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
$('.team-r').find('p').hide();
$('.team-r').each(function(){
    $(this).find('p').eq(0).show();
});


$('.news-frame,.news-list').css('height',wH-700+456+'px');


$('.team-r i').click(function(){
    $('.team-rIn').css('overflow-y','auto');
    $(this).hide();
    $(this).parent().find('p').show();
});

$('.team-r .more-click').click();


$('.team-rIn').scroll(function(e){
    if($(this).is($(e.target))){
        aboutOff();
        console.log('000998');
    }else{
        console.log('111211');
    }
});


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



$('.about-title a').click(function(){
    $('.navBar').children().eq(1).click();
});

$('.news-con .close').click(function(){
    $('.news-con').slideUp();
});
$('.works-con .close').click(function(){
    $('.works-con').slideUp();
});

if(GetQueryString()){
    $('.news-con').slideDown();
    var iframe = document.getElementById("frame");
    iframe.src = 'htmls/'+GetQueryString()+'.html';
    if (iframe.attachEvent){
        iframe.attachEvent("onload", function(){
            $(".loading").fadeOut();
        });
    } else {
        iframe.onload = function(){
            $(".loading").fadeOut();
        };
    }
}


$(".news-ul li,.works-list li").click(function(){
    var url=$(this).attr("data-ul");
    $('.news-con').slideDown();
    window.location.hash = '?url='+url;

    var iframe = document.getElementById("frame");
    iframe.src = 'htmls/'+url+'.html';
    if (iframe.attachEvent){
        iframe.attachEvent("onload", function(){
            $(".loading").fadeOut();
        });
    } else {
        iframe.onload = function(){
            $(".loading").fadeOut();
        };
    }
});


function GetQueryString() {
    var loc = window.location.href;
    var bbb = (loc+'').lastIndexOf('url=');
    if(bbb==-1){
        return null;
    }else{
        var add = bbb+4;
        var ccc = loc.substring(add);
        return ccc
    }
}






























