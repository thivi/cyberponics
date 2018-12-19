#!/usr/bin/python
# -*- coding: utf-8 -*-
import RPi.GPIO as gpio
import time as t


class distanceSensor:

    def __init__(
        self,
        trig,
        ech,
        emptyDist,
        ):

        self.trigger = trig
        self.echo = ech
        self.ed = emptyDist
        gpio.setmode(gpio.BCM)
        gpio.setup(self.trigger, gpio.OUT)
        gpio.setup(self.echo, gpio.IN, pull_up_down=gpio.PUD_DOWN)

    def callibrate(self):
        gpio.output(self.trigger, 0)
        t.sleep(0.000002)
        gpio.output(self.trigger, 1)
        t.sleep(0.000010)
        gpio.output(self.trigger, 0)

        while gpio.input(self.echo) == 0:
            pass
        start = t.time()

        while gpio.input(self.echo) == 1:
            pass
        stop = t.time()
        duration = stop - start
        distance = 340 * (duration / 2) * 100.0
        return distance

    def getDistance(self):
        gpio.output(self.trigger, 0)
        t.sleep(0.000002)
        gpio.output(self.trigger, 1)
        t.sleep(0.000010)
        gpio.output(self.trigger, 0)
        error = 0
        st = t.time()
        while gpio.input(self.echo) == 0:
            if t.time() - st >= 5:
                error = 1
                print("Timeout 1")
                break
        start = t.time()

        while gpio.input(self.echo) == 1:
            if t.time() - start >= 5:
                error = 1
                print("Timeout 2")
                break
        stop = t.time()

        duration = stop - start
        if error == 1:
            distance = 0
        else:
            distance = 340 * (duration / 2) * 100.0

        return self.ed - distance




			