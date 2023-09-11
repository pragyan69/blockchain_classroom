//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

contract IdentityManagement{
    // enum to represent the user state
    enum Status {
        NotRegistered,
        Registered,
        Revoked
    }

    // mapping to store the address of each address
    mapping(address => Status) public identities;

    // Event to log when a user is registered
    event Registered(address indexed user);

    // Event to log when a user revokes their identity
    event Revoked(address indexed user);

    // Function to register a new user
    function register() public {
        require(identities[msg.sender] == Status.NotRegistered, "Already registered or revoked"); //checking if registered or not
        identities[msg.sender] = Status.Registered; // updating the address 
        emit Registered(msg.sender); // emitting the registered event
    }

    function authenticate(address user) public view returns(bool) {
        return identities[user] == Status.Registered; // checking the user 
    }


    function revoke() public {
        // Check if the user is registered
        require(identities[msg.sender] == Status.Registered, "Not registered or already revoked");
        identities[msg.sender] = Status.Revoked;
        emit Revoked(msg.sender);
    }
}