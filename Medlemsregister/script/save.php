<!--tagit kod härifrån..  http://www.youtube.com/watch?v=OSqRFGEhAq0-->
<?php
$open = fopen("data.txt", 'w+');

if($open){
$content = regArr;

	if(fwrite($open, $content)){
		echo "good!";
	}else{
		echo "cant Write..";
	}
	
}else{
	echo "cant open";
}

?>
