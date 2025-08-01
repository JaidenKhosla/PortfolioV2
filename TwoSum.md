# Blog Post 1
This is the code for the Two Sum Approach in Python:

```
python TwoSum.py
def two_sum(arr: list[int] target: int) -> list[int]:
    locations = {}
    <br>
    for idx, num in enumerate(arr):
        comp = locations.get(target-num, None)
        if comp:
            return [idx, comp]

        comp[num] = idx

    return []
```

Please feel free to contact me if you have any questions.