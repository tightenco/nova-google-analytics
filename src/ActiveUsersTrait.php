<?php

namespace Tightenco\NovaGoogleAnalytics;

use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;
use Carbon\Carbon;

trait ActiveUsersTrait
{
    private function performQuery($metric, $days)
    {
        $analyticsData = app(Analytics::class)
            ->performQuery(
                Period::days($days),
                $metric,
                [
                    'metrics' => $metric,
                    'dimensions' => 'ga:date',
                ]
            );

        $results = collect($analyticsData->getRows())->mapWithKeys(function ($row) {
            return [
                (new Carbon($row[0]))->format('M j') => intval($row[1])
            ];
        });

        return ['results' => $results->toArray()];
    }
}
