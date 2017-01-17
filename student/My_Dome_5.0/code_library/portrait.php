<?php  
header('Content-Type:text/html;charset=utf-8');

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>头像选择</title>
<link rel="stylesheet" style="text/css" href="../style_library/portrait.css"/>
</head>
 
<body>
      
     <div id="portrait">
       <h2>请点击选择头像</h2>
       <dl>
        <?php foreach(range(1,9) as $value){ ?>
        <dd><img src="../head_portrait/portrait0<?php echo $value?>.jpg" alt="portrait0<?php echo $value?>.jpg" /></dd>
        <?php }?>
       </dl>
     </div>
 
 
<script type="text/javascript" src="../javascript/portrait.js">
</script>
</body>
</html>