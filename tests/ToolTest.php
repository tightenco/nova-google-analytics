<?php

namespace Tightenco\NovaGoogleAnalytics\Tests;

class ToolTest extends TestCase
{
    /** @test */
    public function it_can_return_a_response()
    {
        $this
            ->get('nova-vendor/tightenco/nova-google-analytics/pages')
            ->assertSuccessful()
            ->assertJsonStructure([
                'hasMore',
                'pages',
                'totalPages'
            ]);
    }

    /** @test */
    public function it_will_accept_limit_param()
    {
        $this
            ->get('nova-vendor/tightenco/nova-google-analytics/pages?limit=5')
            ->assertJsonCount(5, 'pages');
    }

    /** @test */
    public function it_will_accept_page_param()
    {
        $page1 = $this->get('nova-vendor/tightenco/nova-google-analytics/pages?page=1');
        $page2 = $this->get('nova-vendor/tightenco/nova-google-analytics/pages?page=2');

        $this->assertNotEquals($page1, $page2);
    }

    /** @test */
    public function it_will_accept_duration_param()
    {
        $this->get('nova-vendor/tightenco/nova-google-analytics/pages?duration=month')
            ->assertSuccessful();
    }

    /** @test */
    public function it_will_accept_search_param()
    {
        $this->get('nova-vendor/tightenco/nova-google-analytics/pages?s=blog')
            ->assertSuccessful();
    }

    /** @test */
    public function it_will_accept_sort_param()
    {
        $this->get('nova-vendor/tightenco/nova-google-analytics/pages?sortBy=ga:pageValue')
            ->assertSuccessful();
    }

    /** @test */
    public function it_will_accept_sort_direction_param()
    {
        $this->get('nova-vendor/tightenco/nova-google-analytics/pages?sortDirection=asc')
            ->assertSuccessful();
    }
}
