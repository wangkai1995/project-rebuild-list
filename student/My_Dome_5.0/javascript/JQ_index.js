
//这段代码用来出来display_none在IE浏览器不兼容的问题
$(function(){
    $case_display_div = $('#case_display');
    $_product_presentation_div = $('#product_presentation');
    
    $case_display_div.hide();
    $_product_presentation_div.find('p').hide();
});








//启动
$(function(){

    $_img_display = $('#advertisement');
    $_span = $('#advertisement span');
    
    //产品展示的image
    $_case_display = $('#image_display');
    //用来隐藏的image
    $_none_display = $('#image_none');
    
    var img_index = 0;
    var img_length = $('#advertisement img').length;
    var adtime = null; //这个用来设置是否取消定时轮播
    var button_flag = null;//曾经通过按钮点击过轮播的flag
    //按钮
    $_span.hover(function(){
        $(this).css({
            "opacity": "1"
        });
    }, function(){
        $(this).css({
            "opacity": "0.5"
        });
    });
    
    //点击事件
    $_span.eq(0).click(function(){
        img_index--;
        if (img_index < 0) {
            img_index = 3;
        }
        showText(img_index);
        showImg(img_index);
        button_flag = true;
    })
    
    //点击事件
    $_span.eq(1).click(function(){
        img_index++;
        if (img_index == img_length) {
            img_index = 0;
        }
        showText(img_index);
        showImg(img_index);
        button_flag = true;
    })
    
    
    //图片播放部分
    $_img_display.hover(function(){
        //定时暂停
        if (adtime) {
            clearInterval(adtime);
        }
    }, function(){
        adtime = setInterval(function(){
			  //判断是否按钮点击过
        if (button_flag) {
            button_flag = false;
            img_index++;
            if (img_index == img_length) {img_index = 0;}
            }
			
            showImg(img_index);
            showText(img_index);
            img_index++;
            if (img_index == img_length) {
                img_index = 0;
            }
        }, 5000)
    }).trigger("mouseleave");
    
    
});






//第二次加载
$(function(){

    //设置产品介绍部分的高亮代码
    product_presentation();
    //产品案例部分的高亮代码
    //product_successful_case();
});




//产品展示部分的高亮代码 和图片切换
function product_presentation(){
    //获得整体的div
    $_product_div = $("#product_presentation");
    
    //获得交通部分的div
    $_traffic_div = $_product_div.find('#traffic');
    //获得停车场的div
    $_parking_div = $_product_div.find('#parking')
    
    
    
    
    //子div设置事件
    $_product_div.find("div").hover(function(){
        $(this).find('p').show() //这段代码是为了处理IE的一些不兼容问题
.addClass("select_p");
    }, function(){
        $(this).find('p').hide() //这段代码是为了处理IE的一些不兼容问题
.removeClass("select_p");
    });
    
    //右边的图片事件
    $_traffic_div.hover(function(){
        $(this).find('.product_display').hide();
    }, function(){
        $(this).find('.product_display').show();
    });
    
    //左边的图片事件
    $_parking_div.hover(function(){
        $(this).find('.product_display').hide();
    }, function(){
        $(this).find('.product_display').show();
    });
    
}




//图片轮播
function showImg(index){
    $_a = $('#advertisement a');
    
    $_a.find('img').eq(index).stop(true, true).fadeIn().siblings().fadeOut();
    
}

//文本轮播
function showText(index){

    $_div = $('#div_textdisplay');
    
    $_div.children().hide();
    
    $_div.find('.textdisplay').eq(index).stop(true, true).fadeIn(3000).siblings().fadeOut();
    
}



 /*
    //成功案例部分的缩放显示代码 显示部分
    $_case_display.click(function(){
    
        $h2_none = $('#h2_display');
        $div_display = $('#case_display');
        $div_meassage = $('#message_display');
        
        $div_meassage.hide();
        $(this).hide();
        $h2_none.hide();
        
        $div_display.show();
    });
    
    //成功案例部分的缩放显示代码 隐藏部分
    $_none_display.click(function(){
    
        $h2_none = $('#h2_display');
        $div_display = $('#case_display');
        $div_meassage = $('#message_display');
        
        $div_display.hide();
        
        $h2_none.show();
        $_case_display.show();
        $div_meassage.show();
        
    });
    
    
    
//成功案例的高亮代码
function product_successful_case(){
    //获得整体的div
    $_product_div = $("#successful_case");
    //子div设置事件
    $_product_div.find("div").hover(function(){
        $(this).find('p').addClass("select_p_2");
    }, function(){
        $(this).find('p').removeClass("select_p_2");
    });
}
    */
