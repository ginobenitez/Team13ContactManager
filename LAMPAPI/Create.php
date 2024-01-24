<?php
    $inData = getRequestInfo();

    $name = $inData["name"];
    $phone = $inData["phone"];
    $email = $inData["email"];
    
    $conn = new mysqli("localhost", "TheBeast", "1loveComputers", "COP4331");
    
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("INSERT INTO Contacts (Name, Phone, Email) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $phone, $email);
    
        if ($stmt->execute()) {
            $id = $stmt->insert_id;
            returnWithInfo($id, $name, $phone, $email);
        } else {
            returnWithError("Failed to add contact");
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
        $retValue = '{"id":0,"name":"","phone":"","email":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
    
    function returnWithInfo($id, $name, $phone, $email)
    {
        $retValue = '{"id":' . $id . ',"name":"' . $name . '","phone":"' . $phone . '","email":"' . $email .  '","error":""}';
        sendResultInfoAsJson($retValue);
    }
?>