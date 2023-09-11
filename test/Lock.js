const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("IdentityManagement", function () {
  let IdentityManagement, identityManagement, owner, addr1, addr2;


  beforeEach(async function () {
      IdentityManagement = await ethers.getContractFactory("IdentityManagement"); // calling the contract
      [owner, addr1, addr2] = await ethers.getSigners(); // we are bringing three address from the getSigners function
      identityManagement = await IdentityManagement.deploy(); // deploying the contract
  });
    // using the first function to allow the register
  it("Should allow users to register", async function () {
    await identityManagement.connect(addr1).register();
    expect(await identityManagement.identities(addr1.address)).to.equal(1);  // 1 means the second call of the enum
});
// function to authenticate
it("Should verify user authentication", async function () {
  await identityManagement.connect(addr1).register();
  expect(await identityManagement.authenticate(addr1.address)).to.equal(true);
});
// function to revoke
it("Should allow users to revoke access", async function () {
  await identityManagement.connect(addr1).register();
  await identityManagement.connect(addr1).revoke();
  expect(await identityManagement.identities(addr1.address)).to.equal(2);  // 2 corresponds to Status.Revoked
});
})