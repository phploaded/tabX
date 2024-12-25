(function ($) {
    $.fn.tabX = function (options) {
        // Default settings
        const settings = $.extend(
            {
                type: 'buttons', // Default value for tabx-type
                animation: 'none', // Default animation
                boxClass: 'default', // Default boxClass
				activeCat: 'all', // Default active li
                animations: ["fade", "slide", "fall", "noir", "rotatez", "rotatey", "rotatex", "blur", "away", "blast"],
            },
            options
        );
		

        // Function to process a single gallery
        function processGallery($gallery, settings) {

            // Assign default tabx-id if missing
            if (!$gallery.attr('tabx-id')) {
                const id = `cat-${Math.random().toString(36).substr(2, 9)}`; // Generate unique ID
                $gallery.attr('tabx-id', id);
            }

            const galleryId = $gallery.attr('tabx-id');
            let $galleryUl = $(`[tabx-gid="${galleryId}"]`);

            if ($galleryUl.length === 0) {
                $galleryUl = $('<ul>', { 'tabx-gid': galleryId, 'tabx-type': settings.type, 'tabx-anim': settings.animation }).addClass('tabx-cats');
                $gallery.prepend($galleryUl);
            } else {
			if(! $($galleryUl).hasClass('tabx-cats')){
				$($galleryUl).addClass('tabx-cats').attr('tabx-type', settings.type).attr('tabx-anim', settings.animation);
				}
			}

            // Add 'All' category
            const totalCount = $gallery.find('[tabx-cats]').length;
            if ($galleryUl.find('[tabx-cat-nav="all"]').length === 0) {
                $galleryUl.prepend(
                    `<li tabx-cat-nav="all" class="tabx-li-active">All<i>${totalCount}</i></li>`
                );
            } else {
                $galleryUl.find(`[tabx-cat-nav="all"] > i`).remove();
                $galleryUl.find(`[tabx-cat-nav="all"]`).append(`<i>${totalCount}</i>`);
            }
			
			// clicking to set active li class
			setTimeout(function(){
			$galleryUl.find('[tabx-cat-nav="'+settings.activeCat+'"]').trigger('click');
			}, 10);

            // Process each item in the gallery
            $gallery.find('[tabx-cats]').each(function () {
                const $tabx = $(this);
                const cats = $tabx.attr('tabx-cats') || galleryId;
				
				if(!$tabx.hasClass('tabx')){
					$tabx.addClass('tabx');
				}
				
				// add tabx-ui container if it dosent exist
				if($tabx.find('.tabx-ui').length == 0){
					$tabx.wrapInner('<div class="tabx-ui"></div>');
				}
				
				// add tabx-in container if it dosent exist
				if($tabx.find('.tabx-in').length == 0){
					$tabx.wrapInner('<div class="tabx-in"></div>');
				}
				

                if (!$tabx.attr('tabx-cats')) {
                    $tabx.attr('tabx-cats', cats);
                }

                if (!$tabx.hasClass(`tabx-box-${settings.boxClass}`)) {
                    $tabx.addClass(`tabx-box-${settings.boxClass}`);
                }

                // Update category counts
                const catsArray = cats.split(',').map(cat => cat.trim());
                catsArray.forEach(cat => {
                    const count = $gallery.find(`.tabx[tabx-cats*="${cat}"]`).length;
                    if ($galleryUl.find(`[tabx-cat-nav="${cat}"]`).length === 0) {
                        $galleryUl.append(`<li tabx-cat-nav="${cat}">${cat}<i>${count}</i></li>`);
                    } else {
                        $galleryUl.find(`[tabx-cat-nav="${cat}"] > i`).remove();
                        $galleryUl.find(`[tabx-cat-nav="${cat}"]`).append(`<i>${count}</i>`);
                    }
                });
            });
        }

        // Apply the plugin to all matching elements
        this.each(function () {
            const $container = $(this);

            // Check if this is a container with multiple galleries or a single gallery
            const $galleries = $container.is('[tabx-id]') ? $container : $container.find('[tabx-id]');

            $galleries.each(function () {
				// resetting gallery if exists
				const gid = $(this).attr('tabx-id');
				$('[tabx-id="'+gid+'"]').removeClass('tabx-gallery');
				$('[tabx-gid="'+gid+'"]').removeClass('tabx-cats').removeAttr('tabx-type').removeAttr('tabx-anim');
				$('[tabx-id="'+gid+'"] .tabx').removeClass('tabx').removeClass(function(index, className) {
					return (className.match(/\btabx-box-\S+/g) || []).join(' ');
				});
				$('[tabx-id="'+gid+'"] [tabx-cat-nav]').removeClass('tabx-li-active');
                processGallery($(this), settings);
            });
        });

        // Click handler for navigation
        $(document).off('click', '[tabx-cat-nav]').on('click', '[tabx-cat-nav]', function () {
            const $clickedLi = $(this);
            const navCat = $clickedLi.attr('tabx-cat-nav');

            const $gidElement = $clickedLi.closest('[tabx-gid]');
            let animationType = $gidElement.attr('tabx-anim') || settings.animation;

            if (animationType === 'random') {
                animationType = settings.animations[Math.floor(Math.random() * settings.animations.length)];
            }

            const $gallery = $(`[tabx-id="${$gidElement.attr('tabx-gid')}"]`);
            const $allTabxs = $gallery.find('.tabx');

            if (navCat === "all") {
                animateTabX($allTabxs.filter('.tabx-hide'), 'show', animationType);
            } else {
                const $visibleTabxs = $gallery.find('.tabx').filter(function () {
                    const ids = $(this).attr('tabx-cats').split(',').map(cat => cat.trim());
                    return ids.includes(navCat);
                });

                animateTabX($allTabxs.not($visibleTabxs).not('.tabx-hide'), 'hide', animationType);
                animateTabX($visibleTabxs.filter('.tabx-hide'), 'show', animationType);
            }

            $clickedLi.addClass('tabx-li-active').siblings().removeClass('tabx-li-active');
        });

        // Helper function to animate elements
        function animateTabX($elements, action, animationType) {
            const hideClass = `tabx-${animationType}-hide`;
            const showClass = `tabx-${animationType}-show`;
            const duration = animationType === 'none' ? 10 : 500;

            if (action === 'hide') {
                $elements.addClass(hideClass);
                setTimeout(() => {
                    $elements.addClass('tabx-hide').removeClass(hideClass);
                }, duration);
            } else if (action === 'show') {
                $elements.removeClass('tabx-hide').addClass(showClass);
                setTimeout(() => {
                    $elements.removeClass(showClass);
                }, duration);
            }
        }

        return this; // For chaining
    };
})(jQuery);
