from n6k_app.frontend import Components, page

from .data import revenue_by_month


@page
def sales(c: Components) -> None:
    c.h1("Sales")
    c.p("Revenue and order volume by month. Pick a category to drill in.")

    category = c.Select(
        key="category",
        label="Category",
        options=["Hardware", "Software", "Services"],
        empty="All",
    )

    c.Metric(
        label="Revenue",
        data=revenue_by_month,
        value="sum(revenue)",
        valueFormat="$,.0f",
        filters={"category": category},
    )
    c.Metric(label="Orders", data=revenue_by_month, value="sum(orders)", filters={"category": category})
    c.LineChart(data=revenue_by_month, x="month", y="sum(revenue)", filters={"category": category})
