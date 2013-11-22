<?php
	session_start();
	
	ini_set('display_errors', 1); 
	error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html class="ui-mobile">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Podium App</title>

        <link rel="stylesheet" href="//code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.css">
        <link rel="stylesheet" href="_css/style.css">
        <link rel="stylesheet" href="_css/bootstrap.css">

        <link href='http://fonts.googleapis.com/css?family=Ropa+Sans' rel='stylesheet' type='text/css'>

        <script src="//code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="//code.jquery.com/mobile/1.3.2/jquery.mobile-1.3.2.min.js"></script>
        <script src="_js/dojo.js"></script>
        <script src="_js/file-operations.js"></script>

        <script src="_js/script.js"></script>
        <script src="_js/main-menu.js"></script>  
        <script src="_js/file-operations.js"></script>    
        <script src="_js/display-operations.js"></script>   
        <script src="_js/user_input.js"></script>
        <script src="_js/bootstrap.js"></script>
        <script src="_js/bootswatch.js"></script>
        <script src="_js/bsa.js"></script>

    </head>
    <body>
    	<?php
			// Import controller class
			require('_includes/classes/class.controller.php');
			
			// Create instance of controller
			$controller = new Controller();
		?>
		
        <div data-role="page" class="ui-responsive-panel">
			<div data-role="header" data-position="fixed">
				<a href="#nav-panel" data-role="button" data-mini="true">Menu</a>
				<h1>Podium</h1>
				
				<div data-role="navbar">
					<ul>
						<li><a href="" data-role="button" data-mini="true" onClick="newFile()">New</a></li>
						<li><a id="openfile" href="" data-role="button" data-mini="true">Open File</a></li>
					</ul>
				</div>
			</div>
			
			<div data-role="popup" id="inputForm">
				<p>This is a completely basic popup, no options set.<p>
			</div>
			
			<div data-role="content" id="page">
				<div class="content-primary">
					<div id="canvas">
						<div id='text-canvas' contenteditable="true">

						</div>
					</div>
				</div>
				<div class="content-secondary">
					<div id="right-menu" class="menu">
						<div id="slider">
							20 <input id="speed-slider" type="range"
									  min="0" max="20" step="1" value="0"
									  onchange="updateSlider(this.value)" />
							0
						</div><br/>
					</div>
				</div>
			</div>

            <div data-role="panel" data-position="left" data-position-fixed="false" data-display="reveal" id="nav-panel" data-theme="a">
				<?php
					include('_includes/pages/menu.php');
				?>
            </div>

        </div><!-- /page -->

        <input type="file" id="open-file" onChange='openFile()'/>
    </body>
</html>