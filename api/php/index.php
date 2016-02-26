<?php
// Chargement des dépendances
require_once __DIR__.'/vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ParameterBag;

$app = new Silex\Application();
	
$app['debug'] = true;

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
	'dbs.options' => array (
		'mysql_read' => array(
			'driver'    => 'pdo_mysql',
			'host'      => 'localhost',
			'dbname'    => 'tabord_ng',
			'user'      => 'root',
			'password'  => '',
			'charset'   => 'utf8',
			'port'		=> '3306'
		)
	)
));

/*$app->before(function (Request $request) {
	if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
		$data = json_decode($request->getContent(), true);
		$request->request->replace(is_array($data) ? $data : array());
	}
});*/

/*$app->before(function (Request $request) {
    if ($this->isRequestTransformable($request)) {
        $transformedRequest = $this->transformContent($request->getContent());
        $request->request->replace($transformedRequest);
    }
});
*/
$app->post('/authenticate', function (Request $request) use ($app) {
	$sql = "SELECT count(*) AS 'exists' FROM utilisateurs WHERE login = ? AND password = ?";
	$payload = json_decode($request->getContent());
	$momo 		= $payload->username;
	$toto 		= $payload->password;
	$post 		= $app['dbs']['mysql_read']->fetchAssoc($sql, array((string) $momo, (string) $toto));

	if ($post['exists'] == '1') {
		$return['data']['authenticated'] = true;
		$return['data']['username'] = $momo;
		return $app->json($return, 201);
	} else {
		$return['authenticated'] = false;
		return $app->json($return, 403);
	}
});


$app->get('/codes_tva', function () use ($app) {
	$post = $app['dbs']['mysql_read']->fetchAll("SELECT * FROM codes_tva");
	//return  json_encode($post);
	//return $app->json($post);
	$return['data'] = $post;

	return $app->json($return, 201);
});

$app->get('/codes_tva/{id}', function ($id) use ($app) {
	$sql = "SELECT * FROM codes_tva WHERE code = ?";
	$post = $app['dbs']['mysql_read']->fetchAssoc($sql, array((int) $id));

	//return  json_encode($post);
	return $app->json($post);
});

$app->get('/hello', function () {
	return 'Hello!';
});

$app->run();
