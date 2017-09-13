var load_ui = [];
var threed_src = '';
var base_url = 'http://kreaserv-tech.com/mall_app/index.php/loader';
var myApp = new Framework7({
    pushState: false,
    // swipePanel: 'right',
    swipeBackPage:false,
    preloadPreviousPage: false,
    uniqueHistory: true,
    uniqueHistoryIgnoreGetParameters: true,
    modalTitle: 'Nexus',
    imagesLazyLoadPlaceholder: 'img/lazyload.jpg',
    imagesLazyLoadThreshold: 50,

});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;
	$('.single-item').slick();
	$('.menu_sub').click(function() {
		$('.menu_i,.menu_p').removeClass('menu_active');
		$(this).find('.menu_i,.menu_p').addClass('menu_active');
	});
    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// // Option 2. Using live 'pageInit' event handlers for each page
// $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//     // Following code will be executed for page with data-page attribute equal to "about"
//     myApp.alert('Here comes About page');
// })

// Add view
var mainView = myApp.addView('.view-main', {
	// dynamicNavbar: true
});

myApp.onPageInit('index', function(page) {
	$('.box_height').animate({"height":"100%"}, 1000);
		$('.logo').animate({"opacity":"1" , "top":"0"}, 1000, function(){
			$('.logo').delay(1000).animate({"top":"-87%" , "left":"-81%" , "width":"15%"}, 700);
			$('.box_height').delay(1000).animate({"height":"0%"}, 700);
			$('.red1').delay(1200).animate({"opacity":"1" , "bottom":"0"}, 800);
			$('.enter_text').delay(1500).animate({"opacity":"1" , "top":"28%"}, 1200);
			$('.login_sub').delay(2000).animate({"opacity":"1" , "left":"38%"}, 1200);
		});
});
// // Handle Cordova Device Ready Event

$$(document).on('deviceready', function() {
    myApp.showIndicator();
    $.ajax({
        url: base_url+"/load_ui",
        type: 'POST',
        crossDomain: true,
    })
	.done(function(res) {
    	load_ui = res;
    	// load_location_ui();
    })
    .fail(function(err) {
        myApp.hideIndicator();
        myApp.alert('Some error occurred on connecting.');
    })
    .always(function() {
        myApp.hideIndicator();
    });

   //  var div = document.getElementById("map_box");

  	// // Initialize the map view
  	// map = plugin.google.maps.Map.getMap(div);

  	// Wait until the map is ready status.
  	// map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady);
});

// myApp.onPageInit('location', function(page) {
// 	var location_status = page.query.loaction_load_status;
// 	if (location_status == 'true') {
// 		console.log("TRUE");
// 		// $("#location_container").empty();
// 		$("#location_container").html(load_ui.location_html);

// 	    $.each(load_ui.mall_list, function(index, value) {
// 	        var element = document.getElementById("map_container"+value.id);

// 	        var mapTypeIds = [];
// 	        for (var type in google.maps.MapTypeId) {
// 	            mapTypeIds.push(google.maps.MapTypeId[type]);
// 	        }

// 	        mapTypeIds.push("OSM");
// 	        mapTypeIds.push("MyGmap");
// 	        mapTypeIds.push("LocalGmap");
// 	        mapTypeIds.push("WebStorageGmap");
// 	        mapTypeIds.push("LocalMyGmap");
// 	        mapTypeIds.push("WebStorageMyGmap");

// 	        var map = new google.maps.Map(element, {
// 	            center: new google.maps.LatLng(value.lat, value.long),
// 	            zoom: 14,
// 	            mapTypeId: "MyGmap",
// 	            mapTypeControlOptions: {
// 	                mapTypeIds: mapTypeIds,
// 	                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
// 	            }
// 	        });

// 	        map.setOptions({
// 	            draggable: false,
// 	            zoomControl: false,
// 	            scrollwheel: false,
// 	            disableDoubleClickZoom: true
// 	        });


// 	        map.mapTypes.set("OSM", new google.maps.ImageMapType({
// 	            getTileUrl: getOsmTileImgSrc,
// 	            tileSize: new google.maps.Size(256, 256),
// 	            name: "OSM",
// 	            maxZoom: 15
// 	        }));

// 	        map.mapTypes.set("MyGmap", new google.maps.ImageMapType({
// 	            getTileUrl: getGmapTileImgSrc,
// 	            tileSize: new google.maps.Size(256, 256),
// 	            name: "MyGmap",
// 	            maxZoom: 15
// 	        }));

