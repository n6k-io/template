import pandas as pd
from n6k_app import Database

db = Database()


@db.data()
def orders() -> pd.DataFrame:
    return pd.read_parquet("orders.parquet")


@orders.derive()
def revenue_by_month(df: pd.DataFrame) -> pd.DataFrame:
    return (
        df.assign(month=df.order_date.dt.strftime("%Y-%m"))
        .groupby(["month", "category"], as_index=False)
        .agg(revenue=("amount", "sum"), orders=("amount", "count"))
    )
