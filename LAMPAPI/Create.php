<?php
    /*
    Contacts need:
    Name (first & last)
    Email
    Phone
    Date created
    */

    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $phone = $inData["phone"];
    $email = $inData["email"];
    $userID = $inData["userId"];
    
    $conn = new mysqli("localhost", "TheBeast", "1loveComputers", "COP4331");
    
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Phone, Email, UserID) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $userID);
    
        if ($stmt->execute()) {
            $id = $stmt->insert_id;
            returnWithInfo($id, $firstName, $lastName, $phone, $email);
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
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }
    
    function returnWithInfo($id, $firstName, $lastName, $phone, $email)
{
    $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","phone":"' . $phone . '","email":"' . $email .  '","error":""}';
    sendResultInfoAsJson($retValue);
}

?>