from operator import index
import random
from re import I, S
from typing import Iterable

from fastapi import FastAPI
from fastapi.background import P
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class InfinitIterator:
    
    def __init__(self, iter) -> None:
        self.index = 0
        self.sequence = iter


    def __next__(self):
        self.index = (self.index + 1) % len(self.sequence)
        return self.sequence[self.index]


BadPressureIterator = InfinitIterator([16.16, 16.16, 12.32, 15.2, 10.4, 12, 9.76])
PressureIterator = InfinitIterator([16 + random.random()-0.5 for _ in range(7)])


@app.get("/pressure")
async def pressure():
    # return random pressure float value between 4 and 20 in mA
    return {"pressure": next(PressureIterator)}


@app.get("/oxygen")
async def oxygen():
    return {"oxygen": 8}
