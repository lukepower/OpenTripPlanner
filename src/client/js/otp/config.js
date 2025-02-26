otp.config = {
    //If enabled it shows popup window with all planner responses in JSON
    //Can be also enabled in URL parameters as ?debug=true
    debug: false,
    //If enabled it shows inspector layers overlays which can be used for Graph
    //debugging
    //Can be also enabled in URL parameters as ?debug_layers=true
    debug_layers: false,

    //This is default locale when wanted locale isn't found
    //Locale language is set based on wanted language in url >
    //user cookie > language set in browser (Not accept-language) 
    locale: otp.locale.English,

    //All avalible locales
    //key is translation name. Must be the same as po file or .json file
    //value is name of settings file for localization in locale subfolder
    //File should be loaded in index.html
    locales : {
        'en': otp.locale.English,
        'de': otp.locale.German,
        'it': otp.locale.Italian,
    },

    languageChooser : function() {
        var active_locales = _.values(otp.config.locales);
        var str = "<ul>";
        var localesLength = active_locales.length;
        var param_name = i18n.options.detectLngQS;
        for (var i = 0; i < localesLength; i++) {
            var current_locale = active_locales[i];
            var url_param = {};
            url_param[param_name] = current_locale.config.locale_short;
            str += '<li><a href="?' + $.param(url_param) + '">' + current_locale.config.name + ' (' + current_locale.config.locale_short + ')</a></li>';
        }
        str += "</ul>";
        return str;
    },


    /**
     * The OTP web service locations
     */
    hostname : "https://tpdata.valgardena.it",
    //municoderHostname : "http://localhost:8080",
    //datastoreUrl : 'http://localhost:9000',
    // In the 0.10.x API the base path is "otp-rest-servlet/ws"
    // From 0.11.x onward the routerId is a required part of the base path.
    // If using a servlet container, the OTP WAR should be deployed to context path /otp
    restService: "otp/routers/default",

    /**
     * Base layers: the base map tile layers available for use by all modules.
     * Expressed as an array of objects, where each object has the following 
     * fields:
     *   - name: <string> a unique name for this layer, used for both display
     *       and internal reference purposes
     *   - tileUrl: <string> the map tile service address (typically of the
     *       format 'http://{s}.yourdomain.com/.../{z}/{x}/{y}.png')
     *   - attribution: <string> the attribution text for the map tile data
     *   - [subdomains]: <array of strings> a list of tileUrl subdomains, if
     *       applicable
     *       
     */

    baseLayers: [
	{
            name: 'TF Outdoors',
            tileUrl: 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=f5bd1a180f194af4a509a44564be0839',
            attribution : 'Thunderforest'
        },
        {
            name: 'MapBox',
            tileUrl: 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoibHVrZXBvd2VyIiwiYSI6ImNrNm93ZGt0OTA0eTczbm12OTluaXk4MmIifQ.x33PPnyi5ogxqnDg65Ug1g',
            attribution : 'MapBox'
        },
        {
            name: 'OSM Standard Tiles',
            tileUrl: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution : 'Map data and tiles Â© OpenStreetMap contributors'
        }
    ],
    

    /**
     * Map start location and zoom settings: by default, the client uses the
     * OTP routerInfo API call to center and zoom the map. The following
     * properties, when set, override that behavioir.
     */
     
     initLatLng : new L.LatLng(46.57408, 11.66180),
     initZoom : 13,
    // minZoom : 10,
    // maxZoom : 20,
    
    /* Whether the map should be moved to contain the full itinerary when a result is received. */
    zoomToFitResults    : true,

    /**
     * Site name / description / branding display options
     */

    siteName            : "Val Gardena Trip Planner",
    siteDescription     : "An OpenTripPlanner deployment.",
    logoGraphic         : 'https://www.valgardena.it/fileadmin/template/img/logo.png',
    // bikeshareName    : "",
    //Enable this if you want to show frontend language chooser
    showLanguageChooser : true,

    showLogo            : true,
    showTitle           : true,
    showModuleSelector  : false,
    metric              : true,


    /**
     * Modules: a list of the client modules to be loaded at startup. Expressed
     * as an array of objects, where each object has the following fields:
     *   - id: <string> a unique identifier for this module
     *   - className: <string> the name of the main class for this module; class
     *       must extend otp.modules.Module
     *   - [defaultBaseLayer] : <string> the name of the map tile base layer to
     *       used by default for this module
     *   - [isDefault]: <boolean> whether this module is shown by default;
     *       should only be 'true' for one module
     */
    
    modules : [
        {
            id : 'planner',
            className : 'otp.modules.multimodal.MultimodalPlannerModule',
            defaultBaseLayer : 'OSM Standard Tiles',
            isDefault: true
        }
    ],
    
    
    /**
     * Geocoders: a list of supported geocoding services available for use in
     * address resolution. Expressed as an array of objects, where each object
     * has the following fields:
     *   - name: <string> the name of the service to be displayed to the user
     *   - className: <string> the name of the class that implements this service
     *   - url: <string> the location of the service's API endpoint
     *   - addressParam: <string> the name of the API parameter used to pass in
     *       the user-specifed address string
     */

    geocoders : [
     /**    {
            name: 'OTP built-in geocoder',
            className: 'otp.core.GeocoderBuiltin'
            // URL and query parameter do not need to be set for built-in geocoder.
        },**/
	{
	    name: 'BAG geocoder',
	    className: 'otp.core.GeocoderBag',
            url: 'https://nominatim.openstreetmap.org/search/?format=json&viewbox=11,46,12,47&bounded=1',
	    addressParam: 'q'
	}
    ],

    

    //This is shown if showLanguageChooser is true
    infoWidgetLangChooser : {
        title: 'Lang', 
        languages: true
    },
    
    
    /**
     * Support for the "AddThis" display for sharing to social media sites, etc.
     */
     
    showAddThis     : false,
    //addThisPubId    : 'your-addthis-id',
    //addThisTitle    : 'Your title for AddThis sharing messages',


    /**
     * Formats to use for date and time displays, expressed as ISO-8601 strings.
     */    
     
    timeFormat  : "h:mma",
    dateFormat  : "MMM Do YYYY"

};
var options = {
	resGetPath: 'js/otp/locale/__lng__.json',
	fallbackLng: 'en',
        nsseparator: ';;', //Fixes problem when : is in translation text
        keyseparator: '_|_',
	preload: ['en'],
        //TODO: Language choosing works only with this disabled
        /*lng: otp.config.locale_short,*/
        /*postProcess: 'add_nekaj', //Adds | around every string that is translated*/
        /*shortcutFunction: 'sprintf',*/
        /*postProcess: 'sprintf',*/
	debug: false,
	getAsync: false, //TODO: make async
	fallbackOnEmpty: true,
};
var _tr = null; //key
var ngettext = null; // singular, plural, value
var pgettext = null; // context, key
var npgettext = null; // context, singular, plural, value

