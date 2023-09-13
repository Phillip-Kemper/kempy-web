---
title: 'Why are Rollups  still centralized?'
date: '2023-09-12'
---

While marketing efforts of different rollup operating companies may suggest otherwise, most rollups remain inherently centralized in their current state. Only Taiko appears to be one of the few rollups that plan to launch with decentralized components from the very beginning. Others are not willing to risk missing out on early adoption and traction and push further decentralization plans to the future. Arbitrum seems to be turning words into deeds with their announcement of BOLD, which will enable permissionless validation of their optimistic rollup.

In this article, I want to highlight which rollup components are still centralized at the moment and how this affects the security of the end users. For more insights, I refer to the concept of [L2Beats Rollup stages](https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe), which have investigated every popular rollup in more detail.

Simplified, centralization can occur in these three base components of a rollup.

-Rollup Smart Contract and Bridge Contract

-Sequencer

-Provers (for ZK Rollups) / Validators (for Optimistic Rollups)

## Centralized Smart Contracts

How can the rollup contracts be centralized? Well, while they may be deployed immutable on a decentralized Ethereum base layer, it’s more likely that they are proxy contracts controlled by addresses from the rollup operator (e.g. a security council). It’s worth taking a look at the upgradeability and anonymity of the entities who can upgrade for different rollups, before depositing large funds into it. Bridges are still a big risk factor for any decentralized application. A delay in the upgradeability of the relevant contracts can increase the control for end users who should ideally have enough time to withdraw their assets. On the other hand, it increases the vulnerability of the rollup system in case of bugs.

## Centralized Trusted Sequencer

Currently, many rollups make use of a single trusted sequencer. This sequencer is the only entity that is permissioned to sequence new batches by the rollup contract. This design is not future-proof. A single trusted sequencer also introduces a single point of failure for the rollup system. If it goes offline (or maybe the server gets seized by a government seeking control), users may have no way to transact or even withdraw their assets (self-sequencing via L1 is supported by some systems to allow user exits).

In addition to that, end users have to put trust in the sequencer. A malicious sequencer may censor specific user addresses or perform harmful MEV while ordering the transactions and building new L2 blocks. Also, only the trusted sequencer gets to benefit economically from the rollup transaction fees.

## Centralized Provers or Validators

We are differentiating between provers and validators for ZK and Optimistic rollups respectively here, but the role in the architecture remains comparable. Verifying correct transactions, or disputing invalid transactions is an important aspect of each rollup. Many optimistic rollup systems still rely on trusted validators potentially operated by the rollup company itself. This introduces a huge trust assumption, as the block-building trusted sequencer may be operated by the same entity as the validator. In this case, there would be no incentive for the validator to dispute the sequenced batches. A rollup needs to have a functional proof system. Also, independent entities that are not controlled by the rollup operators should be able to submit proofs to keep the rollup secure and benefit economically from their work.

## Final Thoughts

After discussing the centralization issues in current rollups, it's important to explore why this is happening. As rollups are still in their infancy, their technology has not been 100% explored and tested yet. That’s why fast upgradeability is still accepted by the community for now. In addition to that, permissionless sequencers and provers may still be a technical hurdle (how do sequencers coordinate? Who gets to submit the proof?). While this may be acceptable for now and truly decentralized rollup systems are not feasible yet, rollups should continue to strive for further decentralization in their stack. Also, a bare minimum of e.g. a working proof system should be deployed in production. In an upcoming article, I plan to outline some steps on how rollups can become more decentralized.
