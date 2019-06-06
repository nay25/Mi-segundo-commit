<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Login</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" type="text/css" href="../plugins/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="../plugins/fontawesome-free-5.8.1-web/css/all.min.css">
	<link rel="stylesheet" type="text/css" href="../css/estilos.css">
	<!-- Alertify	 -->
	<link rel="stylesheet" type="text/css" href="../plugins/alertifyjs/css/alertify.css">
	<link rel="stylesheet" type="text/css" href="../plugins/alertifyjs/css/themes/bootstrap.css">

	 <!-- bootstrap-toggle-master -->
	<link href="../plugins/bootstrap-toggle-master/css/bootstrap-toggle.css" rel="stylesheet">
    <link href="../plugins/bootstrap-toggle-master/stylesheet.css" rel="stylesheet">
</head>
<body class="login">
	<div class="container" style="display:none" id="cuerpo">
		<div class="row justify-content-md-center">
			<div class="col-md-auto login-box borde sombra">
				<h3 class="text-center titulo">Iniciar Sesión</h3>
				<hr>
				<form id="frmIngreso">
					<div class="form-row">
						<div class="col-md-12">
							<label for="" class="colorLetra">Nombre de usuario:</label>
					          <div class="form-group has-feedback salto">
					            <input type="text" id="username" placeholder="Usuario" class="form-control " autofocus>
					            <span class="glyphicon glyphicon-user form-control-feedback"></span>
					          </div>
						</div>
						<div class="col-md-12">
							<label for="" class="colorLetra">Contraseña:</label>
					          <div class="form-group has-feedback salto">
					            <input type="password" id="pass" placeholder="Usuario" class="form-control " >
					            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
					          </div>
						</div>
					</div>
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-12">
									<input id="chkContra"  onchange='evaluarCheck(this.value)' data-on="Si" data-off="No" type="checkbox" checked data-toggle="toggle" data-size="mini" value='no'><label class="colorLetra"> &nbsp; Cambiar Contraseña</label>
		              			<button type="submit" class="btn btn-login  btn-flat  pull-right" id="btnIngresar">
				              		<i class="fas fa-lock-open"></i>
				              		Ingresar
		              			</button>

								<button type="button" class="btn btn-login btn-flat pull-left"  onclick="registros();">
									<i class="">
									Registros
								</button>
		              			
	              			</div>
	            		</div><!-- /.col -->
					</div>
				</form>
			</div>			
		</div>
	</div>

	<!--REGISTROS-->
<div class="container" style="display:none" id="registros">
	<div class="col-xs-10 col-sm-6 col-md-8 col-lg-8">
	<div class="row justify-content-md-center">
		<div class="contenido borde sombra">
			<div align="center">
			<h3 class="text-center titulo">Registro Alumnos</h3>
			</div>
			<form  id="frmRegistrar">
				<div class="form-row">
					<div class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
						<label for="matricula" class="colorLetra">Matricula</label>
						<div class="form-group has-feedback salto">
							<input type="text" id="matricula" class="form-control">
							<span class="glyphicon glyphicon-align-justify form-control-feedback"></span>
						</div>
					</div>


					<div class="wrap pull-left">
						<div class="foto pull-right">
					  <img src="../images/15720113.jpg" alt="Imagen" width="150px" height="150px" id="imagen">  
					 </div>
						<div class="widget">
							<div class="fecha">
								<p id="diaSemana" class="diaSemana"></p>
								<p id="dia" class="dia"></p>
								<p>de</p>
								<p id="mes" class="mes"></p>
								<p>del</p>
								<p id="year" class="year"></p>
							</div>

							<div class="reloj">
							<img src="img/segundos.jpg" alt="Imagen Fotografica" width="40px" height="40px" title="Fotografia Rubby Guerrero"> 
							<p id="horas" class="horas"></p>
							<p>:</p>
							<p id="minutos" class="minutos"></p>
							<p>:</p>
							<div class="caja-segundos">
							<p id="ampm" class="ampm"></p>
							<p id="segundos" class="segundos"></p> 
							</div>
						</div>
						
					</div>


					<div class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
						<label for="nombre" class="colorLetra">Nombre</label>
						<div class="form-group has-feedback salto">
							<input type="text" id="nombre" class="form-control">
							<span class="glyphicon glyphicon-list-alt form-control-feedback"></span>
						</div>
					</div>

					<div class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
						<label for="Carrera" class="colorLetra">Carrera</label>
						<div class="form-group has-feedback salto">
							<input type="text" id="carrera" class="form-control">
							<span class="glyphicon glyphicon-asterisk form-control-feedback"></span>
						</div>
					</div>
					
					<div class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
						<label for="ES" class="colorLetra">Entrada/Salida</label>
						<div class="form-group has-feedback salto">
							<input type="text" id="ES" class="form-control">
							<span class="glyphicon glyphicon-transfer form-control-feedback"></span>
						</div>
					</div>
					<div class=" col-lg-8">
				            <label>Mensaje:</label>
				            <div class="form-group has-feedback salto">
				              <textarea class="form-control" id="descripcion" disabled=""></textarea>
				           </div>
				       </div>

				           <div class="container-fluid">
						<div class="row">
							<div class="col-md-12">
									<button type="button" class="btn btn-login  btn-flat  pull-left" id="btnRegistros" onclick="regresar()">
			              			<i class="fas fa-times"></i>
			              			Regresar
		              			</button>
		              			
	              			</div>
	            		</div><!-- /.col -->
					</div>
	
				</div>
			</form>
		</div>
	</div>
