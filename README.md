# NorthStar Books — Customer Loyalty & CRM (functional prototype v2)

ICT923 Assessment 2 Part B: small functional demonstration for the NorthStar Books customer loyalty and relationship management business area.

## Run locally

Open `index.html` in a modern browser, or serve the folder using `python -m http.server 8000` and visit `http://localhost:8000`. No external dependencies, account, server, or installation required.

## What the prototype demonstrates

1. Register customers with basic required-field and duplicate-email checks.
2. Search customer records by name, email, or ID.
3. Record a purchase and award **10 points for each complete $1 equivalent spent** (integer points; e.g. $24.95 gives 249 points).
4. Redeem rewards only when the member has sufficient points, with a confirmation and balance deduction.
5. Preserve records in browser `localStorage`; update overview statistics and activity history.

The initial customers are **fictional demonstration records**. Transactions begin empty. The initial points balances are illustrative starting balances, not imported POS transactions.

## Demo script (approximately five minutes)

- Open **Customers** and register a fictional customer; try a duplicate email to demonstrate rejection.
- Open **Purchases**, select that customer, enter a book title and an amount such as $60; confirm that 600 points are credited.
- Open **Rewards**, select the customer and redeem the $5 voucher for 500 points; explain the new balance (100 points).
- Open **Overview** and **Activity log** to show updated figures and history.
- Refresh the page to demonstrate persistence.
- Use **Reset demo data** from Activity log when preparing for another run.

## Technical boundaries

This is a browser-only assessment prototype, **not** a production CRM. No back-end database, hosted API, POS integration, user authentication, encrypted-at-rest data or real voucher issuance exists. Browser storage can be cleared and is accessible to scripts running under the same origin; do not enter real customer information. Reward redemption is an internal ledger event only, not an issued coupon. Points award rules are a chosen demonstration assumption, not a verified NorthStar Books client policy.

## Testing

See [TESTING.md](TESTING.md) for reproducible verification checks. Actual results and final validation conclusions must be recorded by the student group after running the application. The project management plan specifies a broader system; this prototype deliberately isolates a manageable functional component.