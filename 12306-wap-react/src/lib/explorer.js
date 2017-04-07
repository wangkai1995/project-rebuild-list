
    //浏览器名以及版本号探测
    //包含用户设备信息 以及浏览器内核
    //防止代码出错
    try{
    //获取浏览器信息
       var Browser  = function(){
            //检测正则
                //内核
            var webkit_Reg = /AppleWebKit\/(\S+)/,
                khtml_Reg = /KHTML\/(\S+)/,
                konq_Reg = /Konqueror\/([^;]+)/,
                gecko_Reg = /rv:([^\)]+)\) Gecko\/\d{8}/,
                //浏览器 
                chrome_Reg = /Chrome\/(\S+)/,
                safari_Reg = /Version\/(\S+)/,
                firefox_Reg = /Firefox\/(\S+)/,
                ie_Reg = /MSIE ([^;]+)/,
                //win 版本号
                winVer_Reg = /Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/,
                //mobile
                winMobile_Reg = /Windows Phone OS (\d+.\d+)/,
                iosMobile_Reg = /CPU (?:iPhone )?OS (\d+_\d+)/,
                android_Reg = /Android (\d+\.\d+)/,
                //game
                ps_Reg = /playstation/i;


            //浏览器内核
            var engine = {
                ie : 0,
                gecko : 0,
                webkit : 0,
                khtml: 0,
                opera : 0,
                //完整的版本号
                ver:null
            };

            //浏览器名
            var browser = {
                //主要浏览器
                ie : 0,
                firefox : 0,
                safari : 0,
                konq : 0,
                opera : 0,
                chrome : 0,
                //具体的版本号
                ver : null, 
            };

            //平台设备和操作系统
            var system = {
                win : false,
                mac : false,
                xll : false,

                //移动设备
                iphone : false,
                ipod : false,
                ipad : false,
                ios : false,
                android : false,
                nokiaN : false,
                winMobile : false,

                //游戏系统
                wii : false,
                ps : false
            };

            //检测内核和浏览器
            var ua = navigator.userAgent;
            if(window.opera){
                engine.ver = browser.ver = window.opera.version();
                engine.opera = browser.opera = parseFloat(engine.ver);
                //webkit
            } else if( webkit_Reg.test(ua) ){
                engine.ver = RegExp['$1'];
                engine.webkit = parseFloat(engine.ver);

                //确认是chrome 还是safari
                if( chrome_Reg.test(ua) ){
                    browser.ver = RegExp['$1'];
                    browser.chrome = parseFloat(browser.ver);
                }else if( safari_Reg.test(ua) ){
                    browser.ver = RegExp['$1'];
                    browser.safari = parseFloat(browser.ver);
                } else {
                    //近可能的确定safari版本号
                    var safariVersion = 1;
                    if( engine.webkit < 100 ){
                        safariVersion = 1;
                    } else if( engine.webkit < 312){
                        safariVersion = 1.2;
                    } else if( engine.webkit < 412){
                        safariVersion = 1.3;
                    } else {
                        safariVersion = 2;
                    }

                    browser.ver = safariVersion;
                    browser.safari = browser.ver ;
                }
                // end webkit
            } else if( khtml_Reg.test(ua) || konq_Reg.test(ua) ){
                engine.ver = browser.ver = RegExp['$1'];
                engine.ktml = browser.konq = parseFloat(engine.ver);
            } else if( gecko_Reg.test(ua) ){
                engine.ver = RegExp['$1'];
                engine.gecko = parseFloat(engine.ver);
                //确定是否是firefox
                if( firefox_Reg.test(ua) ){
                    browser.ver = RegExp['$1'];
                    browser.firefox = parseFloat(browser.ver);
                }   
            } else if( ie_Reg.test(ua) ){
                engine.ver = browser.ver = RegExp['$1'];
                engine.ie = browser.ie = parseFloat(engine.ver);
            }
            browser.ie = engine.ie;
            browser.opera = engine.oprea;

            //检测平台
            var p = navigator.platform;
            system.win = p.indexOf('Win') === 0;
            system.mac = p.indexOf('Mac') === 0;
            system.xll = ( p === 'Xll' || ( p.indexOf('Linux') === 0 ) );


            //检测window操作系统
            if( system.win ){
                if( winVer_Reg.test(ua) ){
                    if( RegExp['$1'] === 'NT' ){
                        switch( RegExp['$2'] ){
                            case "5.0":
                                system.win = '2000';
                                break;
                            case "5.1":
                                system.win = 'XP';
                                break;
                            case "6.0":
                                system.win = "Vista";
                                break;
                            case "6.1":
                                system.win = '7';
                                break;
                            default:
                                system.win = 'NT';
                                break;
                        }
                    } else if( RegExp['$1'] === '9x' ){
                        system.win = "ME";
                    } else {
                        system.win = RegExp['$1'];
                    }
                }
            }

            //移动设备
            system.iphone = ua.indexOf('iPhone') > -1;
            system.ipod = ua.indexOf('iPod') > -1;
            system.ipad = ua.indexOf('iPad') > -1;
            system.nokiaN = ua.indexOf('NokiaN') > -1;

            //window mobile
            if( system.win === 'CE' ){
                system.winMobile = system.win;
            } else if( system.win === 'Ph' ){
                if( winMobile_Reg.test(ua) ){
                    system.win = 'Phone';
                    system.winMobile = parseFloat(RegExp['$1']);
                }
            }
            
            // IOS mobile
            if( system.mac && ua.indexOf('Mobile') > -1 ){
                if( iosMobile_Reg.test(ua) ){
                    system.ios = parseFloat( RegExp.$1.replace('_','.') );
                } else {
                    //猜测
                    system.ios = 2;
                }
            }

            //检测android
            if( android_Reg.test(ua) ){
                system.android = parseFloat( RegExp['$1'] );
            }

            //游戏系统
            system.wii = ua.indexOf('Wii') >-1;
            system.ps = ps_Reg.test(ua);

            return {
                engine: engine,
                browser : browser,
                system : system
            };
        }();
    }catch(e){
        console.log('浏览器探测出错了'+e);
    }


    
    export default Browser;
    