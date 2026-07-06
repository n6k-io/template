import pandas as pd
from n6k_app import Database

db = Database()


@db.data()
def alpha():
    return pd.DataFrame({"a": [1, 2, 3], "b": [4, 5, 6]})


@db.data()
def beta():
    return pd.DataFrame({"a": [1.1, 2.2, 3.3], "b": [4.4, 5.5, 6.6]})
