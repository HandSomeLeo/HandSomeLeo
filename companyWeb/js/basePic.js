var skinX = 0;
var skinWidth = 0;
var gender = 'dog';//dog为单身，lover为情侣
var dogIndex = 0;
var loverIndex = 0;
var lookPicStatus = 'dog';//dog为查看单身照,lover为查看情侣照;
var dL = 0;
var lL = 0;
var curH = 0;
var dog_plus = false;
var lover_plus = false;


//单纯计数，页面loading
// var countStar = 0;
// var arrStar = [
//     ctx +'/resource/qrj/images/oppologo.png',
//     ctx +'/resource/qrj/images/ico_21.png',
//     ctx +'/resource/qrj/images/lover_coverO.png'
// ];
// loadStar();
// function loadStar() {
//     var oImg = new Image();
//     oImg.src = arrStar[countStar];
//     oImg.onload = function () {
//         countStar++;
//         $('.load_bar').css('width',(445/arrStar.length)*countStar+'px');
//         if (countStar < arrStar.length) {
//             loadStar();
//         }else{
//             $('.load_home').hide();
//             $('.y_home').show();
//             $('.loading_in p').show();
//             $('.loading').addClass('loading_end');
//         }
//     };
// }

//当页面高度大于960时候，调整页面的高度
if ($(window).height() > 960) {
    $('.y_png,.y_show,.y_home,.loading,.load_home').height($(window).height());
    $('.show_cIn').height($(window).height() - 79 - 104);
    $('.show_c').height($(window).height() - 79 - 104 + 10);
}


var hit = document.querySelector('#hit');
var str = '';
var tu = "",//上传的图片后第一次处理好的src
    intW = 600,//图片的最大宽度
    intH = 770,//图片的最大高度度
    start_X = 0,//初始X位置
    start_Y = 0,//初始Y位置
    imgW = 0,//处理好的图片的宽
    imgH = 0,//处理好的图片的高
    x = 0,//图片X方向位移
    y = 0,//图片Y方向位移
    s = 1,//图片缩放比例
    cutImgW = 600,//裁切区域的宽
    cutImgH = 777;//裁切区域的高
var startX, startY,
    moveX, moveY,
    disX, disY;
var endX = 0;
var endY = 0;
var edsX = 0;//手指松开后存X位置
var edsY = 0;//手指松开后存Y位置
var c = {
    x: 0,
    y: 0
};//存储图片中心点位置
var newP = {
    x: 0,
    y: 0
};//通过c计算出最新img的位置
var minX = 0;//最小X
var minY = 0;//最小Y
var maxX = 0;//最大X
var maxY = 0;//最大Y
var oriW, oriH;//存储原始W,H
var okUrl;//存储上传的图片
var yMove = 0;//下移高度


function cutShow(tu) {
    var oImg = new Image();
    oImg.src = tu;
    oImg.onload = function () {
        oriW = imgW = this.naturalWidth;
        oriH = imgH = this.naturalHeight;
        $('#hit').attr('src', oImg.src);
        $('.cut').show();
        start_X = Math.round((cutImgW - hit.offsetWidth) / 2);
        start_Y = Math.round((cutImgH - hit.offsetHeight) / 2);
        resetElement();
        fnAct();
    };
}

function cutcut() {
    $('.loading_in p').html('正在生成');
    $('.loading').show();
    $('.cut').hide();
    var oC = document.createElement('canvas');
    var gd = oC.getContext('2d');
    var oImg = new Image();
    var top = 0;
    var left = 0;
    oC.width = cutImgW;
    oC.height = cutImgH;
    gd.fillStyle = '#fff';
    gd.fillRect(0, 0, oC.width, oC.height);
    oImg.src = tu;
    oImg.onload = function () {
        gd.drawImage(
            oImg,
            x + (imgW - imgW * s) / 2 - left, y + (imgH - imgH * s) / 2 - top, imgW * s, imgH * s
        );
        //上传的原始照片,压缩
        okURL = oC.toDataURL("image/jpeg", 0.6);
        savePng();
    }
}

