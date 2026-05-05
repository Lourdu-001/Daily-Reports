{{-- resources/views/components/banner.blade.php --}}
<section class="banner-section">
    <div class="banner-container">

        <h1 class="banner-title">{{ $title }}</h1>
        <p class="banner-description">{{ $description }}</p>

        <a href="{{ $ctaLink }}" class="banner-cta">
            {{ $ctaText }}
        </a>
    </div>
</section>