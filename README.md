![image](https://repository-images.githubusercontent.com/145988439/fe2db000-7296-11eb-85c9-0c4d22f99125)

# Google Analytics Integration with Nova

[![Latest Version on Packagist](https://img.shields.io/packagist/v/tightenco/nova-google-analytics.svg?style=flat-square)](https://packagist.org/packages/tightenco/nova-google-analytics)
[![Total Downloads](https://img.shields.io/packagist/dt/tightenco/nova-google-analytics.svg?style=flat-square)](https://packagist.org/packages/tightenco/nova-google-analytics)
![Build Status](https://github.com/tighten/nova-google-analytics/actions/workflows/run-tests.yml/badge.svg)

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

For now, follow the directions on [Spatie's Laravel Google Analytics package](https://github.com/spatie/laravel-analytics) for getting your credentials, then put them here:

```
yourapp/storage/app/analytics/service-account-credentials.json
```

Also add this to the `.env` for your Nova app:

```ini
ANALYTICS_VIEW_ID=
```

## Usage
You must register the cards you want to display with Nova. This is typically done in the `cards` method of the `NovaServiceProvider`.

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
        new \Tightenco\NovaGoogleAnalytics\ReferrersList,
        new \Tightenco\NovaGoogleAnalytics\OneDayActiveUsersMetric,
        new \Tightenco\NovaGoogleAnalytics\SevenDayActiveUsersMetric,
        new \Tightenco\NovaGoogleAnalytics\FourteenDayActiveUsersMetric,
        new \Tightenco\NovaGoogleAnalytics\TwentyEightDayActiveUsersMetric,
        new \Tightenco\NovaGoogleAnalytics\SessionsByDeviceMetric,
        new \Tightenco\NovaGoogleAnalytics\SessionsByCountryMetric,
    ];
}
```

## Features
#### View the Visitors and Pageview Metrics
![image](https://user-images.githubusercontent.com/7070136/114229277-982fe180-9945-11eb-9c4c-ca9bc1554fca.png)

#### View the Active Users Metrics
![image](https://user-images.githubusercontent.com/7070136/122437531-cc3c0a00-cf67-11eb-883b-6fdb56122142.png)
![image](https://user-images.githubusercontent.com/7070136/122437540-ce05cd80-cf67-11eb-8bc9-775a13db068e.png)

#### View the Devices and Country Metrics by Session
![image](https://user-images.githubusercontent.com/7070136/122282967-08b12c80-ceba-11eb-91bd-52234236310d.png)

#### View the lists of Most Visited Pages and Referrers
![image](https://user-images.githubusercontent.com/7070136/114229279-982fe180-9945-11eb-9ee9-e38215ce5eae.png)

## Testing
First, copy your .env.example file to a new file called .env.testing:
```
cp .env.example .env.testing
```
Make sure, in that file, to define the following variables to run all tests:

```
ANALYTICS_VIEW_ID
ANALYTICS_PROJECT_ID
ANALYTICS_PRIVATE_KEY_ID
ANALYTICS_PRIVATE_KEY
ANALYTICS_CLIENT_EMAIL_KEY
ANALYTICS_CLIENT_ID
ANALYTICS_CLIENT_CERT_URL
```

Add the `.env.testing` file in `.gitignore` so you can safely use the same analytics view ID to run the tests that you use for the card.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please email matt@tighten.co instead of using the issue tracker.

## Credits

- [Matt Stauffer](https://github.com/mattstauffer)
- [Kristin Collins](https://github.com/krievley)
- [All Contributors](https://github.com/tighten/nova-google-analytics/graphs/contributors)

## Support us

Tighten is a web development firm that works in Laravel, Vue, and React. You can learn more about us on our [web site](https://tighten.co/)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