function savePng() {
    var oC = document.createElement('canvas');
    var oC2 = document.createElement('canvas');
    var gd = oC.getContext('2d');
    var gd2 = oC2.getContext('2d');
    oC.width = 640;
    oC.height = 960;
    oC2.width = 480;
    oC2.height = 663;
    var iNow = 0;
    var combineG = gender + skinX;
    var arr = [
        ctx + '/resource/qrj/images/' + combineG + '.png',
        ctx + '/resource/qrj/images/fingerd.png',
        ctx + '/resource/qrj/images/QR.png',
        ctx + '/resource/qrj/images/png_back.jpg',
        okURL,
        ctx + '/resource/qrj/images/fingerl.png'
    ];
    loadPng();
    function loadPng() {
        var oImg = new Image();
        oImg.src = arr[iNow];
        oImg.onload = function () {
            if (iNow < arr.length - 1) {
                iNow++;
                loadPng();
            } else {
                fnDraw();
            }
        };
    }

    //绘制背景
    var oBack = new Image();
    oBack.src = ctx + '/resource/qrj/images/png_back.jpg';
    oBack.onload = function () {
        var pattern = gd.createPattern(oBack, 'repeat');
        gd.fillStyle = pattern;
        gd.fillRect(0, 0, 640, 960);
    };
    //绘制背景2
    gd2.fillStyle = '#fff';
    gd2.fillRect(0, 0, 480, 683);

    function fnDraw() {
        //绘制头像
        var oMan = new Image();
        oMan.src = arr[4];
        gd.drawImage(
            oMan, 20, 20
        );
        //绘制头像2
        var oMan2 = new Image();
        oMan2.src = arr[4];
        gd2.drawImage(
            oMan2, 18, 25, 444, 576
        );
        //绘制皮肤
        var oSkin = new Image();
        oSkin.src = arr[0];
        gd.drawImage(
            oSkin, 0, 0
        );
        //绘制皮肤2
        var oSkin2 = new Image();
        oSkin2.src = arr[0];
        gd2.drawImage(
            oSkin2, 0, 0, 480, 581
        );
        //绘制下部提示手
        var oFinger = new Image();
        if (gender == 'dog') {
            oFinger.src = arr[1];
            gd.drawImage(
                oFinger, 20, 804
            );
        } else {
            oFinger.src = arr[5];
            gd.drawImage(
                oFinger, 20, 804
            );
        }

        //绘制QR
        var oQR = new Image();
        oQR.src = arr[2];
        gd.drawImage(
            oQR, 484, 816
        );
        //获取data跳转页面
        //合成的图片,经过压缩
        var oUrl = oC.toDataURL("image/jpeg", 0.5);
        var oUrl2 = oC2.toDataURL("image/jpeg", 0.5);
        //把拿到的合成后的图片直接上传到OSS上
        uploadImage(oUrl);
        $('.opaImg').attr('src', oUrl);
        $('.oppo_save img').attr('src', oUrl);
        $('.dl_spng img').attr('src', oUrl2);
        $('.loading').hide();
        $('.y_png').hide();
        $('.y_spng').show();
        if (gender == 'dog') {
            $('.dog_cover').show();
        } else {
            $('.lover_cover').show();
        }
        $(window).scrollTop(0);
//		$('.tip').show();
//		$('.tip').addClass('tip_in');
//		setTimeout(function(){
//			$('.tip').hide();
//		},2999);
    }
}

hit.addEventListener('touchstart', fnDown, false);
function fnDown(ev) {
    var oldS = s;
    if (ev.targetTouches.length == 2) {
        var downS = getS(ev);
    }
    startX = ev.targetTouches[0].pageX;
    startY = ev.targetTouches[0].pageY;

    function fnMove(ev) {
        moveX = ev.targetTouches[0].pageX;
        moveY = ev.targetTouches[0].pageY;
        disX = moveX - startX;
        disY = moveY - startY;
        x = disX + edsX + start_X;
        y = disY + edsY + start_Y;
        c = {
            x: x + imgW / 2,
            y: y + imgH / 2
        };
        if (ev.targetTouches.length == 2) {
            s = oldS * (getS(ev) / downS);
        }
        fnLimit();

        getC();
        ev.preventDefault();
    }

    function fnEnd(ev) {
        hit.removeEventListener('touchmove', fnMove, false);
        hit.removeEventListener('touchend', fnEnd, false);
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        edsX = x - start_X;
        edsY = y - start_Y;
        c = {
            x: edsX + imgW / 2,
            y: edsY + imgH / 2
        }
        getC();
    }

    hit.addEventListener('touchmove', fnMove, false);
    hit.addEventListener('touchend', fnEnd, false);
    ev.preventDefault();
}