// 	        map.mapTypes.set("LocalGmap", new google.maps.ImageMapType({
// 	            getTileUrl: getLocalTileImgSrc,
// 	            tileSize: new google.maps.Size(256, 256),
// 	            name: "LocalGmap",
// 	            maxZoom: 15
// 	        }));

// 	        map.mapTypes.set("WebStorageGmap", new google.maps.ImageMapType({
// 	            getTileUrl: getWebStorageTileImgSrc,
// 	            tileSize: new google.maps.Size(256, 256),
// 	            name: "WebStorageGmap",
// 	            maxZoom: 15
// 	        }));

// 	        map.mapTypes.set("LocalMyGmap", new google.maps.ImageMapType({
// 	            getTileUrl: function(coord, zoom) {
// 	                return checkTileInSprites(coord, zoom) ?
// 	                    getLocalTileImgSrc(coord, zoom) :
// 	                    getGmapTileImgSrc(coord, zoom);
// 	            },
// 	            tileSize: new google.maps.Size(256, 256),
// 	            name: "LocalMyGmap",
// 	            maxZoom: 15
// 	        }));

// 	        map.mapTypes.set("WebStorageMyGmap", new google.maps.ImageMapType({
// 	            getTileUrl: function(coord, zoom) {
// 	                var image = getWebStorageTileImgSrc(coord, zoom);
// 	                return image ? image : getGmapTileImgSrc(coord, zoom);
// 	            },
// 	            tileSize: new google.maps.Size(256, 256),
// 	            name: "WebStorageMyGmap",
// 	            maxZoom: 0
// 	        }));

// 	        google.maps.event.addListener(map, 'click', function(point) {
// 	            var marker = new google.maps.Marker({
// 	                position: point.latLng,
// 	                map: map
// 	            });

// 	            google.maps.event.addListener(marker, 'dblclick', function() {
// 	                marker.setMap(null);
// 	            });

// 	            google.maps.event.addListener(marker, 'click', function() {
// 	                new google.maps.InfoWindow({
// 	                    content: 'lat: ' + point.latLng.lat() + '<br>lng:' + point.latLng.lng()
// 	                }).open(map, marker);
// 	            });
// 	        });

// 	        function CustomControl(controlDiv, map, title, handler) {
// 	            controlDiv.style.padding = '5px';

// 	            var controlUI = document.createElement('DIV');
// 	            controlUI.style.backgroundColor = 'white';
// 	            controlUI.style.borderStyle = 'solid';
// 	            controlUI.style.borderWidth = '2px';
// 	            controlUI.style.cursor = 'pointer';
// 	            controlUI.style.textAlign = 'center';
// 	            controlUI.title = title;
// 	            controlDiv.appendChild(controlUI);

// 	            var controlText = document.createElement('DIV');
// 	            controlText.style.fontFamily = 'Arial,sans-serif';
// 	            controlText.style.fontSize = '12px';
// 	            controlText.style.paddingLeft = '4px';
// 	            controlText.style.paddingRight = '4px';
// 	            controlText.innerHTML = title;
// 	            controlUI.appendChild(controlText);

// 	            google.maps.event.addDomListener(controlUI, 'click', handler);
// 	        }

// 	        var clearWebStorageDiv = document.createElement('DIV');
// 	        var clearWebStorageButton = new CustomControl(clearWebStorageDiv, map,
// 	            'Clear Web Storage', clearWebStorage);

// 	        var prepareWebStorageDiv = document.createElement('DIV');
// 	        var prepareWebStorageButton = new CustomControl(prepareWebStorageDiv, map,
// 	            'Prepare Web Storage', prepareWebStorage);

// 	        clearWebStorageDiv.index = 1;
// 	        prepareWebStorageDiv.index = 1;
// 	        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearWebStorageDiv);
// 	        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(prepareWebStorageDiv);
// 	    })

