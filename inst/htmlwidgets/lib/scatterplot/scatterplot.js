

function add_scatterplot_geo( map_id, map_type, scatter_data, layer_id, auto_highlight, highlight_colour, legend, bbox, update_view, focus_layer, js_transition, radius_min_pixels, radius_max_pixels, brush_radius ) {

  //console.log( radius_min_pixels );

  var extensions = [];

  const d = new deck.DirectionalLight({
	  color: [255, 255, 255],
	  intensity: 1.0,
	  direction: [-3, -9, -1]
	});
	console.log( d );
  const b = new deck.BrushingExtension();
  console.log( b );

//  if ( brush_radius > 0 ) {
//  	// add brushing extension
//  	extensions.append( new BrushingExtension() );
//  }

//  console.log( extensions );

  const scatterLayer = new ScatterplotLayer({
    map_id: map_id,
    id: 'scatterplot-'+layer_id,
    data: scatter_data,
    radiusScale: 1,
    radiusMinPixels: radius_min_pixels || 1,
    radiusMaxPixels: radius_max_pixels || Number.MAX_SAFE_INTEGER,
    lineWidthMinPixels: 0,
    stroked: true,  // TODO( make conditional IFF stroke provided?)
    filled: true,
    parameters: {
	    depthTest: false
	  },
    getRadius: d => d.properties.radius,
    getPosition: d => md_get_point_coordinates( d ),
    getFillColor: d => md_hexToRGBA( d.properties.fill_colour ),
    getLineColor: d => md_hexToRGBA( d.properties.stroke_colour ),
    getLineWidth: d => d.properties.stroke_width,
    pickable: true,
    autoHighlight: auto_highlight,
    highlightColor: md_hexToRGBA( highlight_colour ),
    onClick: info => md_layer_click( map_id, "scatterplot", info ),
    onHover: md_update_tooltip,
    transitions: js_transition || {},
<<<<<<< HEAD
    brushingEnabled: true,
    brushingRadius: brush_radius,
    mousePosition: [0, 0],
    extensions: [  ]
=======
    //brushingEnabled: true,
    //brushingRadius: brush_radius,
    //mousePosition: [0, 0],
    extensions: extensions
>>>>>>> 2864a15abb152b17b6a74b884d281b8b84f3b344
  });

	if( map_type == "google_map") {
	  md_update_overlay( map_id, 'scatterplot-'+layer_id, scatterLayer );
	} else {
	  md_update_layer( map_id, 'scatterplot-'+layer_id, scatterLayer );
	}

	if (legend !== false) {
    md_add_legend(map_id, map_type, layer_id, legend);
  }

  md_layer_view( map_id, map_type, layer_id, focus_layer, bbox, update_view );
}

function add_scatterplot_polyline( map_id, map_type, scatter_data, layer_id, auto_highlight, highlight_colour, legend, bbox, update_view, focus_layer, js_transition, radius_min_pixels, radius_max_pixels ) {

  const scatterLayer = new ScatterplotLayer({
    map_id: map_id,
    id: 'scatterplot-'+layer_id,
    data: scatter_data,
    radiusScale: 1,
    radiusMinPixels: radius_min_pixels || 1,
    radiusMaxPixels: radius_max_pixels || Number.MAX_SAFE_INTEGER,
    lineWidthMinPixels: 0,
    stroked: true,
    filled: true,
    parameters: {
	    depthTest: false
	  },
    getRadius: d => d.radius,
    getPosition: d => md_decode_points( d.polyline ),
    getFillColor: d => md_hexToRGBA( d.fill_colour ),
    getLineColor: d => md_hexToRGBA( d.stroke_colour ),
    getLineWidth: d => d.stroke_width,
    pickable: true,
    autoHighlight: auto_highlight,
    highlightColor: md_hexToRGBA( highlight_colour ),
    onClick: info => md_layer_click( map_id, "scatterplot", info ),
    onHover: md_update_tooltip,
    transitions: js_transition || {}
  });

	if( map_type == "google_map") {
	  md_update_overlay( map_id, 'scatterplot-'+layer_id, scatterLayer );
	} else {
	  md_update_layer( map_id, 'scatterplot-'+layer_id, scatterLayer );
	}

	if (legend !== false) {
    md_add_legend(map_id, map_type, layer_id, legend);
  }
  md_layer_view( map_id, map_type, layer_id, focus_layer, bbox, update_view );
}
