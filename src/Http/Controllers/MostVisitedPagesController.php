<?php

namespace Tightenco\NovaGoogleAnalytics\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;

class MostVisitedPagesController extends Controller
{
    public function __invoke(Request $request)
    {
        return $this->mostVisitedPages($request);
    }

    private function mostVisitedPages($request)
    {
        $duration = $request->has('duration')
            ? $request->input('duration')
            : 'week';

        switch($duration) {
            case 'week':
                $period = Period::days(7);
                break;
            case 'month':
                $period = Period::months(1);
                break;
            case 'year':
                $period = Period::years(1);
                break;
            default:
                $period = Period::days(7);
                break;
        }

        $analyticsData = app(Analytics::class)->performQuery(
            $period,
            'ga:users',
            [
                'metrics' => 'ga:pageviews',
                'dimensions' => 'ga:pageTitle,ga:hostname,ga:pagePath',
                'sort' => '-ga:pageviews',
                'max-results' => 10,
            ]
        );

        $headers = ['name', 'hostname', 'path', 'visits'];

        return array_map(
            function ($row) use ($headers) {
                return array_combine($headers, $row);
            },
            $analyticsData->rows ?? []
        );
    }
}
