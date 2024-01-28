<?php
    /*need firstname, lastname, and userid*/
    $inData = getRequestInfo();

    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $userID = $inData["UserID"];

    $conn = new mysqli("localhost", "TheBeast", "1loveComputers", "COP4331");

    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE FirstName = ? AND LastName = ? AND UserID = ?");
        $stmt->bind_param("ssi", $firstName, $lastName, $userID);
        $stmt->execute();
        if ($stmt->affected_rows > 0) {
            $stmt->close();
            $conn->close();
            returnWithError("");
        } else {
            // if the contact does not exist
            $stmt->close();
            $conn->close();
            returnWithError("Contact not found");
        }
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