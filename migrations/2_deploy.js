const Box = artifacts.require('Box');

module.exports = async function (deployer) {
    await deployer.deploy(Box);
};