<?php

    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $userID = $inData["UserID"];
    $phone = $inData["phone"];
    $email = $inData["email"];
    
    $conn = new mysqli("localhost", "TheBeast", "1loveComputers", "COP4331");
    
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else{
        $stmt = $conn->prepare("UPDATE Contacts SET firstName = ?, lastName = ?, Phone = ?, Email = ? WHERE UserID = ?");
        $stmt->bind_param("ssssi", $firstName, $lastName, $phone, $email, $userID);
        $stmt->execute();

        $stmt->close();
        $conn->close();
        returnWithError("");
    }

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>