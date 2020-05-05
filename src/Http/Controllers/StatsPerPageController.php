<?php

namespace Tightenco\NovaGoogleAnalytics\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;

class StatsPerPageController extends Controller
{
    protected $days = 7;
    protected $path = '';

    public function __invoke(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'path' => [
                    'not_regex:/^(www|http).*/i',
                    'regex:/^\/\w.*/i'
                ]
            ],
            [
                'path.not_regex' => 'Path must not contain a website domain.',
                'path.regex' => 'Path must start with a leading slash.',
            ]
        );

        if ($validator->fails()) {
            return response(['status' => 'error', 'message' => $validator->errors()->first('path')], 500);
        }

        $this->days = $request->input('days', 7);
        $this->path = $request->input('path');

        return $this->getStats();
    }

    private function getStats()
    {
        try {
            $analyticsData = app(Analytics::class)->performQuery(
                Period::days($this->days),
                'ga:users',
                [
                    'metrics' => 'ga:pageviews',
                    'dimensions' => 'ga:date',
                    'sort' => 'ga:date',
                    'max-results' => $this->days,
                    'filters' => 'ga:pagePath=='.$this->path,
                    'fields' => 'rows,totalsForAllResults'
                ]
            );
        } catch (\Exception $e) {
            return response(['status' => 'error', 'message' => $e->getMessage()], 501);
        }

        $headersPartials = ['date', 'pageviews'];
        $headersTotal = ['pageviews'];
        $response = [];

        $response['partials'] = array_map(
            function ($row) use ($headersPartials) {
                return array_combine($headersPartials, $row);
            },
            $analyticsData->rows ?? []
        );

        $response['total'] = array_combine($headersTotal, $analyticsData->totalsForAllResults ?? []);

        return $response;
    }
}
