#!/bin/bash

for f in Exercice-31 Exercice-32 Exercice-33 Conway; do
    NBERR=$(grep -e "  error" "$f"_report.txt | wc -l)
    NBWARN=$(grep -e "  warning" "$f"_report.txt | wc -l)
    color="green"

    if [[ $NBERR > 0 ]]; then
        color="red"
    else
        if [[ $NBWARN > 0 ]]; then
            color="orange"
        fi
    fi

    anybadge -o -l "$f" -v "$NBERR $NBWARN" -c "$color" -f "$f"_lint.svg
done