// 		console.log("Data Appended");
// 		setTimeout(function(){ 
// 		    mainView.router.load({
// 		        url: 'tabs.html',
// 		        ignoreCache: false,
// 		    });
// 		}, 2000);
// 	} else {
// 		console.log("FALSE");
// 		// $(".location_containers_hide").hide();
// 		// $(".location_containers_"+mall_id).show();
// 	}
// })
myApp.onPageInit('location', function(page) {
	$("#location_container").empty();
	$("#location_container").html(load_ui.location_html);

	$(".location_containers_hide").hide();
	$(".location_containers_"+mall_id).show();

    $.each(load_ui.mall_list, function(index, value) {
        var element = document.getElementById("map_container"+value.id);

        var mapTypeIds = [];
        for (var type in google.maps.MapTypeId) {
            mapTypeIds.push(google.maps.MapTypeId[type]);
        }

        mapTypeIds.push("OSM");
        mapTypeIds.push("MyGmap");
        mapTypeIds.push("LocalGmap");
        mapTypeIds.push("WebStorageGmap");
        mapTypeIds.push("LocalMyGmap");
        mapTypeIds.push("WebStorageMyGmap");

        var map = new google.maps.Map(element, {
            center: new google.maps.LatLng(value.lat, value.long),
            zoom: 14,
            mapTypeId: "MyGmap",
            mapTypeControlOptions: {
                mapTypeIds: mapTypeIds,
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
        });
        var marker = new google.maps.Marker({
			position: map.center,
			label: "G",
			map: map
		});
        map.setOptions({
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        });


        map.mapTypes.set("OSM", new google.maps.ImageMapType({
            getTileUrl: getOsmTileImgSrc,
            tileSize: new google.maps.Size(256, 256),
            name: "OSM",
            maxZoom: 15
        }));

        map.mapTypes.set("MyGmap", new google.maps.ImageMapType({
            getTileUrl: getGmapTileImgSrc,
            tileSize: new google.maps.Size(256, 256),
            name: "MyGmap",
            maxZoom: 15
        }));

        map.mapTypes.set("LocalGmap", new google.maps.ImageMapType({
            getTileUrl: getLocalTileImgSrc,
            tileSize: new google.maps.Size(256, 256),
            name: "LocalGmap",
            maxZoom: 15
        }));

        map.mapTypes.set("WebStorageGmap", new google.maps.ImageMapType({
            getTileUrl: getWebStorageTileImgSrc,
            tileSize: new google.maps.Size(256, 256),
            name: "WebStorageGmap",
            maxZoom: 15
        }));

        map.mapTypes.set("LocalMyGmap", new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                return checkTileInSprites(coord, zoom) ?
                    getLocalTileImgSrc(coord, zoom) :
                    getGmapTileImgSrc(coord, zoom);
            },
            tileSize: new google.maps.Size(256, 256),
            name: "LocalMyGmap",
            maxZoom: 15
        }));

        map.mapTypes.set("WebStorageMyGmap", new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                var image = getWebStorageTileImgSrc(coord, zoom);
                return image ? image : getGmapTileImgSrc(coord, zoom);
            },
            tileSize: new google.maps.Size(256, 256),
            name: "WebStorageMyGmap",
            maxZoom: 0
        }));

        google.maps.event.addListener(map, 'click', function(point) {
            var marker = new google.maps.Marker({
                position: point.latLng,
                map: map
            });

            google.maps.event.addListener(marker, 'dblclick', function() {
                marker.setMap(null);
            });

            google.maps.event.addListener(marker, 'click', function() {
                new google.maps.InfoWindow({
                    content: 'lat: ' + point.latLng.lat() + '<br>lng:' + point.latLng.lng()
                }).open(map, marker);
            });
        });

        function CustomControl(controlDiv, map, title, handler) {
            controlDiv.style.padding = '5px';

            var controlUI = document.createElement('DIV');
            controlUI.style.backgroundColor = 'white';
            controlUI.style.borderStyle = 'solid';
            controlUI.style.borderWidth = '2px';
            controlUI.style.cursor = 'pointer';
            controlUI.style.textAlign = 'center';
            controlUI.title = title;
            controlDiv.appendChild(controlUI);

            var controlText = document.createElement('DIV');
            controlText.style.fontFamily = 'Arial,sans-serif';
            controlText.style.fontSize = '12px';
            controlText.style.paddingLeft = '4px';
            controlText.style.paddingRight = '4px';
            controlText.innerHTML = title;
            controlUI.appendChild(controlText);

            google.maps.event.addDomListener(controlUI, 'click', handler);
        }

        var clearWebStorageDiv = document.createElement('DIV');
        var clearWebStorageButton = new CustomControl(clearWebStorageDiv, map,
            'Clear Web Storage', clearWebStorage);

        var prepareWebStorageDiv = document.createElement('DIV');
        var prepareWebStorageButton = new CustomControl(prepareWebStorageDiv, map,
            'Prepare Web Storage', prepareWebStorage);

        clearWebStorageDiv.index = 1;
        prepareWebStorageDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(clearWebStorageDiv);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(prepareWebStorageDiv);
    })

		
		// $(".location_containers_hide").hide();
		// $(".location_containers_"+mall_id).show();
})
// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('sync', function (page) {
	$('.sync_text').animate({"opacity":"1" , "left":"21%"}, 1000);
	$('.red2').delay(100).animate({"opacity":"1" , "right":"0"}, 700);
	$('.sync_box').delay(500).animate({"opacity":"1" , "right":"19%"}, 800);
	$('.skip_click').delay(400).animate({"opacity":"1" , "right":"2%"}, 500);

})