i18n.addPostProcessor('add_nekaj', function(val, key, opts) {
    return "|"+val+"|";
});

i18n.init(options, function(t) {
    //Sets locale and metric based on currently selected/detected language
    if (i18n.lng() in otp.config.locales) {
        otp.config.locale = otp.config.locales[i18n.lng()];
        otp.config.metric = otp.config.locale.config.metric;
        //Conditionally load datepicker-lang.js?
    } 

    //Use infoWidgets from locale
    //Default locale is English which has infoWidgets
    if ("infoWidgets" in otp.config.locale) {
        otp.config.infoWidgets=otp.config.locale.infoWidgets;
    } else {
        otp.config.infoWidgets=otp.locale.English.infoWidgets;
    }

    if (otp.config.showLanguageChooser) {
        otp.config.infoWidgets.push(otp.config.infoWidgetLangChooser);
    }
    //Accepts Key, value or key, value1 ... valuen
    //Key is string to be translated
    //Value is used for sprintf parameter values
    //http://www.diveintojavascript.com/projects/javascript-sprintf
    //Value is optional and can be one parameter as javascript object if key
    //has named parameters
    //Or can be multiple parameters if used as positional sprintf parameters
    _tr = function() {
        var arg_length = arguments.length;
        //Only key
        if (arg_length == 1) {
            key = arguments[0];
            return t(key); 
        //key with sprintf values
        } else if (arg_length > 1) {
            key = arguments[0];
            values = [];
            for(var i = 1; i < arg_length; i++) {
                values.push(arguments[i]);
            }
            return t(key, {postProcess: 'sprintf', sprintf: values}); 
        } else {
            console.error("_tr function doesn't have an argument");
            return "";
        }
    };
    ngettext = function(singular, plural, value) {
        return t(singular, {count: value, postProcess: 'sprintf', sprintf: [value]});
    };
    pgettext = function(context, key) {
        return t(key, {context: context});
    };
    npgettext = function(context, singular, plural, value) {
        return t(singular, {context: context,
                 count: value,
                 postProcess: 'sprintf',
                 sprintf: [value]});
    };

});

otp.config.modes = {
    //TRANSLATORS: Travel by: mode of transport (Used in selection in Travel
    //Options widgets)
        "TRANSIT,WALK"        : _tr("Transit"), 
    //TRANSLATORS: Travel by: mode of transport (Used in selection in Travel
    //Options widgets)
        "BUS,WALK"         : _tr("Bus Only"), 
    //TRANSLATORS: Travel by: mode of transport (Used in selection in Travel
    //Options widget)
        "TRAM,RAIL,SUBWAY,FUNICULAR,GONDOLA,WALK"       : _tr("Rail Only")
    };
   
     
   
function showPosition(position) {
    window.tmp.setStartPoint(new L.LatLng(position.coords.latitude, position.coords.longitude),1, _tr("Current Position"));
    window.tmp.webapp.map.lmap.flyTo(new L.LatLng(position.coords.latitude, position.coords.longitude),15);
    getFavorites();
}

function setDestCoord(lat,lon,name)
{
    window.tmp.setEndPoint(new L.LatLng(lat,lon),1, name);
}

function goToFavorite(lat,lon,name,id)
{
    // Send ajax call for click
    var this_ = this;
    var url = "/rest/clickcounter.php";
    var currentRequest = $.ajax(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        // query parameters go under "data" as an Object
        data: {id: id},

            success: function(data) {
               console.log("Click counted");
               
            }
        });


    setDestCoord(lat,lon, name);
}

function getFavorites()
{
    var this_ = this;
    var url = "/rest/query.php";
    var pos = window.tmp.startLatLng;
    var options = {  
        "lat": pos.lat,       
        "lon": pos.lng,
        "lang": otp.config.locale.config.locale_short
    };

    var currentRequest = $.ajax(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        // query parameters go under "data" as an Object
        data: options,

            success: function(data) {
                $('#otp-spinner').hide();
                var myResult = JSON.parse(data);
                $.each(myResult, function(){
                    window.splide.add('<li class="splide__slide" onclick="goToFavorite(' + this.latitude + "," + this.longitude + ",'" + this.name + '\',' + this.id + ');"><img src="'+this.image_url+'" height="150" /><a href="#">' + this.name + '</a></li>');
                    console.log(this)
                });
               
               
            }
        });
}