</div>


		<!--CAMBIAR CONTRASEÑA-->

	<div class="container" style="display:none" id="cambiarContra">
		<div class="row justify-content-md-center">
			<div class="col-md-auto login-box borde sombra">
				<h3 class="text-center titulo">Cambiar Contraseña</h3>
				<hr>
				<form id="frmCambiar">
					<div class="form-row">
						<div class="col-md-12">
							<input type="hidden" id="usuario" class="form-control">
						<div class="col-md-12">
							<label for="" class="colorLetra">Contraseña:</label>
					          <div class="form-group has-feedback salto">
					            <input type="password" id="vContra1"  class="form-control " >
					            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
					          </div>
						</div>
						<div class="col-md-12">
							<label for="" class="colorLetra">Verificar Contraseña:</label>
					          <div class="form-group has-feedback salto">
					            <input type="password" id="vContra2"  class="form-control " >
					            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
					          </div>
						</div>
					</div>
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-12">
									<button type="button" class="btn btn-login  btn-flat  pull-left" id="btnCancelar" onclick="cancelar()">
			              			<i class="fas fa-times"></i>
			              			Cancelar
		              			</button>
		              			<button type="submit" class="btn btn-login  btn-flat  pull-right" id="btnActualizar">
			              			<i class="fas fa-lock-open"></i>
			              			Actualizar
		              			</button>
	              			</div>
	            		</div><!-- /.col -->
					</div>
				</div>
				</form>
			</div>			
		</div>
	</div>

	<audio src="" hidden class=speech></audio>
	
	<script src="../plugins/jQuery/jQuery-2.1.4.min.js"></script>
	<script src="../plugins/bootstrap/js/bootstrap.min.js"></script>
	<script src="../plugins/Preloaders/jquery.preloaders.js"></script>

	<!-- alertify -->
	<script type="text/javascript" src="../plugins/alertifyjs/alertify.js"></script>
	<!-- bootstrap-toggle-master -->
	<script src="../plugins/bootstrap-toggle-master/doc/script.js"></script>
    <script src="../plugins/bootstrap-toggle-master/js/bootstrap-toggle.js"></script>

    <!--AUDIO-->
    <script type="text/javascript" src="../plugins/voice/responsivevoice.js"></script>

    <!-- Funciones propias -->
    <script src="funciones.js"></script>
    <script src="../js/menu.js"></script>
    <script src="../js/precarga.js"></script>

		<script>
		window.onload = function() {
			$("#cuerpo").fadeIn("slow");
			$("#username").focus();
		};	
		$('#chkContra').bootstrapToggle('off');
		$('#chkContra').val('no');
	</script>


</body>
</html>