const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    let buyer, seller, inspector, lender
    let realEstate, escrow

    beforeEach( async () => {
        // Set up Accounts
            // const signers = await ethers.getSigners()
            // console.log(signers)
            // const buyer = signers[0]
            // const seller = signers[1] // same as below:
        [ buyer, seller, inspector, lender ] = await ethers.getSigners()
    
        // Deploy Real Estate Contract
        const RealEstate = await ethers.getContractFactory('RealEstate')
        realEstate = await RealEstate.deploy()
        // console.log(realEstate.address)
    
        // Mint a NFT
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")
        await transaction.wait()
    
        // Deploy Escrow Contract
        const Escrow = await ethers.getContractFactory('Escrow')
        escrow = await Escrow.deploy
        (
            realEstate.address,
            seller.address,
            inspector.address,
            lender.address 
        )

    })
    
    describe('Deployment', () => {
    
        it('Returns the NFT address', async() => {
            const result = await escrow.nftAddress()
            expect(result).to.be.equal(realEstate.address)       
        })

        it('Returns the Seller address', async() => {
            const result = await escrow.seller()
            expect(result).to.be.equal(seller.address)       
        })

        it('Returns the Inspector address', async() => {
            const result = await escrow.inspector()
            expect(result).to.be.equal(inspector.address)       
        })

        it('Returns the Lender address', async() => {
            const result = await escrow.lender()
            expect(result).to.be.equal(lender.address)       
        })
    })
})
