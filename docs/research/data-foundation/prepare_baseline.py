"""Prepare aggregate N7 data from a reviewed public-report snapshot.

This script performs no network requests and processes no number plates.
Source clock labels remain local/unspecified until TII confirms the convention.
"""
import json
from collections import defaultdict
from pathlib import Path

RESEARCH = Path(__file__).resolve().parents[1]
SOURCE = RESEARCH / 'n7/tii-n7-1070-east-2026-09-28-to-2026-10-02-morning-source.json'
OUTPUT = Path(__file__).resolve().parent


def prepare():
    source = json.loads(SOURCE.read_text(encoding='utf-8'))
    rows = []
    keys = set()
    hourly = defaultdict(int)
    daily = []
    lookup = {}
    for report in source['reports']:
        matrix = report['interval_matrix']
        if len(matrix) != 48:
            raise ValueError('Expected 48 five-minute morning intervals per class')
        for index, values in enumerate(matrix):
            if len(values) != len(source['date_columns']):
                raise ValueError('Date columns and source values do not align')
            minute = 360 + index * 5
            start = f'{minute // 60:02d}:{minute % 60:02d}'
            end = f'{(minute + 5) // 60:02d}:{(minute + 5) % 60:02d}'
            for day_index, day in enumerate(source['date_columns']):
                count = values[day_index]
                if type(count) is not int or count < 0:
                    raise ValueError('Missing or invalid counts must not be converted to zero')
                key = (source['site_id'], day, start, 'East', report['class_label'])
                if key in keys:
                    raise ValueError(f'Duplicate interval: {key}')
                keys.add(key)
                lookup[(day, start, report['class_label'])] = count
                hourly[(day, start[:2], report['class_label'])] += count
                rows.append({
                    'site_id': source['site_id'], 'report_date': day,
                    'interval_start_clock': start, 'interval_end_clock': end,
                    'interval_minutes': 5, 'time_basis': 'source_clock_unconfirmed',
                    'direction': 'East', 'lane_scope': source['lane_scope'],
                    'vehicle_class': report['class_label'], 'reported_vehicle_count': count,
                    'quality_status': 'source_flags_unverified',
                    'source_url': report['source_url'], 'source_snapshot': SOURCE.name,
                    'observation_date': source['observation_date']
                })
        for day_index, day in enumerate(source['date_columns']):
            morning = sum(values[day_index] for values in matrix)
            full_day = report['source_reported_full_day_totals'][day_index]
            if morning > full_day:
                raise ValueError('Morning count exceeds source full-day total')
            daily.append({'date': day, 'class': report['class_label'],
                          'morning_06_to_10_count': morning,
                          'reported_00_to_24_count': full_day})
    for (day, start, cls), count in lookup.items():
        if cls == 'CAR' and count > lookup[(day, start, 'Any')]:
            raise ValueError('CAR exceeds the all-class count for the same interval')
    previous = json.loads((RESEARCH / 'n7/tii-n7-1070-east-2026-10-01-five-minute-counts.json').read_text(encoding='utf-8'))
    for report in previous['reports']:
        for item in report['counts']:
            if lookup[('2026-10-01', item['interval_start'], report['vehicle_class'])] != item['reported_count']:
                raise ValueError('New multi-day report conflicts with the earlier daily report')
    if len(rows) != 480:
        raise ValueError('Unexpected number of normalized rows')
    OUTPUT.mkdir(parents=True, exist_ok=True)
    (OUTPUT / 'n7-morning-intervals.jsonl').write_text(''.join(json.dumps(row) + '\n' for row in rows), encoding='utf-8')
    summary = {
        'schema_version': 1, 'site_id': source['site_id'], 'source_snapshot': SOURCE.name,
        'report_dates': source['date_columns'], 'interval_rows': len(rows),
        'window': '06:00 inclusive to 10:00 exclusive, source clock',
        'class_overlap_warning': 'Any includes CAR. Do not add these class series.',
        'daily': daily,
        'hourly': [{'date': day, 'hour_start': hour + ':00', 'class': cls, 'count': count}
                   for (day, hour, cls), count in sorted(hourly.items())],
        'readiness': 'exploratory_baseline_only',
        'unresolved': ['source quality flags', 'time-zone convention', 'lane and bottleneck mapping',
                       'multiweek/full-day interval coverage', 'reproducible unattended export',
                       'speed or journey-time outcomes', 'independent calibration of effective capacity'],
        'checks': {'unique_keys': len(keys), 'CAR_not_above_Any': True,
                   'October_1_matches_earlier_daily_report': True,
                   'morning_not_above_full_day': True}
    }
    (OUTPUT / 'baseline-summary.json').write_text(json.dumps(summary, indent=2), encoding='utf-8')
    print(json.dumps({'normalized_rows': len(rows), 'daily': daily, 'checks': summary['checks']}, indent=2))


if __name__ == '__main__':
    prepare()
