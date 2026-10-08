# ICT923 Assessment 2 Part B — verification record
**Project:** NorthStar Books Customer Loyalty & CRM  
**Functional component:** customer registration → book purchase → automatic loyalty points → reward redemption → dashboard and browser-local persistence  
**Evidence source:** screenshots of the app running in Microsoft Edge supplied by the group in the ChatGPT conversation on 8 October 2026. The screenshots are not yet stored in this GitHub repository. See the accompanying Word report for the numbered screenshots.

## Manual verification against selected acceptance criteria

| ID | Requirement | Test performed | Expected result | Observed result in supplied screenshots | Outcome |
| --- | --- | --- | --- | --- | --- |
| R1 | Register and search unique customer profiles; reject duplicate email | Register Test Customer One, then attempt Test Customer Two with the same email | New customer stored with zero points; duplicate refused | Customer NS003 shown with 0 points; duplicate attempt reports "A customer with that email already exists." | **Pass** |
| R2 | Link a purchase to a customer and automatically award one point per whole AUD | Record *The Midnight Library* for NS003 at AUD 25.90 | TX0001 created and 25 points added; purchase count becomes 1 | Transaction TX0001 shown with +25 points; NS003 balance 25 and purchases 1 | **Pass** |
| R3 | Prevent ineligible redemptions; deduct the correct points after eligible redemption | At 25 points inspect rewards; record second book purchase at AUD 500.00; redeem 500-point $5 voucher | Redemption unavailable at 25, enabled at 525; 500 deducted leaving 25 | Disabled redemption at 25; TX0002 awarded 500; eligible button at 525; RD0001 confirmation and new balance 25 | **Pass** |
| R4 | Reflect transactions in dashboard and activity log | Inspect overview and event history following R1–R3 | 3 customers, 825 points outstanding, AUD 525.90 recorded purchases, 1 redemption; 4 activity entries | All four dashboard metrics match; event history shows registration, two purchases and redemption | **Pass** |
| R5 | Retain browser demo records after page refresh | Reload page in same browser, then revisit Customers and Activity log | Previously recorded customers, balances and events preserved | After refresh, overview still shows 3 / 825 / AUD 525.90 / 1, NS003 retains 25 points and 2 purchases, and 4 events remain visible | **Pass** |

**Arithmetic reconciliation:** seeded balances 650 + 150 = 800; new customer earns 25 + 500, then redeems 500, leaving 25; total outstanding = 650 + 150 + 25 = **825**. Demonstration purchases AUD 25.90 + AUD 500.00 = **AUD 525.90**.

## Figure index for supplied screenshots
1. R1: confirmation that NS003 was registered.
2. R1: duplicate-email rejection.
3. R2: TX0001 and +25 points in Purchase history.
4. R2: NS003 shows 25 points and 1 purchase.
5. R3: at 25 points all redemption buttons disabled.
6. R3: TX0002 and +500 points.
7. R3: 525 available points and $5 voucher enabled.
8. R3: RD0001 completed, remaining 25 points.
9. R4: overview dashboard statistics.
10. R4: activity log with four events.
11. R5: overview retained after browser refresh.
12. R5: NS003 retains 25 points and 2 purchases.
13. R5: activity log retained after browser refresh.

## Verification versus validation
The five **verification** tests above passed for the observed single-browser demo cases. They do **not** demonstrate production readiness, scalability, full security, real POS integration or a central customer database. **Validation** requires the group's own reasoned assessment that the workflow is appropriate for NorthStar Books staff and the business problem identified in the original PMP. No real client acceptance, independent stakeholder interview or formal usability study has been evidenced.

## Limitations and evaluation
- Client-side JavaScript and localStorage, not a protected, shared backend. Demo data are specific to the browser/profile and may be removed if site data are cleared.
- "Staff Admin" is a display label, not a login or authenticated role. Implementing actual login and access control is future work.
- Purchases are simulated, not payments or actual NorthStar Books POS/e-commerce transactions.
- Reward redemption deducts points and records a demo event; it does not issue a real voucher.
- Membership tier and point rules are prototype assumptions requiring client confirmation.

## Jira and individual contributions — pending independent evidence
Assessment 2 Part B also requires real Jira evidence and a member contribution declaration. The Jira-looking planning image in the earlier Word draft is **illustrative**, not proof of an actual Jira board, issue assignments or completion. Replace it only with genuine screenshots/export from the group's original Jira workspace. Confirm the tasks actually done by **Asim Khatiwada, Bhagwan Puri and Ryan Shrestha** before finalising responsibility statements.

## Source files
- `index.html`: navigation, input forms and semantic presentation elements
- `style.css`: desktop/mobile layout and visual design
- `script.js`: data model, validation, purchasing, point calculation, redemption, history and browser persistence
- `README.md`: scope, run instructions and demonstration sequence

## Academic integrity
The assessment brief permits AI as a support tool but requires group judgement, critical evaluation and an appropriate declaration of AI support. Review the submitted code, testing record and conclusions as a group before submission.