//获取上传图片的exif信息，并进行处理
function selectFileImage(fileObj) {
    var file = fileObj.files['0'];
    var Orientation = null;

    if (file) {
        console.log("正在上传,请稍后...");
        fnLoading();
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function () {
            EXIF.getAllTags(this);
            Orientation = EXIF.getTag(this, 'Orientation');
        });
        var oReader = new FileReader();
        oReader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var w = this.naturalWidth;  //获取图片原始大小
                var h = this.naturalHeight;
                var expectWidth, expectHeight;
                if (h > intH) {
                    expectHeight = intH;
                    expectWidth = expectHeight * w / h;
                } else {
                    expectWidth = w;
                    expectHeight = h;
                }
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                var base64 = null;
                var xpos = canvas.width / 2;
                var ypos = canvas.height / 2;
                //如果方向角不为1，都需要进行旋转
                if (Orientation && Orientation != "" && Orientation != 1) {
                    var degree = 0;
                    switch (Orientation) {
                        case 6://需要顺时针（向左）90度旋转
                            degree = 90;
                            canvas.width = expectHeight;
                            canvas.height = expectWidth;
                            ctx.rotate(degree * Math.PI / 180);
                            ctx.drawImage(image, 0, -expectHeight, expectWidth, expectHeight);
                            break;
                        case 8://需要逆时针（向右）90度旋转  ;
                            degree = -90;
                            canvas.width = expectHeight;
                            canvas.height = expectWidth;
                            ctx.rotate(degree * Math.PI / 180);
                            ctx.drawImage(image, -expectWidth, 0, expectWidth, expectHeight);
                            break;
                        case 3://需要180度旋转
                            degree = -180;
                            ctx.rotate(degree * Math.PI / 180);
                            ctx.drawImage(image, -expectWidth, -expectHeight, expectWidth, expectHeight);
                            break;
                    }
                } else {
                    ctx.drawImage(image, 0, 0, expectWidth, expectHeight);
                }
                //上传的原图,经过压缩
                tu = canvas.toDataURL("image/jpeg", 0.6);
                setTimeout(function () {
                    $('.submit').removeClass('noSubmit');
                    $('.reload').removeClass('noReload');
                    $('.png_btn').hide();
                    $('.loading').hide();
                    //重新选择照片
                    $('.reload').off('click');
                    $('.submit').off('click');
                    $('.submit').on('click', function () {
                        cutcut();
                    });
                    cutShow(tu);
                }, 100);
            };
        };
        oReader.readAsDataURL(file);
    }
}

//获取两根手指之间的距离
function getS(ev) {
    var x1 = ev.targetTouches[0].pageX;
    var x2 = ev.targetTouches[1].pageX;
    var y1 = ev.targetTouches[0].pageY;
    var y2 = ev.targetTouches[1].pageY;
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt(a * a + b * b);
    return c;
}
//重置参数
function resetElement() {
    x = start_X;
    y = start_Y;
    edsX = 0;
    edsY = 0;
    s = 1;
    c = {
        x: start_X + imgW / 2,
        y: start_Y + imgH / 2
    }
    getC();
}

//图片上下左右范围限制
function fnLimit() {
    var disW = (imgW * s - imgW) / 2;
    var disH = (imgH * s - imgH) / 2;
    var beyondW = Math.abs(imgW * s - cutImgW);
    var beyongH = Math.abs(imgH * s - cutImgH);

    if (imgW * s <= cutImgW && imgH * s <= cutImgH) {
        minX = 0 + disW;
        minY = 0 + disH;
        maxX = cutImgW - imgW * s + disW;
        maxY = cutImgH - imgH * s + disH;
        changeXY();
    } else if (imgW * s <= cutImgW && imgH * s > cutImgH) {
        minX = 0 + disW;
        minY = 0 + disH - beyongH;
        maxX = cutImgW - imgW * s + disW;
        maxY = cutImgH - imgH * s + disH + beyongH;
        changeXY();
    } else if (imgW * s > cutImgW && imgH * s <= cutImgH) {
        minX = 0 + disW - beyondW;
        minY = 0 + disH;
        maxX = cutImgW - imgW * s + disW + beyondW;
        maxY = cutImgH - imgH * s + disH;
        changeXY();
    } else if (imgW * s > cutImgW && imgH * s > cutImgH) {
        minX = 0 + disW - beyondW;
        minY = 0 + disH - beyongH;
        maxX = cutImgW - imgW * s + disW + beyondW;
        maxY = cutImgH - imgH * s + disH + beyongH;
        changeXY();
    }
    function changeXY() {
        if (x < minX) {
            x = minX;
        }
        if (x > maxX) {
            x = maxX;
        }
        if (y < minY) {
            y = minY;
        }
        if (y > maxY) {
            y = maxY;
        }

    }

    fnAct();
}

//单点触控，只改变box的位置
function fnAct() {
    hit.style.WebkitTransform = 'translate3d(' + x + 'px,' + y + 'px,0px) scale(' + s + ',' + s + ')';
    hit.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0px) scale(' + s + ',' + s + ')';
    console.log(x, y);
}
//多点触控，只改变box的缩放比例
function fnBct() {
    hit.style.WebkitTransform = 'scale(' + s + ',' + s + ')';
    hit.style.transform = 'scale(' + s + ',' + s + ')';
}
//获取缩放比例
function getC() {
    if (s > 0) {
        newP = {
            x: c.x - imgW * s / 2,
            y: c.y - imgH * s / 2
        }
    } else {
        newP = {
            x: c.x + imgW * s / 2,
            y: c.y + imgH * s / 2
        }
    }
}

function fnLoading() {
    $('.loading').show();
    $('#uploadfile').remove();
    setTimeout(function () {
        $('.uploadfile').html('<input value="传图" class="position" style="opacity:0;display: block;width: 100%;height: 100%;" type="file" name="pic" id="uploadfile" accept="image/*" capture="camera" onchange="selectFileImage(this)"/>');
    }, 1);
}


//检测浏览器
var info = window.navigator.userAgent;
console.log(info);

if (info.indexOf('MicroMessenger') < 0){

}








