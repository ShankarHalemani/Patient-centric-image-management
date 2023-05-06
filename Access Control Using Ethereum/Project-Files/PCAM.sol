// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Patientcentricaccesscontrol{

    uint256 count = 5;
    uint original = 1;
    mapping(string=>bool) public isHashAvailable;
    mapping(string=>uint256) public hashLimt;
    mapping(address=>bool) public requestedUsers;
    mapping(address=>bool) public acceptedUsers;
    mapping(address=>string) public acceptedUsersHashes;

    mapping(string=>uint) public mapHash;
    mapping(address => mapping(string => string)) public mapUserHash;

    event RequestedForApproval(address requester,string info);
    event Requestdenied(address patient, string info);
    event Requestaccepted(address patient , string info);

    function addHash(string memory hash) public{
        isHashAvailable[hash] = true;
        hashLimt[hash] = count;
        mapHash[hash] = original;
        original += 1;
    }

    function getHashCount(string memory hash) public view returns(uint256 x)
    {
        if(isHashAvailable[hash])
        {
            return hashLimt[hash];
        }
    }

    function requestAccess(address request,string memory hash) public{
        if(isHashAvailable[hash])  // if the input hash is available
        {
            if(hashLimt[hash] > 0)
            {
                requestedUsers[request] = true;
                emit RequestedForApproval(request,"Request has been sent!");
            }
        }
    }

    function acceptRequest(address userAddress , string memory hash) public {
        if(requestedUsers[userAddress])
        {
            if(hashLimt[hash] > 0)
            {
                acceptedUsers[userAddress] = true;
                acceptedUsersHashes[userAddress] = hash;

                hashLimt[hash] = hashLimt[hash]-1;

                emit Requestaccepted(userAddress,"Request has been accepted");

                // for validation
                // uint county = mapHash[hash];
                mapUserHash[userAddress][hash] = hash;

            }
        }
    }

    function rejectRequest(address requestUser) public {

        if(requestedUsers[requestUser])
        {
            requestedUsers[requestUser] = false;
            emit Requestdenied(requestUser,"The Request has been denied");
        }
    }

    function isHashTampered(address user,string memory hash) public returns (bool)
    {
        string memory originalHash = mapUserHash[user][hash];
        return keccak256(abi.encodePacked(originalHash)) == keccak256(abi.encodePacked(hash));
    }   
}