myApp.onPageInit('progress_bar', function (page) {
    $('.bar_fill').animate({"width":"100%"}, 5000);
})

myApp.onPageInit('events', function (page) {
	$('#events_html').empty();
	$('#events_html').append(load_ui.event_html);
	$(".display_mallid_hide").hide();
	$(".display_mallid"+mall_id).show();
	$(".event_sub").hide();
	var events = $(".event_sub");
    $(events).each(function(){
        var startdate = new Date($(this).data('startdate'));
        var enddate = new Date($(this).data('enddate'));
        var cur_date = new Date();
        if(startdate <= cur_date && enddate >= cur_date){
            $(this).show();
        }
    })

    $('.event_select_sub').click(function() {
		$('.event_select_sub').removeClass('event_select_active');
		$(this).addClass('event_select_active');
		var filter_id = $(this).data('filterid');
		if (filter_id == 'current_events') {
        	var filter = $(this).data('filter');
    		$(".event_sub").hide();
        	var events = $(".event_sub");
	        $(events).each(function(){
	            var startdate = new Date($(this).data('startdate'));
	            var enddate = new Date($(this).data('enddate'));
	            var cur_date = new Date();
	            if(startdate <= cur_date && enddate >= cur_date){
	                $(this).show();
	            }
	        })
		} else if (filter_id == 'upcoming_events') {
        	var filter = $(this).data('filter');
    		$(".event_sub").hide();
        	var events = $(".event_sub");
	        $(events).each(function(){
	            var startdate = new Date($(this).data('startdate'));
	            var enddate = new Date($(this).data('enddate'));
	            var cur_date = new Date();
	            if(startdate >= cur_date && enddate >= cur_date){
	                $(this).show();
	            }
	        })
		} else if (filter_id == 'past_events') {
    		$(".event_sub").hide();
        	var events = $(".event_sub");
	        $(events).each(function(){
	            var startdate = new Date($(this).data('startdate'));
	            var enddate = new Date($(this).data('enddate'));
	            var cur_date = new Date();
	            if(startdate <= cur_date && enddate <= cur_date){
	                $(this).show();
	            }
	        })
		}
		// $('.down_arrow1').fadeOut();
		// $(this).find('.down_arrow1').fadeIn();
	});
})

myApp.onPageInit('event_inner', function (page) {
	$('#event_inner_data').empty();
	$('#event_inner_data').append(load_ui.event_inner_html);
	$(".event_sec_hide").hide();
	$(".event_sec_"+event_id).show();
	var cur_date = new Date();

	if(start_date_test <= cur_date && end_date_test >= cur_date){
		$(".dynamic_event_time").html("Current Event");
	}
	
	if(start_date_test >= cur_date && end_date_test >= cur_date){
	    $(".dynamic_event_time").html("Upcoming Event");
	}
	
	if(start_date_test <= cur_date && end_date_test <= cur_date){
	    $(".dynamic_event_time").html("Past Event");
	}
	
})

// event_inner_html

