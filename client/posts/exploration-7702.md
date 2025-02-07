---
title: "Visual Exploration of EIP-7702 at Infrastructure Level"
date: "2025-02-07"
---

## Introduction
EIP-7702 is an Ethereum Improvement Proposal scheduled for inclusion in the upcoming **Pectra** upgrade in March 2025. It allows Externally Owned Accounts (EOAs) to turn into smart contract code for a single transaction—effectively bringing some of the benefits of account abstraction to EOAs.

There are enough resources pointing how this EIP can improve UX at the application level. If you want to get a more thorough understanding of what's happening under the hood but are intimidated by the official [specification](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7702.md) and too lazy to read the code yourself, the following paragraphs may be helpful for you.

## Ethereum State Recap

In Ethereum, an account's state (whether an EOA or contract) has four fields:

1. **Nonce**. Tracks the number of transactions sent from an account.  
2. **Balance**. The balance of Ether on the account.  
3. **Storage Root**. A root hash of the Merkle Patricia Trie (MPT) that holds key-value pairs for this account’s storage.  
4. **Code Hash**. The keccak256 hash of the bytecode associated with the account.

So far, EOAs didn't have any storage or code, so $\mathrm{storageRoot} = 0x$ and $\mathrm{codeHash} = 0x$. It was always widely implied that if it’s a smart contract, $\mathrm{codeHash} \neq 0$ and the node’s execution client (e.g., Geth) keeps a mapping from that hash to the actual bytecode in its LevelDB or equivalent database (Key-Value store mapping $codeHash$ to bytecode).

When a transaction is sent **to** a contract, the execution client fetches the bytecode from this storage to run the contract code. If it’s an EOA, there’s no code to fetch—just a signature check and nonce increment, plus any ETH transfer.

The following figure visualizes the steps:
- An EOA deploys a Counter smart contract, it's nonce is increased and gas fees are paid
- Execution clients store the bytecode in a key-value mapping which can be retrieved by its hash

![accountTrie](/images/eoa2.png)

### Delegation Mechanics

EIP-7702 introduces a new transaction type that populates the **codeHash** of an EOA with a delegation. Specifically this delegation is indicated by:

$$
\mathrm{codeHash} = \mathrm{keccak256}(0xef011 \,\|\, \mathrm{address})
$$

Here, $0xef011$ is a special prefix indicating that this is a *delegated account*. The execution client interprets this special prefix, looks up the associated contract address, and uses the contract’s bytecode whenever the EOA receives a call.

This approach is similar to a standard Proxy pattern: many different EOAs can delegate to the **same** contract instance. However, each EOA keeps its **own** storage root, so reading/writing contract state goes into the EOA’s storage. The EOA effectively uses the bytecode of the delegated contract during execution, but the persistent storage belongs to the delegating EOA.

As seen in the figure below the EOA has delegated its code to the smart contract using an EIP7702 transaction. Aftwards in another transaction, the EOA is called and the number variable has been set to 2 and thereby initialized the storage trie for that account.

![delegation](/images/eoa4.png)

### EIP-7702 Transaction Contents

An EIP-7702 transaction can bundle a list of authorization tuples of the form:

$$
(\mathrm{chainID}, \mathrm{address}, \mathrm{nonce})
$$

The client only applies these delegations if:

1. $\mathrm{chainID}$ matches the current chain.  
2. $\mathrm{nonce}$ for each tuple matches the EOA’s expected nonce.  
3. The authorization is signed by the EOA.  

Additionally, a single EIP-7702 transaction can batch multiple such authorization tuples. This means wallets or protocols could, for example, collect many user delegations without each user having to spend gas.

## Storage Considerations

When you delegate your EOA to a smart contract via EIP-7702, your EOA now has a non-empty $\mathrm{storageRoot}$. This is because the moment you start executing code in the EOA context, the EOA’s own storage can be updated.

If you later delegate to **another** smart contract, be mindful that your EOA’s storage is **not** automatically reset. If the first contract set some variable in slot 0 to 2, that same storage location will still be 2 even after you delegate to a second contract that also uses slot 0 for something else. This can lead to collisions and potentially catastrophic bugs.

The recommended best practice is to use **storage namespacing** or carefully structured storage to avoid collisions. But as of today, there is no native Ethereum instruction to just “clear out” storage.

In our scenario, we have deployed a second Counter instance with an additional variable and delegated the EOAs account to this new address. The number in slot 0 is already initialized to 2.


![accountTrie](/images/eoa3.png)

## Conclusion

As we have seen, EIP-7702 doesn’t even drastically change the protocol. Rather it just extends the capabilities of an EOA to the ones of a contract. EOAs can now have code and advanced logic for a single transaction.

Caution will be needed by users. It will be up to wallets to warn a user that they don't delegate their EOA to a malicious smart contract.
Many apps and protocols currently assume that any address without code is by definition an EOA. With EIP-7702, that assumption no longer holds; an EOA can have a code hash and a storage root. 

Check out this [eip-7702-playground](https://github.com/Phillip-Kemper/eip-7702-playground) repository, which includes scripts for Alloy (Rust) interacting with the Ithaca test network (a staging ground for EIP-7702) to play around with it yourself.

---
