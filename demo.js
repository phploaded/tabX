
function demo_reapply(){
const typeVal = $('#type').val();
const animationVal = $('#animation').val();
const boxClassVal = $('#boxClass').val();
const activeLi = $('[tabx-id] .tabx-li-active').attr('tabx-cat-nav');

    $('[tabx-id]').tabX({ 
	type: typeVal,
	animation:animationVal,
	boxClass:boxClassVal,
	activeCat:activeLi
	}); 

$('[for="btn"]').html('Changes applied!');
setTimeout(function(){
	demo_remove_label();
}, 4000);
}


function demo_remove_label(){
$('[for="btn"]').html('&nbsp;');
}

// Example Initialization:
// For global setup
$(document).ready(function () {
hljs.highlightAll();
demo_reapply();
});

// For dynamically loaded content or specific elements
// $('#specificElement').tabX();
