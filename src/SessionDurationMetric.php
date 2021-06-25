<?php


namespace Tightenco\NovaGoogleAnalytics;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Laravel\Nova\Metrics\Value;
use Laravel\Nova\Metrics\ValueResult;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;

class SessionDurationMetric extends Value
{
    public function name()
    {
        return __('Avg. Session Duration');
    }

    /**
     * Calculate the value of the metric.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function calculate(Request $request)
    {
        $lookups = [
            1 => $this->sessionDurationOneDay(),
            'MTD' => $this->sessionDurationOneMonth(),
            'YTD' => $this->sessionDurationOneYear(),
        ];

        $data = Arr::get($lookups, $request->get('range'), ['result' => 0, 'previous' => 0]);

        return (new ValueResult($data['result']))->previous($data['previous'])->format('00:00:00');
    }

    private function sessionDurationOneDay()
    {
        $analyticsData = app(Analytics::class)
            ->performQuery(
                Period::days(1),
                'ga:avgSessionDuration',
                [
                    'metrics' => 'ga:avgSessionDuration',
                    'dimensions' => 'ga:date',
                ]
            );

        $results = collect($analyticsData->getRows());

        return [
            'result' => $results->last()[1] ?? 0,
            'previous' => $results->first()[1] ?? 0,
        ];
    }

    private function sessionDurationOneMonth()
    {
        $currentAnalyticsData = app(Analytics::class)->performQuery(
            Period::create(Carbon::today()->startOfMonth(), Carbon::today()),
            'ga:avgSessionDuration',
            [
                'metrics' => 'ga:avgSessionDuration',
                'dimensions' => 'ga:yearMonth',
            ]
        );

        $currentResults = collect($currentAnalyticsData->getRows());

        $lastMonth = Carbon::today()->startOfMonth()->subMonths(1);
        $previousAnalyticsData = app(Analytics::class)->performQuery(
            Period::create($lastMonth->startOfMonth(), $lastMonth->endOfMonth()),
            'ga:avgSessionDuration',
            [
                'metrics' => 'ga:avgSessionDuration',
                'dimensions' => 'ga:yearMonth',
            ]
        );

        $previousResults = collect($previousAnalyticsData->getRows());

        return [
            'previous' => $previousResults->last()[1] ?? 0,
            'result' => $currentResults->last()[1] ?? 0,
        ];
    }

    private function sessionDurationOneYear()
    {
        $currentAnalyticsData = app(Analytics::class)->performQuery(
            Period::create(Carbon::today()->startOfYear(), Carbon::today()),
            'ga:avgSessionDuration',
            [
                'metrics' => 'ga:avgSessionDuration',
                'dimensions' => 'ga:year',
            ]
        );

        $currentResults = collect($currentAnalyticsData->getRows());

        $lastYear = Carbon::today()->startOfYear()->subYears(1);
        $previousAnalyticsData = app(Analytics::class)->performQuery(
            Period::create($lastYear->startOfYear(), $lastYear->endOfYear()),
            'ga:avgSessionDuration',
            [
                'metrics' => 'ga:avgSessionDuration',
                'dimensions' => 'ga:year',
            ]
        );

        $previousResults = collect($previousAnalyticsData->getRows());

        return [
            'previous' => $previousResults->last()[1] ?? 0,
            'result' => $currentResults->last()[1] ?? 0,
        ];
    }

    /**
     * Get the ranges available for the metric.
     *
     * @return array
     */
    public function ranges()
    {
        return [
            1 => __('Today'),
            'MTD' => __('Month To Date'),
            // 60 => '60 Days',
            'YTD' => __('Year To Date'),
            // 'MTD' => 'Month To Date',
            // 'QTD' => 'Quarter To Date',
            // 'YTD' => 'Year To Date',
        ];
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
        return 'session-duration';
    }
}
