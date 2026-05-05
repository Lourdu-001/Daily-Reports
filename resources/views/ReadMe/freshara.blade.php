<?php
    $data = [
        ["title" => "Education Support", "content" => "Empowering young minds with access to essential learning resources.", "pic" => "/assets/images/difference1.webp"],
        ["title" => "Community Welfare", "content" => "Supporting families and strengthening local communities.", "pic" => "/assets/images/difference2.webp"],
        ["title" => "Healthcare & Inclusion", "content" => "Promoting well-being and supporting vulnerable groups.", "pic" => "/assets/images/difference3.webp"],
        ["title" => "National Responsibility", "content" => "Empowering young minds with access to essential learning resources.", "pic" => "/assets/images/difference4.webp"],
    ];

    $initiatives = [
        ["title" => "Flag Day Contributions", "content" => "<p class='pb-8'>The Company supported Flag Day initiatives as part of its commitment to national welfare and social responsibility. Through these contributions, the Company aims to extend its support towards programs that benefit members of the armed forces and their families, as well as other community-focused welfare activities. </p><p>This initiative reflects the Company’s respect for national causes and its continued effort to contribute towards the larger societal good.
</p>", "img" => "/assets/images/initiatives1.webp" ],
        ["title" => "Distribution of School Bags", "content" => "<p>In line with its focus on promoting education and empowering young minds, the Company undertook a school bag distribution drive for students from underprivileged backgrounds.</p><p>By providing essential educational materials, the Company seeks to support students in their academic journey and encourage regular school attendance. This initiative is aimed at reducing barriers to education and fostering a positive learning environment for children.
</p>", "img" => "/assets/images/initiatives2.webp" ],
        ["title" => "Distribution of Ration Kits", "content" => "<p>To support families in need, we carried out a ration kit distribution initiative focused on ensuring access to essential food supplies.</p><p>This effort helps ease the challenges faced by economically weaker communities and promotes overall well-being.
</p>", "img" => "/assets/images/initiatives3.webp" ],
        ["title" => "Contribution to Schizophrenia Research Foundation (SCARF)", "content" => "<p>We have extended our support to the Schizophrenia Research Foundation (SCARF), a non-profit organization dedicated to mental health care and rehabilitation. Recognized as a collaborating centre of the World Health Organization (WHO), SCARF plays a vital role in advancing mental health research and support systems.</p><p>Through this initiative, we contribute towards improving access to mental healthcare, promoting inclusivity, and supporting innovative programs for individuals in need.
</p>", "img" => "/assets/images/initiatives4.webp" ],
    ]

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Freshara</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/nav.css') }}">
     
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
     <?php require_once base_path('resources/views/components/nav.php'); ?>
    <!-- Hero section -->
    <section class="pb-[4.2rem] flex md:flex-row flex-col items-end bg-cover md:h-[669px] bg-[url('/assets/images/home-banner.webp')]">
        <div class="md:max-w-[1162px] mx-auto flex md:flex-row flex-col md:px-0 px-8 md:pt-0 pt-15 md:gap-0 gap-10">
            <div class="flex-1">
                <h1 class="">Creating Impact Beyond<br> Business</h1>
                <div class="text pt-3 pb-[1.5rem] md:w-[80%]">At Freshara Agro Exports Limited, we believe true growth is measured by the positive impact we create in the communities around us. Our commitment goes beyond business — towards building a better, more inclusive future.</div>
                <div>
                    <button class="px-6 py-2 rounded-[20px] bg-[#28511C] ctaText flex flex-row items-center gap-1">
                        Join with us
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2054_2289)">
                            <path d="M2.98535 8.95808L6.93745 5.00599L2.98535 1.05389" stroke="#FAFAFA" stroke-opacity="0.933333" stroke-width="1.58084" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2054_2289">
                            <rect width="10.5389" height="10.5389" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="px-10 py-8 self-end flex-none md:w-[32.8%] bg-white/10 rounded-[9.26px] border border-[#FFFFFF] flex md:flex-row flex-col items-center gap-1">
                <div class="md:w-[100px]" >
                    <img src="{{ asset('assets/images/community.webp') }}" width="57.56px" height="" alt="community" />
                </div>
                <div class="flex-1 md:pt-0 pt-4">
                    <div class="md:pb-[1rem] pb-[2rem] text-[46.29px] leading-[35px] text-white font-bold md:text-start text-center">50+</div>
                    <div class="text-[19.37px] text-white tracking-[-0.03em] md:text-start text-center">Steps Towards Stronger Communities.</div>
                </div>
            </div>
        </div>
    </section>
    <section class="pt-[6.6rem] pb-[4rem]">
        <div class="max-w-[1100px] mx-auto flex md:flex-row flex-col items-center md:gap-[6rem] gap-[3rem] md:px-0 px-8">
            <div class="flex-none md:w-[40%]">
                <img src="{{ asset('assets/images/group.webp')}}" width="100%" height="100%" alt="group of people" />
            </div>
            <div class="flex-1">
                <div class="h2 pb-2"><span class="text-black">Our</span> Responsibility</div>
                <div>
                    <p class="text18">At <span class="font-[800]">Freshara Agro Exports Limited</span>, Corporate Social Responsibility is a core element of our philosophy of responsible business. We are committed to contributing towards the social and economic development of the communities we operate in by undertaking initiatives that promote education, community welfare, and inclusive growth. </p>
                    <p class="text18 pt-8">Our CSR efforts are guided by the objective of creating sustainable value and making a meaningful difference in the lives of people.</p>
                </div>
            </div>
        </div>
    </section>
    <section class="py-[4rem]">
        <div class="max-w-[1215px] mx-auto md:px-4 px-8">
            <div class="flex md:flex-row flex-col md:items-center items-start justify-between md:gap-0 gap-5">
                <div class="h2 !text-[black]">
                    Where We Make a Difference
                </div>
                <div>
                    <button class="px-6 py-2 rounded-[7.41px] bg-[#28511C] ctaText flex md:flex-row flex-col items-center gap-1">
                        Explore Our Initiatives
                    </button>
                </div>
            </div>
             <!-- Cards -->
            <div class="flex md:flex-row flex-col gap-5 mt-10">

                <?php foreach($data as $index => $item): ?>

                    <?php if($index % 2 == 0): ?>
                        <!-- EVEN: text top, image bottom, white bg -->
                        <div class="flex-1 flex flex-col justify-between border border-[#0000001F] rounded-[33.52px] px-4 pt-5 bg-white overflow-hidden">

                            <!-- Text top -->
                            <div class="mb-4 flex flex-row">
                                <div>
                                    <div class="text20 !font-[600]"><?php echo $item['title']; ?></div>
                                    <p class="text-[12.96px] font-[400] mt-2 text-black"><?php echo $item['content']; ?></p>
                                </div>
                                <div class="flex-none flex items-start justify-between">
                                    <img src="/assets/images/arrow.webp" width="35.96px" height="" alt="arrow">
                                </div>
                            </div>

                            <!-- Image bottom -->
                            <div class="w-full overflow-hidden px-4 mt-[2rem]">
                                <img src="<?php echo $item['pic']; ?>" alt="<?php echo $item['title']; ?>" class="overflow-hidden w-full h-[238px] object-cover rounded-t-[10px]" />
                            </div>
                        </div>

                    <?php else: ?>
                        <!-- ODD: image top, text bottom, green bg -->
                        <div class="flex-1 flex flex-col justify-between border border-[#0000001F] rounded-[33.52px] px-4 pb-5 bg-[#D6E5BE]">

                            <!-- Image top -->
                            <div class="w-full rounded-[20px] overflow-hidden px-4 mb-4">
                                <img src="<?php echo $item['pic']; ?>" alt="<?php echo $item['title']; ?>" class="w-full h-[238px] object-cover rounded-b-[10px]" />
                            </div>

                            <!-- Text bottom -->
                            <div>
                                <div class="flex items-start justify-between">
                                    <h3 class="font-bold text-lg"><?php echo $item['title']; ?></h3>
                                    <div class="flex-none flex items-start justify-between">
                                        <img src="/assets/images/whiteArrow.webp" width="35.96px" height="" alt="arrow">
                                    </div>
                                </div>
                                <p class="text-sm text-gray-600 mt-2"><?php echo $item['content']; ?></p>
                            </div>

                        </div>

                    <?php endif; ?>

                <?php endforeach; ?>

            </div>
        </div>
    </section>
    <section class="py-[4rem]">
        <div class="">
            <div class="max-w-[1215px] mx-auto md:px-4 px-8 flex md:flex-row flex-col md:items-center items-start justify-between">
                <div class="h42 text-[#28511C] flex-1 md:pb-0 pb-4">
                    <span class="text-black">Our</span> Initiatives
                </div>
                <div class="text18 flex-none md:w-[44%]">
                    Our initiatives are driven by purpose, creating meaningful and lasting impact in communities.
                </div>
            </div>
            <div class="md:px-0 px-8">
                <div class="mt-4">

                    <?php foreach($initiatives as $index => $item): ?>

                        <?php if($index == 0): ?>
                            <!-- EVEN: text top, image bottom, white bg -->
                            <div class="flex md:flex-row flex-col items-center justify-between bg-white md:gap-[4.5rem] gap-[2rem]">
                                <!-- Image bottom -->
                                <div class="mt-[2rem] flex-none md:w-[52%]">
                                    <img src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>" class="w-full" />
                                </div>

                                <!-- Text top -->
                                <div class="flex-1 mb-4 flex md:flex-row flex-col md:pr-[4rem]">
                                    <div>
                                        <div class="text-[33.3px] font-[500] text-black"><?php echo $item['title']; ?></div>
                                        <div class="text-[16.66px] leading-[170%] font-[400] mt-2 text-[#424242]"><?php echo $item['content']; ?></div>
                                    </div>
                                </div>
                            </div>

                        <?php elseif ($index % 2 == 0): ?>
                            <!-- EVEN: text top, image bottom, white bg -->
                            <div class="flex md:flex-row flex-col items-center justify-between md:pt-[7rem] pt-[3rem] bg-white md:gap-[4.5rem] gap-[2rem]">
                                <!-- Image bottom -->
                                <div class="mt-[2rem] flex-none md:w-[52%]">
                                    <img src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>" class="w-full" />
                                </div>

                                <!-- Text top -->
                                <div class="flex-1 mb-4 flex md:flex-row flex-col md:pr-[4rem]">
                                    <div>
                                        <div class="text-[33.3px] font-[500] text-black"><?php echo $item['title']; ?></div>
                                        <div class="text-[16.66px] leading-[170%] font-[400] mt-2 text-[#424242]"><?php echo $item['content']; ?></div>
                                    </div>
                                </div>
                            </div>

                        <?php else: ?>
                            <!-- ODD: image top, text bottom, green bg -->
                            <div class="flex md:flex-row flex-col items-center justify-between md:pt-[7rem] pt-[3rem] bg-white md:gap-[4.5rem] gap-[2rem]">

                                <!-- Text bottom -->
                                <div class="flex-1 mb-4 flex md:flex-row flex-col md:ps-[4rem]">
                                    <div>
                                        <div class="text-[33.3px] font-[500] text-black"><?php echo $item['title']; ?></div>
                                        <div class="text-[16.66px] leading-[170%] font-[400] mt-2 text-[#424242] mt-2"><?php echo $item['content']; ?></div>
                                    </div>
                                </div>

                                <!-- Image bottom -->
                                <div class="mt-[2rem] flex-none md:w-[52%] md:order-last order-first">
                                    <img src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>" class="w-full" />
                                </div>

                            </div>

                        <?php endif; ?>

                    <?php endforeach; ?>

                </div>
            </div>
        </div>
    </section>
    <section class="bg-cover bg-[url('/assets/images/pattern-cover.webp')] pt-[5.8rem] relative">
        <div class="md:max-w-[1030px] mx-auto flex md:flex-row flex-col md:px-0 px-8 md:gap-0 gap-[5rem]">
            <div class="bg-[#D6E5BE] rounded-t-[#D6E5BE] flex-1 ps-[2.5rem] pe-[4rem] py-[2rem] rounded-t-[20px]">
                <div class="h2 text-[#28511C]"><span class="text-black">Building a</span> Better Tomorrow</div>
                <div class="text18 text-[#424242] pt-2">
                   We are dedicated to making a meaningful difference through our CSR initiatives by continuously supporting education, improving livelihoods, and promoting well-being. Our approach is centered on sustainability, responsibility, and long-term community development. 
                </div>
            </div> 
            <div class="flex-none md:w-[45.5%] md:block hidden">
                <img src="/assets/images/gherkins.webp" width="462.91px" height="304.59px" alt="gherkins" class="md:absolute top-[20%] right-0" />
            </div>               
        </div>
    </section>
    <section class="md:px-0 px-8 pt-[8rem] pb-[6rem]">
        <div class="bg-cover md:max-w-[1044px] rounded-[25px] mx-auto py-[4.6rem] bg-[url('/assets/images/green-banner.webp')]">
            <div class="w-[74%] mx-auto">
                <div class="text-[40px] font-[500] leading-[44px] text-[#FFFFFF] text-center pb-3">Together, we can create a stronger<span class="md:block inline"> and more inclusive tomorrow.</span></div>
                <div class="text-[18px] font-regular text-[#FFFFFF] text-center pb-8">By working together, we can continue to support communities, create opportunities, and build a future that is more inclusive and sustainable for everyone.</div>
                <div class="flex justify-center">
                    <button class="px-6 py-3 rounded-[7.41px] bg-white ctaText flex flex-row items-center justify-center gap-2 !text-[#000000]">
                        Enquire Now
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2054_2289)">
                            <path d="M2.98535 8.95808L6.93745 5.00599L2.98535 1.05389" stroke="black" stroke-opacity="0.933333" stroke-width="1.58084" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2054_2289">
                            <rect width="10.5389" height="10.5389" fill="black"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Add this before </body> in footer.php -->
    <script>
        const navbar = document.getElementById('navbar');
        navbar.classList.add('at-top');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // At the very top — make transparent
            if (currentScrollY === 0) {
                navbar.classList.add('at-top');
                navbar.classList.remove('hidden');
            }
            // Scrolling DOWN — hide navbar
            else if (currentScrollY > lastScrollY) {
                navbar.classList.add('hidden');
                navbar.classList.remove('at-top');
            }
            // Scrolling UP — show navbar
            else {
                navbar.classList.remove('hidden');
                navbar.classList.remove('at-top');
            }

            lastScrollY = currentScrollY;
        });

        // Mobile hamburger toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.navbar-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    </script>
</body>
</html>