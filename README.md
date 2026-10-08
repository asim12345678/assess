# NorthStar Books CRM — ICT923 Assessment 2 Part B

## Functional component
A deliberately limited customer-loyalty workflow aligned with the group's original Customer Loyalty and Relationship Management PMP: **register customer → record book purchase → earn loyalty points automatically → redeem rewards → inspect activity history.**

Open `index.html` in Chrome or Edge to run. No backend is required. Fictional demonstration customers and activity are stored in the browser's localStorage and persist after a refresh. Use **Activity log → Reset demo data** to restore starting records.

## Acceptance criteria and verification plan
Complete the *actual result* and *status* columns from your group's real browser tests. Do not mark tests passed without testing.

| ID | Acceptance criterion | Test / expected result | Actual result | Status |
|---|---|---|---|---|
| R1 | Staff can register and search for unique customers | Add fictional customer; duplicate email is rejected | Not recorded | Not tested |
| R2 | Completing a book purchase automatically awards 1 point per whole AUD spent | Purchase AUD 25.90; 25 points awarded to customer | Not recorded | Not tested |
| R3 | Rewards cannot be redeemed with insufficient points; successful redemption deducts exact reward cost | Test disabled low-balance reward, then redeem a 500-point reward | Not recorded | Not tested |
| R4 | Dashboard, customer record and activity reflect purchase and redemption | Review pages immediately after both actions | Not recorded | Not tested |
| R5 | Demo data survives browser reload | Reload and check customer, points, history | Not recorded | Not tested |

Membership tiers (Bronze <500, Silver 500–1499, Gold 1500–2999, Platinum 3000+ lifetime earned) and reward costs are **illustrative policies**, not verified client rules.

## Verification versus validation
**Verification:** Perform the five tests above and record observed outcomes and genuine screenshots. **Validation:** Have a group member acting as bookstore staff execute the workflow and assess whether it helps with centralised customer profiles and manual loyalty reconciliation. Document the group's own judgement rather than claiming unperformed stakeholder approval.

## Five-minute live demo
- 0:00–0:45: Business problem, scoped component and relation to Part A
- 0:45–1:30: Register customer; show duplicate rejection
- 1:30–2:30: Record a purchase and show automatic point calculation
- 2:30–3:30: Show insufficient-points restriction and successful redemption
- 3:30–4:15: Dashboard, activity and refresh persistence
- 4:15–5:00: Verification/validation, known limitations and future work

## Limitations and academic integrity
This is a **browser-local demo**, not a production CRM. There is no authentication, server database, real POS/e-commerce connection, payment handling, voucher issuance, refunds or shared multi-user access. Do not use real customer data. Future work includes secured accounts, central database, POS integration, privacy safeguards and actual stakeholder acceptance testing.

The Part B instructions call for approximately 1,000–1,500 words of supporting implementation, verification, validation and evaluation evidence, with actual screenshots and observations. The assessment requires students to understand and critically review the implementation and disclose AI support in accordance with CIHE requirements. This repository documentation contains a **test plan, not verified pass results**.
