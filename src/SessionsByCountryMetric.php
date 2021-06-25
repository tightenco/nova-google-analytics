<?php

namespace Tightenco\NovaGoogleAnalytics;

use Illuminate\Http\Request;
use Laravel\Nova\Metrics\Partition;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;

class SessionsByCountryMetric extends Partition
{
    public function name()
    {
        return __('Sessions by Country - Top 5');
    }

    /**
     * Calculate the value of the metric.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function calculate(Request $request)
    {
        $analyticsData = app(Analytics::class)
            ->performQuery(
                Period::months(1),
                'ga:sessions',
                [
                    'metrics' => 'ga:sessions',
                    'dimensions' => 'ga:country',
                    'sort' => '-ga:sessions',
                    'max-results' => 5,
                ],
            );

        $rows = collect($analyticsData->getRows());

        $results = [];
        foreach ($rows as $row) {
            $results[$row[0]] = $row[1];
        }

        return $this->result($results);
    }

    /**
     * Determine for how many minutes the metric should be cached.
     *
     * @return  \DateTimeInterface|\DateInterval|float|int
     */
    public function cacheFor()
    {
        return now()->addMinutes(30);
    }

    /**
     * Get the URI key for the metric.
     *
     * @return string
     */
    public function uriKey()
    {
        return 'sessions-by-country';
    }
}
