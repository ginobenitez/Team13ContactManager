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

        if ($stmt->execute()) 
        {
            returnWithInfo($firstName, $lastName, $userID);
        } 
        else 
        {
            returnWithError("Failed to delete contact");
        }

        $stmt->close();
        $conn->close();
    }
?>