myApp.onPageInit('stores', function (page) {
	$('#store_data').empty();
	$('#store_data').append(load_ui.store_html);
	$(".mall_id_hide").hide();
	$(".mall_id_"+mall_id).show();
	$(".stores_filter_data").click(function(){
		var selected_category_id = $("#stores_category_drop").val();
		var selected_floor_id = $("#stores_floor_drop").val();
		var selected_name_id = $("#stores_name_drop").val();
		$(".store_sub").hide();
		var categories = $(".store_sub");

		$(categories).each(function(){
			var category_filter = $(this).data('categoryid');
			var floor_filter = $(this).data('floorid');
			var name_filter = $(this).data('storeid');
			var mall_id_filter = $(this).data('mallid');

			if (category_filter == selected_category_id && mall_id_filter == mall_id) {
				$(this).show();
			}

			if (name_filter) {
				var name_split = name_filter.toString().split();
				if (name_split.indexOf(selected_name_id) !== -1 && mall_id_filter == mall_id) {
					$(this).show();
				}
			}

			if (floor_filter) {
				var floor_split = floor_filter.toString().split(",");
				if (floor_split.indexOf(selected_floor_id) !== -1 && mall_id_filter == mall_id) {
		            $(this).show();
				}
			}
		})		
	})
})

myApp.onPageInit('store_inner', function (page) {
	$('#store_inner_data').empty();
	$('#store_inner_data').append(load_ui.store_names_html);
	$(".store_mall_id_hide").hide();
	$(".store_mall_id_"+mall_id+store_category_id).show();
	$(".stores_categories_filter_data").click(function(){
		var selected_category_id = $("#stores_category_drop").val();
		var selected_floor_id = $("#stores_floor_drop").val();
		var selected_name_id = $("#stores_name_drop").val();
		$(".store_inner_sub").hide();
		var categories = $(".store_inner_sub");

		$(categories).each(function(){
			var category_filter = $(this).data('categoryid');
			var floor_filter = $(this).data('floorid');
			var name_filter = $(this).data('storeid');
			var mall_id_filter = $(this).data('mallid');

			if (category_filter == selected_category_id && mall_id_filter == mall_id) {
				$(this).show();
			}

			if (name_filter) {
				var name_split = name_filter.toString().split();
				if (name_split.indexOf(selected_name_id) !== -1 && mall_id_filter == mall_id) {
					$(this).show();
				}
			}

			if (floor_filter) {
				var floor_split = floor_filter.toString().split(",");
				if (floor_split.indexOf(selected_floor_id) !== -1 && mall_id_filter == mall_id) {
		            $(this).show();
				}
			}
		})
	})
})

myApp.onPageInit('mall_facts', function (page) {
	$('#mall_data').empty();
	$('#mall_logog_images').empty();
	$('#mall_data').append(load_ui.mall_fact_data);
	$("#mall_logog_images").append(load_ui.mall_logo);
	$(".mall_facts_hide").hide();
	$(".mall_facts_"+mall_id).show();
})

myApp.onPageInit('anchors', function (page) {
	$('#anchors_data').empty();
	$('#anchors_data').append(load_ui.anchors_html);
	$(".mall_id_hide").hide();
	$(".mall_id_"+mall_id).show();

	$(".anchores_filter_data").click(function(){
		var selected_floor_id = $("#stores_floor_drop").val();
		var selected_name_id = $("#stores_name_drop").val();
		$(".store_inner_sub").hide();
		var categories = $(".store_inner_sub");

		$(categories).each(function(){
			var floor_filter = $(this).data('floorid');
			var name_filter = $(this).data('storeid');
			var mall_id_filter = $(this).data('mallid');

			if (name_filter) {
				var name_split = name_filter.toString().split();
				if (name_split.indexOf(selected_name_id) !== -1 && mall_id_filter == mall_id) {
					$(this).show();
				}
			}

			if (floor_filter) {
				var floor_split = floor_filter.toString().split(",");
				if (floor_split.indexOf(selected_floor_id) !== -1 && mall_id_filter == mall_id) {
		            $(this).show();
				}
			}
		})
	})
})

myApp.onPageInit('tabs', function (page) {
	$('#tabs_data').empty();
	$('#tabs_data').html(load_ui.mall_html);
})

