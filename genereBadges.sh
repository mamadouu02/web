#!/bin/sh

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

anybadge -o -l "lint-js" -v "$NBERR $NBWARN" -c "$color" -f "badge_lint.svg"
