<?php

namespace Tightenco\NovaGoogleAnalytics\Tests;

use Tightenco\NovaGoogleAnalytics\SessionDurationMetric;

class SessionDurationMetricTest extends TestCase
{
    /** @test */
    public function it_can_return_results_for_one_day()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => '1']));
        $this->assertFalse(empty($response));
    }

    /** @test */
    public function one_day_results_contain_previous()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => '1']));
        $this->assertObjectHasAttribute('previous', $response);
    }

    /** @test */
    public function one_day_results_contain_value()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => '1']));
        $this->assertObjectHasAttribute('value', $response);
    }

    /** @test */
    public function it_can_return_results_mtd()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => 'MTD']));
        $this->assertFalse(empty($response));
    }

    /** @test */
    public function mtd_results_contain_previous()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => 'MTD']));
        $this->assertObjectHasAttribute('previous', $response);
    }

    /** @test */
    public function mtd_results_contain_value()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => 'MTD']));
        $this->assertObjectHasAttribute('value', $response);
    }

    /** @test */
    public function it_can_return_results_ytd()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => 'YTD']));
        $this->assertFalse(empty($response));
    }

    /** @test */
    public function ytd_results_contain_previous()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => 'YTD']));
        $this->assertObjectHasAttribute('previous', $response);
    }

    /** @test */
    public function ytd_results_contain_value()
    {
        $response = (new SessionDurationMetric)->calculate($this->requestWithQueryParams(['range' => 'YTD']));
        $this->assertObjectHasAttribute('value', $response);
    }
}
