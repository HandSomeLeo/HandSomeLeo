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
$('.team-r').find('p').hide();
$('.team-r').each(function(){
    $(this).find('p').eq(0).show();
});

if(wH>700){
    $('.news-frame,.news-list').css('height',wH-700+456+'px');
}

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


$(".news-ul li,.works-list li").click(function(){
    var url=$(this).attr("data-ul");
    $('.news-con').slideDown();

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


// window.onload = function(){
//     new Wheel('.service');
//     new Wheel('.about');
//
// };
//
// function Wheel(id){
//     var className = id+'-ul';
//     this.oWheel = document.querySelector(id);
//     this.oUl = document.querySelector(className);
//     this.aLi = this.oUl.children;
//     this.aLiIn = id+' li';
//     this.className = className;
//     this.listLi = id+'-list li';
//     this.id = id;
//     this.iNow = 0;
//     this.on();
//     this.click();
//
// }
// Wheel.prototype.click = function(){
//     var _this = this;
//     $(this.listLi).click(function(){
//         console.log(this);
//         var i = $(this).index();
//         if(i!=_this.iNow){
//             console.log(_this.iNow);
//             _this.iNow = i;
//             $(_this.listLi).eq(i).addClass('about-click').siblings().removeClass('about-click');
//             $(_this.className).animate({'top':-i*wH+'px'});
//         }
//     });
//
// };
//
// Wheel.prototype.on = function(){
//     var _this = this;
//     var i = 0;
//     Wheel.prototype.aboutWheel = function(e){
//         var delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
//             (e.detail && (e.detail > 0 ? -1 : 1));              // firefox
//         if (delta > 0) {
//             // 向上滚
//
//             _this.up();
//         } else if (delta < 0) {
//             console.log('bbbb'+i);
//             i++;
//             // 向下滚
//
//             _this.down();
//         }
//     };
//     this.oWheel.addEventListener('mousewheel',this.aboutWheel,false);
//     this.oWheel.addEventListener('DOMMouseScroll',this.aboutWheel,false);
// };
// Wheel.prototype.off = function(){
//     console.log('off');
//     this.oWheel.removeEventListener('mousewheel',this.aboutWheel,false);
//     this.oWheel.removeEventListener('DOMMouseScroll',this.aboutWheel,false);
// };
// Wheel.prototype.up = function(){
//     this.off();
//     if(this.iNow==0){
//         this.on();
//         return;
//     }else{
//         this.iNow--;
//         this.updown();
//     }
// };
// Wheel.prototype.down = function(){
//     this.off();
//     console.log(this.iNow,this.aLi.length);
//     if(this.iNow==this.aLi.length-1){
//         this.on();
//         return;
//     }else{
//         this.iNow++;
//         this.updown();
//     }
//
// };
// Wheel.prototype.updown = function(){
//     var _this = this;
//     $(this.aLiIn).eq(this.iNow).addClass('about-click').siblings().removeClass('about-click');
//     $(this.className).animate({'top':-this.iNow*wH+'px'},500,function(){
//         setTimeout(function(){
//             _this.on();
//         },500);
//     });
// };

aboutOn();
serOn();

window.on
function aboutWheel(e){
    var eT = e.target;
    if($(eT).is($(".moreC[morec='true']"))){

    }else{
        aboutOn();
    }

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































