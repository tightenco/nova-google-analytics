<?php

namespace Tightenco\NovaGoogleAnalytics;

use Laravel\Nova\ResourceTool;

class StatsPerPage extends ResourceTool
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Pass path to resource tool.
     *
     * @return $this
     */
    public function path($path)
    {
        return $this->withMeta(['path' => $path]);
    }

    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return 'Stats per page';
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'stats-per-page';
    }
}
