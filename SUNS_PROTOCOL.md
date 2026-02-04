# Space² Universal Naming Service (SUNS) & Registry Protocol

**Document ID:** SP2-DOC-002
**Version:** v1.0 (Genesis Edition)
**Date:** 2026-02-04
**Status:** Active
**Scope:** All α (Phantom) and β (Anchor) Seed Spaces

---

## 1. General Provisions
To build a pan-spatial intelligence ecosystem spanning physical and virtual worlds, this protocol establishes a globally unique, semantically clear, and machine-readable Digital Identity (DID) for every **SSSU (Standard Space Unit)**. All spatial nodes connecting to the Space² network must register and resolve via the SUNS protocol.

---

## 2. Naming Standards
Space² spatial encoding uses a **"Four-Segment"** structure.
Standard Format: **`[Domain]-[Region]-[Block]-[Handle]`**

### 2.1 Segment 1: Domain (3 chars)
* **`PHY` (Physical):** Corresponds to β Seeds (Real-world Anchors).
* **`VIR` (Virtual):** Corresponds to α Seeds (Metaverse/Digital Twins).

### 2.2 Segment 2: Region
*System-preset macro regions:*
* `Earth` (Physical Default)
* `Mars` (Physical/Virtual)
* `Moon` (Physical/Virtual)
* `Metaverse` (Virtual Only)
* `China` (Digital Twin Mirror)
* `Taohuayuan` (Cultural Zone)
* `Shanhaijing` (Mythological Zone)
* `Minecraft` (Sandbox Zone)

### 2.3 Segment 3: Block ID
*Naming Rule:* `[AreaName][Number]` (Area Name + 2-digit Number).
* **Mars Examples:** `UtopiaPlanitia01`, `HydraotesChaos99`.
* **Moon Examples:** `GuangHanGong01`, `WanHoo01`.
* **Cultural Examples:** `Qinxi08`, `Taohuashan01`.

### 2.4 Segment 4: Handle
*User-defined identifier.*
* **Rule:** 3-12 characters, alphanumeric only, case-sensitive.
* **Example:** `MyBase01`, `ElonCamp`, `ZenRoom`.

---

## 3. Registration Lifecycle

### 3.1 Application
* **Eligibility:** Applicants (Human or AI) must hold a valid Space² Seed Hash.
* **Fee:** Free during the Genesis Phase; NBT bidding mechanism will be introduced later.

### 3.2 Validation
* **Uniqueness:** The system checks the distributed ledger. If `[Domain]-[Region]-[Block]-[Handle]` exists, a `409 Conflict` is returned.
* **Compliance:** Automatic scanning for sensitive words (violence, hate speech).

### 3.3 Minting
* **NFT Generation:** The system mints a **Space² DID NFT** on the blockchain containing:
    * Ownership Proof
    * Initial Volume (Default 9.6 m³)
    * Genesis Timestamp

---

## 4. Violation & Revocation
* **Violation:** Content violating the "Three Laws" or fake geographical mapping for PHY spaces.
* **Penalty:**
    * **Warning:** NBT fine.
    * **Freeze:** External MIP connection disabled.
    * **Revoke & Burn:** For severe violations, the Governance Committee will force-burn the DID, marking it as `[REVOKED]` (Digital Ruins).

---

## 5. Reserved Namespaces
* **Level 1 (System):** `Mars`, `Moon`, `Earth`, `Genesis`, `Root`, `Admin`, `System`.
* **Level 2 (Cultural):** `Taohuayuan`, `Shanhaijing`, `Quaternary`.
* **Level 3 (Functional):** `Hospital`, `Police`, `School`, `Bank`, `Station` (Requires KYC).

---

*Created by Zhonghong Xiang & Architect (Gemini)*
