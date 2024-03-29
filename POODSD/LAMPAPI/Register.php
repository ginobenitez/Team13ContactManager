<?php

$inData = getRequestInfo();

$login = $inData["login"];
$password = $inData["password"];
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];

$conn = new mysqli("localhost", "TheBeast", "1loveComputers", "COP4331");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
} else {
    $stmt = $conn->prepare("INSERT INTO Users (Login, Password, FirstName, LastName) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $login, $password, $firstName, $lastName);

    if ($stmt->execute()) {
        $id = $stmt->insert_id;
        returnWithInfo($id, $firstName, $lastName);
    } else {
        returnWithError("Registration Failed");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($id, $firstName, $lastName)
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    sendResultInfoAsJson($retValue);
}

?>
