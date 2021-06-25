<?php

namespace Tightenco\NovaGoogleAnalytics;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Laravel\Nova\Metrics\Trend;
use Laravel\Nova\Metrics\TrendResult;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;
use Carbon\Carbon;

class FourteenDayActiveUsersMetric extends Trend
{
    use ActiveUsersTrait;

    public function name()
    {
        return __('14 Day Active Users');
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
            5 => $this->performQuery('ga:14dayUsers', 5),
            10 => $this->performQuery('ga:14dayUsers', 10),
            15 => $this->performQuery('ga:14dayUsers', 15),
        ];

        $data = Arr::get($lookups, $request->get('range'), ['results' => [0]]);

        return (new TrendResult)->trend($data['results'])
            ->showLatestValue()
            ->format('0,0');
    }

    /**
     * Get the ranges available for the metric.
     *
     * @return array
     */
    public function ranges()
    {
        return [
            5 => '5 Days',
            10 => '10 Days',
            15 => '15 Days',
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
        return 'fourteen-day-active-users';
    }
}
