# ICT923 Part B — verification and validation worksheet

Carry out tests in a current desktop browser before submitting. Record the actual result, screenshot and outcome **after running** each test; this document does not claim the tests have been executed.

| ID | Requirement / acceptance criterion | Action | Expected result | Actual result / evidence | Status |
|---|---|---|---|---|---|
| R1 | Staff can register a customer with a unique email | Add a new fictional customer, then try reusing the email | First attempt succeeds; duplicate is rejected | To be observed | Not run |
| R2 | Customer records are searchable | Search for a known customer by name or ID | Matching profile appears | To be observed | Not run |
| R3 | A purchase updates loyalty points automatically | Register a $60 purchase for a zero-point customer | 600 points credited; purchase visible | To be observed | Not run |
| R4 | Rewards require adequate points and subtract correct cost | Redeem 500-point voucher; also try on a 0-point account | Balance drops by 500; unaffordable reward disabled | To be observed | Not run |
| R5 | Transactions and balances are retained after reload | Refresh after R3/R4 | Same account balances and purchase/redemption history | To be observed | Not run |

## Validation questions for the group

- Would a staff member understand the registration → purchase → points → redemption workflow?
- Does automating the calculation reduce manual loyalty reconciliation for the chosen business problem?
- Which proposed Part A integrations remain outside the small Part B implementation?
- Is local-only browser data sufficient for the classroom demonstration but unsuitable for operational use?

## Known limitations and future work

- No POS/e-commerce connectivity, cross-device synchronisation, data migration, authorisation or true customer identity verification.
- No refunds, negative adjustments, purchase cancellation, coupon generation, tier progression or marketing consent management.
- Seed customers have opening point balances without source transactions; displayed revenue only counts purchases recorded during this demo.
- Future phases would require a secured back end, access controls, audit logging, validated integration, user acceptance testing and actual client-approved loyalty rules.

## Group submission reminder

Use genuine screenshots and observed results in the 1,000–1,500 word implementation/evaluation evidence. Present achievements **and** limitations. Group members should review the code, make their own decisions and critically evaluate outcomes in accordance with course rules on AI-assisted work.