myApp.onPageInit('floor_plan', function (page) {
	$('#floor_plan_data').empty();
	$('#floor_plan_data').append(load_ui.floor_plan_html);
	$(".mall_id_floor_hide").hide();
	$(".slider_box_floor_hide").hide();
	$(".mall_id_floor_"+mall_id).show();
	$(".slider_box_floor_1").show();

	$(".event_select_sub").click(function(){
		// $('#floor_plan_data').empty();
		// $('#floor_plan_data').append(load_ui.floor_plan_html);
		$(".event_select_sub").removeClass('event_select_active');
		$(this).addClass('event_select_active');
		var floor_id = $(this).data('floorid');
		$(".mall_id_floor_hide").hide();
		$(".slider_box_floor_hide").hide();
		$(".slick-track, .slick-slide").css('width', '100%');
		$(".mall_id_floor_"+mall_id).show();
		$(".slider_box_floor_"+floor_id).show();
		$('.single-item').slick('unslick');
		$('.single-item').slick();
	})
	// $('.single-item').slick({
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	arrows: false,
	// 	fade: true,
	// 	asNavFor: '.slider-nav'
	// });
	// $('.single-item').slick();
})

myApp.onPageInit('walkthrough', function (page) {
	//	google.maps.event.addDomListener(window, 'load', initialize);
	$('#walkthrough_data').empty();
	$('#walkthrough_data').append(load_ui.walkthrough_html);
	$(".mall_id_floor_hide").hide();
	$(".mall_id_floor_"+mall_id).show();
	var map_id = 'map_canvas'+mall_id;
	threed_src = $("#"+map_id).data('imgsrc');
	initialize(map_id);
})

myApp.onPageInit('pictures', function (page) {
	$('#pictures_data').empty();
	$('#pictures_data').append(load_ui.pictures_html);
	$(".pictures_malls_hide").hide();
	$(".pictures_malls_"+mall_id).show();
    $('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.slider-nav'
	});
	
	$('.slider-nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		centerMode: true,
		focusOnSelect: true
	});

})

myApp.onPageInit('transformation', function (page) {
	$('#transformation_data').empty();
	$('#transformation_data').append(load_ui.transformation_html);
  	$(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.7});
    $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.3, orientation: 'vertical'});
    $(".twentytwenty-container").css('height', '657px');
	$(".mall_id_floor_hide").hide();
	$(".mall_id_floor_"+mall_id).show();
    
})

function initialize(mapid) {
	// Set up Street View and initially set it visible. Register the
	// custom panorama provider function. Set the StreetView to display
	// the custom panorama 'reception' which we check for below.
		$("#"+mapid).css('height', '500px');
		var panoOptions = {
			pano: 'reception',
			visible: true,
			panoProvider: getCustomPanorama
		};

		var panorama = new google.maps.StreetViewPanorama(
				document.getElementById(mapid), panoOptions
			);
	}

	// Return a pano image given the panoID.
	function getCustomPanoramaTileUrl(pano, zoom, tileX, tileY) {
		// Note: robust custom panorama methods would require tiled pano data.
		// Here we're just using a single tile, set to the tile size and equal
		// to the pano "world" size.
		return threed_src.toString();
	}

	// Construct the appropriate StreetViewPanoramaData given
	// the passed pano IDs.
	function getCustomPanorama(pano, zoom, tileX, tileY) {
		if (pano == 'reception') {
			return {
				location: {
					pano: 'reception',
					description: 'Nexus Mall'
				},
				links: [],
				// The text for the copyright control.
				copyright: 'Imagery by Google',
				// The definition of the tiles for this panorama.
				tiles: {
					tileSize: new google.maps.Size(4000, 2000),
					worldSize: new google.maps.Size(4000, 2000),
					// The heading in degrees at the origin of the panorama
					// tile set.
					centerHeading: 105,
					getTileUrl: getCustomPanoramaTileUrl
				}
			};
		}
	}

	// Map Function
	function CustomControl(controlDiv, map, title, handler) {
	    controlDiv.style.padding = '5px';

	    var controlUI = document.createElement('DIV');
	    controlUI.style.backgroundColor = 'white';
	    controlUI.style.borderStyle = 'solid';
	    controlUI.style.borderWidth = '2px';
	    controlUI.style.cursor = 'pointer';
	    controlUI.style.textAlign = 'center';
	    controlUI.title = title;
	    controlDiv.appendChild(controlUI);

	    var controlText = document.createElement('DIV');
	    controlText.style.fontFamily = 'Arial,sans-serif';
	    controlText.style.fontSize = '12px';
	    controlText.style.paddingLeft = '4px';
	    controlText.style.paddingRight = '4px';
	    controlText.innerHTML = title;
	    controlUI.appendChild(controlText);

	    google.maps.event.addDomListener(controlUI, 'click', handler);
	}

// Option 2. Using one 'pageInit' event handler for all pages: