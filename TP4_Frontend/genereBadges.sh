#!/bin/bash

NBERR=$(grep -e "  error" js_report.txt | wc -l)
NBWARN=$(grep -e "  warning" js_report.txt | wc -l)
color="green"

if [[ $NBERR > 0 ]]; then
    color="red"
else
    if [[ $NBWARN > 0 ]]; then
        color="orange"
    fi
fi

curl -o badge_lint.svg "https://img.shields.io/badge/lint--js-$NBERR%20errors,%20$NBWARN%20warnings-$color"

if grep -q -e "All specs passed!" test_report.txt; then
    res="PASSED"
    color="green"
else
    res="FAILED"
    color="red"
fi

curl -o badge_test.svg "https://img.shields.io/badge/jobcypress-$res-$color"
