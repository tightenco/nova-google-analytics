# Google Analytics integration with Nova

[![Latest Version on Packagist](https://img.shields.io/packagist/v/tightenco/nova-google-analytics.svg?style=flat-square)](https://packagist.org/packages/tightenco/nova-google-analytics)
[![Total Downloads](https://img.shields.io/packagist/dt/tightenco/nova-google-analytics.svg?style=flat-square)](https://packagist.org/packages/tightenco/nova-google-analytics)

![image](https://user-images.githubusercontent.com/151829/44671717-4a644600-a9f4-11e8-8505-b99e9b9ed65a.png)

<img src="https://user-images.githubusercontent.com/151829/44892455-defbcc00-acb2-11e8-9236-cbc04f1a29eb.png" width="465">

JUST GETTING STARTED.

Plans:

- Analytics tool
- Individual cards for each of the useful analytics data points
- Resource tools (e.g. analytics on each page)
- Maybe actions for events?
- Other great stuff I hope :)

## Installation

You can install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require tightenco/nova-google-analytics
```

Under the hood this package uses Spatie's Laravel Google Analytics package. Follow the instructions on [Spatie's Laravel Google Analytics package](https://github.com/spatie/laravel-analytics) for getting your credentials, then put them here:

```
yourapp/storage/app/analytics/service-account-credentials.json
```

Also add this to the `.env` for your Nova app:

```ini
ANALYTICS_VIEW_ID=
```

## Usage

Register the card with Nova. This is typically done in the `cards` method of the `NovaServiceProvider`.

```php
// in app/Providers/NovaServiceProvider.php

// ...

public function cards()
{
    return [
        // ...
        new \Tightenco\NovaGoogleAnalytics\PageViewsMetric,
        new \Tightenco\NovaGoogleAnalytics\VisitorsMetric,
        new \Tightenco\NovaGoogleAnalytics\MostVisitedPagesCard,
    ];
}
```

#### Stats for a single resource

![Preview](https://i.imgur.com/XpLe1g1.png)

To enable stats for a specific model, you'll need to add the tool to that model's Nova resource. Make sure to specify the class name so the resource tool can load it properly. 

Replace `_PATH_` with appropriate path for your model

```
use Tightenco\NovaGoogleAnalytics\StatsPerPage;

// ...

public function fields()
{
    return [
        StatsPerPage::make()->path(_PATH_),
        
        // ...
    ];
}
```
**Example:** If your url scheme looks like `'https://domain.com/posts/123/post-slug'` provided path should be `'/posts/123/post-slug'`
## Security

If you discover any security related issues, please email matt@tighten.co instead of using the issue tracker.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
