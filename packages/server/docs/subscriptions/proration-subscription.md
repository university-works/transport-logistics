# Proration && Subscription Summary

## Business Logic

The system recalculates the amount to be billed for ( next `subscription child items` ):

-   service items
-   line items
-   subscription orders

In case when new item was added or modified proration should be applied. All data for changes `subscription child items` should be saved with `effective date`. Proration changes should be displayed for current CALENDAR billing period.

Proration applies is next cases:

-   Price Group change
-   Manual price override
-   Change quantity/price/material/frequency
-   The subscription end date/start date has been changed

As a Billing supervisor I can get first cycle (month) billed price recalculated to the net number of days/jobs remaining in the cycle, so that I avoid customer complains about paying full monthly price for the incomplete initial billing cycle (month)

Proration summary should show the prorated amount for each changed recurrent service and/or recurrent line item in the subscription. The following attributes should be displayed in the Proration summary:

-   Show date range when the proration occurs:

    -   [Effective Date - End Date of the billing period] or End Date of subscription if it’s earlier than the billing period end date

-   Display proration calculations based on one of the formulae:

    -   If by the number of usage days:
        [Recurrent Service/Recurrent Line Item]: ([Total Service Price]/[Number of days in the billing cycle]) [Number of usage days] = [Total prorated amount]

    -   If by the number of performed services:
        [Recurrent Service/Recurrent Line Item]: ([Total Service Price]/ [Number of services in the billing cycle]) [Number of actually provided services] = [Total prorated amount]

### For more information you can read

-   https://starlightpro.atlassian.net/browse/HAULING-2352
-   https://starlightpro.atlassian.net/browse/HAULING-1362
-   https://starlightpro.atlassian.net/browse/HAULING-1346
-   https://starlightpro.atlassian.net/browse/HAULING-1345
-   https://starlightpro.atlassian.net/browse/HAULING-1356

## Implementation

-   To get all information described above we should run next `subscription` method `recalculateSubscriptionSummaryProration`.

-   To get all information about `subscription child items` use `getHistoryRecordForProration` of `SubscriptionServiceItemRepo`
    We should connect this information with info that was given from Client.
    As was written above we should use ONLY CALENDAR dates, to get them `getСurrentBillingPeriodStartDate` was written.
    Main method that calculate all proration info or subscription summary is `recalculateSubscriptionSummary` also use for invoicing.

### recalculateSubscriptionSummary

Here we can cat all information that we need per billing period.
To get info about each service items we use serviceItemsTotalAmountCalc.

### serviceItemsTotalAmountCalc

There are two possible `prorationType` `usageDays` and `servicesPerformed`, so logical per each is different. To calculate for `usageDays` we use `usageDaysCalc` and `servicesPerformedTotalAmount` for `servicesPerformed`.

### usageDaysCalc

First of all we should work only with sorted by `effective date` service items and line items. All information about subscription orders are included in service items, where subscription order `effective date` is between `from` `since` dates.

Secondly we should get applicability.
Then we should work with current service item and next service item in our loop ( due to multi changes per service in ONE billing period )

### servicesPerformedTotalAmount

Same logic but we use `countCertainDays` to get all days in billing period

### mapSubscriptionProration

Method use only to get summary per line items/service item and grand total for Client and convert proration info per periods.
