<?php

namespace Tightenco\NovaGoogleAnalytics\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Tightenco\NovaGoogleAnalytics\File;
use Illuminate\Routing\Controller;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;

class GoogleAnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->input('limit', 10);
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $limit;
        $duration = $request->input('duration', 'week');
        $searchTerm = $request->input('s', null);
        $sortBy = $request->input('sortBy', 'ga:pageviews');
        $sortDirection = $request->input('sortDirection', 'desc');
        $filter = is_null($searchTerm) ? null : 'ga:pageTitle=@' . $searchTerm . ',ga:pagePath=@' . $searchTerm;
        $period = $this->periodForDuration($duration);

        $analyticsData = app(Analytics::class)->performQuery(
            $period,
            'ga:users',
            [
                'metrics' => 'ga:pageviews,ga:uniquePageviews,ga:avgTimeOnPage,ga:entrances,ga:bounceRate,ga:exitRate,ga:pageValue',
                'dimensions' => 'ga:pageTitle,ga:pagePath',
                'sort' => ($sortDirection == 'desc' ? '-' : '').$sortBy,
                'filters' => $filter,
            ]
        );

        $headers = ['name', 'path', 'visits', 'unique_visits', 'avg_page_time', 'entrances', 'bounce_rate', 'exit_rate', 'page_value'];

        $pages = $this->getPages($headers, $analyticsData->rows, $offset, $limit);

        return [
            'pages' => $pages,
            'totalPages' => ceil(count($analyticsData->rows)/$limit),
            'hasMore' => ($offset+$limit) < count($analyticsData->rows)
        ];
    }

    private function getPages($headers, $rows, $offset, $limit): array
    {
        return array_map(
                function ($row) use ($headers) {
                    return array_combine($headers, $row);
                },
                array_slice($rows, $offset, $limit) ?? []);
    }

    private function periodForDuration(string $duration): Period
    {
        $map = [
            'week' => Period::days(7),
            'month' => Period::months(1),
            'year' => Period::years(1),
        ];
        return Arr::get($map, $duration, Period::days(7));
    }

}
