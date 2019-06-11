<?php
namespace App\Controller;

use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Yaml\Exception\ParseException;

class ToDo
{
    private $yamlFile;

    public function __construct(KernelInterface $appKernel)
    {
        $this->yamlFile = $appKernel->getProjectDir() . '/data/todo.yaml';
    }

    public function save(Request $request)
    {
        $yaml = Yaml::dump(json_decode($request->getContent(), true));
        file_put_contents($this->yamlFile, $yaml);
        return new JsonResponse([
            'ok' => true,
        ]);
    }
    public function load()
    {
        try {
            $todo = Yaml::parseFile($this->yamlFile);
        } catch (ParseException $exception) {
            $todo = [
                [ 'checked' => false, 'text' => 'Task 1', 'id' => 1 ],
                [ 'checked' => false, 'text' => 'Task 2', 'id' => 2 ],
                [ 'checked' => false, 'text' => 'Task 3', 'id' => 3 ],
            ];
        }
        return new JsonResponse($todo);
    }
}