<?php

//防止恶意调用
define('IN_FLAG',true);
//调用核心函数库
require 'code_library.php';

//调用生产验证码函数
Verification_code();


?>