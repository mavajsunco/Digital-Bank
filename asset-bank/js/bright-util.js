/*
===============
bright-util.js
===============
Put your in-house javascript functions in here, unless they are only specific 
to admin pages then use the bright-admin.js (coming soon)


Version Date			Developer			Comment
----------------------------------------------------------------------
d1		16-Jun-2003		James Home			Created
d2		06-Mar-2006		Martin Wilson		Changed popupViewImage
d3		23-Oct-2006		Adam Bones			Created popupCropImage
d4		23-Jan-2007		Kevin Bennett		Added popupTerms
d5		23-Feb-2007		Steve Bryan			Added functions for popup help link event handling
d6		28-Feb-2007		Matt Stevenson		Added audio popup
d7		28-Feb-2007		Matt Stevenson		Added popupPreview
d8		02-Apr-2008		Matt Woollard		Created	popupAssetAudit
d9 		02-May-2008		Matt Woollard		Added versionNumber to popupAssetAudit
d10		10-Jul-2008		Matt Woollard		Added popupViewAgreement
d11		10-Jul-2008		Matt Woollard		Added popupAddAgreement
d12		10-Oct-2008		Matt Woollard		Added popupAssetWorkflowAudit
d13		20-Oct-2008		Ben Browning		Changed to bright-util.js and reorganised
d14		10-Nov-2008		Ben Browning		Added 
d15		22-Jan-2009		Matt Woollard		Added moveAssetInLightbox
d15		07-May-2009		Matt Woollard		Added preventTimeout
d16		08-Jun-2009		Matt Woollard		Changed add to lightbox so counter isn't updated until OK response received
d16		Jun-2010		Ben Browning		Rewriting lots of code for jQuery switchover
d17		Sep-2010		Ben Browning		Rewrote navigation js and image hover preview to be leaner and use jQuery
----------------------------------------------------------------------
Copyright 2010 Bright Interactive, All Rights Reserved.
*/

/* 
======================================================================
JAVASCRIPT STYLES
----------------------------------------------------------------------
Anonymous function that dynamically inserts a stylesheet link to 
js-enabled.css
Useful for initially hiding expanding content without any flicker
*/
(function () {
	var head = document.getElementsByTagName("head")[0];
	if (head) {
		var scriptStyles = document.createElement("link");
		scriptStyles.rel = "stylesheet";
		scriptStyles.type = "text/css";
		scriptStyles.href = "../css/standard/js-enabled.css";
		head.appendChild(scriptStyles);
	}
}());

/* 
======================================================================
POPUP WINDOWS
----------------------------------------------------------------------
*/

function popupGeneric(elm,options,href,windowRef) 
/*
----------------------------------------------------------------------
	d1		20-October-2008		Ben Browning		Created
	d2		23-April-2010		Ben Browning		Simplified so you pass it one element instead of an array
----------------------------------------------------------------------
Notes:
Generic popup window function. 

Arguments:
elm(required): is a reference to the elements for which the popup will be triggered onclick. 
	This means the function should be called once the page has loaded (so 
	the elements exist in the DOM). It can only contain one element, but it must be an array.
options(optional): for opening e.g. "width=x, height=y"
href(optional): specify the url (for links uses href value)
windowRef(optional): specify the reference to the window
*/
{
	var newWindow = window.open(href || elm.href, windowRef || "newWindow",options || "width=500,height=500,toolbar=no,location=no,status=no,menubar=no,resizable=yes,scrollbars=yes,titlebar=no");
	if(newWindow.blur){newWindow.focus();};
	return false;

}



function displayPopup(a_sURL)
/*
----------------------------------------------------------------------
	d1		16-Jun-2003		James Home			Created
----------------------------------------------------------------------
*/
{	
	mywindow=open(a_sURL ,'myname','resizable=no,scrollbars=yes,width=460,height=290');
	mywindow.location.href = a_sURL;
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupViewAgreement(a_lAgreementId)
/*
----------------------------------------------------------------------
	d10		10-Jul-2008		Matt Woollard		Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewAgreement?id=' + a_lAgreementId,'viewAgreement','resizable=yes,scrollbars=yes,toolbar=no,width=500,height=500');

	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupAddAgreement()
/*
----------------------------------------------------------------------
	d11		11-Jul-2008		Matt Woollard		Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/addAgreementPopup','viewAgreement','resizable=yes,scrollbars=no,toolbar=no,width=800,height=600');

	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}


function popupEditAgreement(a_lAgreementId)
/*
----------------------------------------------------------------------
	d11		11-Jul-2008		Matt Woollard		Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/editAgreementPopup?copy=1&id='+a_lAgreementId,'viewAgreement','resizable=yes,scrollbars=no,toolbar=no,width=800,height=600');

	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupViewImage(a_lImageId)
/*
----------------------------------------------------------------------
	d1		23-May-2005		James Home			Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewFullSizedImage?id=' + a_lImageId,'viewImage','resizable=yes,scrollbars=no,toolbar=no,width=500,height=500');
	
	// Is this required? If so for which browsers and can we only run it when necessary?
	// mywindow.location.href = '../action/viewFullSizedImage?id=' + a_lImageId;
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupViewImage(a_lImageId, imageWidth, imageHeight, hasMultipleLayers)
/*
----------------------------------------------------------------------
	d1		08-Jun-2005		James Home			Created
	d2		06-Mar-2006	Martin Wilson		Changed to specify size to viewFullSizedImage
----------------------------------------------------------------------
*/
{

	var screenWidth = imageWidth;
	var screenHeight = imageHeight;

	// Work out the size (largest of 2 dimensions):
	var iSize = imageWidth;

	if (imageHeight > imageWidth)
	{
		iSize = imageHeight;
	}
	// Limit the size of the popup window
	if(screenWidth>750)
	{
		screenWidth=750;
	}
	if(screenHeight>550)
	{
		screenHeight=550;
	}
	else if(hasMultipleLayers)
	{
		screenHeight+=60;
	}
	
	//screenWidth = 500;
	//screenHeight = 500;

	var sUrl = '../action/viewFullSizedImage?id=' + a_lImageId + "&size=" + iSize;
	
	if (hasMultipleLayers)
	{
		sUrl+='&layer=1';
	}
	
	mywindow=open(sUrl,'viewImage','resizable=yes,scrollbars=yes,toolbar=no,width=' + screenWidth + ',height=' + screenHeight);
	
	// Is this required? If so for which browsers and can we only run it when necessary?
	// mywindow.location.href = '../action/viewFullSizedImage?id=' + a_lImageId;
	
	mywindow.focus();

	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}


function popupFormatHelp()
/*
----------------------------------------------------------------------
	d1		20-Jun-2006		Ben Browning		Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewFormatHelp','HighResHelp','resizable=yes,scrollbars=yes,toolbar=no,width=500,height=500');

	mywindow.location.href = '../action/viewFormatHelp';
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupConditions(a_sAction)
{
	return (popupConditions(a_sAction,'false'));
}

function popupConditions(a_sAction,a_sExtra)
/*
----------------------------------------------------------------------
	d1		07-Jun-2005		James Home			Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/' + a_sAction + '?extra=' + a_sExtra,'viewConditions','resizable=yes,scrollbars=yes,toolbar=no,width=500,height=500');
	
	mywindow.location.href = a_sAction + '?extra='+ a_sExtra;
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupAssetUse(a_lAssetId)
/*
----------------------------------------------------------------------
	d1		24-Jun-2005		James Home			Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewAssetUsage?id=' + a_lAssetId,'viewAssetUsage','resizable=yes,scrollbars=yes,toolbar=no,width=590,height=500');

	mywindow.location.href = '../action/viewAssetUsage?id=' + a_lAssetId;
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupAssetAudit(a_lAssetId, a_lVersionNumber)
/*
----------------------------------------------------------------------
	d8		02-Apr-2008		Matt Woollard		Created	
	d9 		02-May-2008		Matt Woollard		Added versionNumber to popupAssetAudit
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewAssetAudit?id=' + a_lAssetId + '&versionNumber=' + a_lVersionNumber,'viewAssetUsage','resizable=yes,scrollbars=yes,toolbar=no,width=590,height=500');

	mywindow.location.href = '../action/viewAssetAudit?id=' + a_lAssetId + '&versionNumber=' + a_lVersionNumber;
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupAssetWorkflowAudit(a_lAssetId)
/*
----------------------------------------------------------------------
	d12		10-Oct-2008		Matt Woollard		Created	
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewWorkflowAudit?id=' + a_lAssetId, 'viewWorkflowAudit','resizable=yes,scrollbars=yes,toolbar=no,width=590,height=500');

	mywindow.location.href = '../action/viewWorkflowAudit?id=' + a_lAssetId;
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupHelp(section_name)
/*
----------------------------------------------------------------------
	d1		07-Jun-2005		James Home			Created
	d2		23-Feb-2007		Steve Bryan			I think this is redundant now - see handler at top of file
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewHelp?helpsection=' + section_name,'viewHelp','resizable=yes,scrollbars=yes,toolbar=no,location=no,width=500,height=500');

	mywindow.location.href = '../action/viewHelp?helpsection=' + section_name;
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupTerms(option_id)
/*
----------------------------------------------------------------------
	d1		07-Jun-2005		James Home			Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewTerms?id=' + option_id,'viewTerms','resizable=yes,scrollbars=yes,toolbar=no,location=no,width=500,height=500');

	mywindow.location.href = '../action/viewTerms?id=' + option_id;
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}


function attributePopup(assetId,attributeId,dataFromChildren)
/*
----------------------------------------------------------------------
	d1		28-Feb-2007		Matt Stevenson			Created
----------------------------------------------------------------------
*/
{
	mywindow=open('../action/viewAttributeValue?assetId=' + assetId + "&attributeId=" + attributeId + "&dataFromChildren=" + dataFromChildren,'AttributeValue','resizable=yes,scrollbars=yes,toolbar=no,location=no,width=500,height=250');

	mywindow.location.href = '../action/viewAttributeValue?assetId=' + assetId + "&attributeId=" + attributeId + "&dataFromChildren=" + dataFromChildren;
	
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}


function videoPopup(a_sURL)
/*
----------------------------------------------------------------------
	d1		11-Aug-2006		Ben Browning			Created
----------------------------------------------------------------------
*/
{	
	mywindow=open(a_sURL ,'myname','toolbar=no,location=no,resizable=yes,scrollbars=yes,width=558,height=400');
	mywindow.location.href = a_sURL;
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}



function audioPopup(a_sURL)
/*
----------------------------------------------------------------------
	d6		28-Feb-2007		Matt Stevenson		Created
----------------------------------------------------------------------
*/
{	
	mywindow=open(a_sURL ,'myname','toolbar=no,location=no,resizable=yes,scrollbars=yes,width=420,height=200');
	mywindow.location.href = a_sURL;
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function popupPreview(a_sURL,a_iWidth,a_iHeight)
/*
----------------------------------------------------------------------
	d7		05-Feb-2008		James Home		Created
----------------------------------------------------------------------
*/
{	
	if(a_iWidth<=0)
	{
		a_iWidth = 800;
	}
	if(a_iHeight<=0)
	{
		a_iHeight = 600;
	}
	
	mywindow=open(a_sURL ,'myname','toolbar=no,location=no,resizable=yes,scrollbars=yes,width=' + (a_iWidth+50) + ',height=' + (a_iHeight+80));
	mywindow.location.href = a_sURL;
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}

function differencePopup(a_sURL)
/*
----------------------------------------------------------------------
	d6		07-Sep-2011		Adam Howse		Created
----------------------------------------------------------------------
*/
{	
	mywindow=open(a_sURL ,'myname','toolbar=no,location=no,resizable=yes,scrollbars=yes,width=740,height=650');
	mywindow.location.href = a_sURL;
	mywindow.focus();
	if (mywindow.opener == null) 
	{
		mywindow.opener = self;
	}
}


/* 
======================================================================
Show and Hide
----------------------------------------------------------------------
*/
function expand_content(item)
/*
----------------------------------------------------------------------
	d1		03-Jan-2007		Ben Browning			Created
----------------------------------------------------------------------
*/
{
	if( document.getElementById && document.getElementsByTagName ){
  		if( document.getElementById(item) ){
   		var check = document.getElementById(item);
   			document.getElementById('expandLink').style.display = 'none';
				document.getElementById('collapseLink').style.display = 'block';
   			check.style.display = 'block';
   			return false;
   		}
 	}
}
	
function collapse_content(item)
/*
----------------------------------------------------------------------
	d1		03-Jan-2007		Ben Browning			Created
----------------------------------------------------------------------
*/
{
	if( document.getElementById && document.getElementsByTagName ){
  		if( document.getElementById(item) ){
    		var check = document.getElementById(item);
   			document.getElementById('expandLink').style.display = 'block';
   			check.style.display = 'none';
   			return false;
   		}
	}
}

function showHide(id,imgId)
/*
----------------------------------------------------------------------
	d1		???				James Home				Created			
	d2		11-May-2009		Ben Browning			Moved into bright_util.js
----------------------------------------------------------------------
This function is used to show and hide attribute groups on asset detail pages
*/
{
	var element = document.getElementById(id);
	var image = document.getElementById(imgId);
	
	if(element)
	{
		if(element.style.display!='block')
		{
			element.style.display='block';
			image.src='../images/standard/icon/attr_collapse.gif';
		}
		else
		{
			element.style.display='none';
			image.src='../images/standard/icon/attr_expand.gif';
		}
	}
}




/* 
======================================================================
AJAX FUNCTIONS
----------------------------------------------------------------------
Misc UI enhancing functions
*/
/*
----------------------------------------------------------------------
Image Hover
----------------------------------------------------------------------
	d1		???				Ben Browning			Created		
	d2		11-May-2009		Ben Browning			No longer use an 
													ajax call and position 
													image so it doesn't run 
													off the page
	d3		June-2010		Ben Browning			Changed to use jQuery
	d4		Mar-2011		Ben Browning			More intelligent positioning of popup
----------------------------------------------------------------------

NOTES:
The following functions dynamically create a preview image, alter its 
position if necessary and display it.
NB: Makes use of jQuery
*/

var timedFunction;		// global variable for timeout timer so can cancel it in hide function
var imageWidth;			// global variables for current popup image dimensions
var imageHeight;
var thumbheight;
var uniqueId;			//global variable for a unique id to identify the currrent asset being hovered over
var loaded=0;			// flag for whether image is loaded (used to eliminate flicker of loading graphic)


function showPreview(thumb,thisId,imgSrc) 
{
	// set global variable for current thumbnail height
	thumbHeight = thumb.height;
	// set global variable for id of this asset
	uniqueId = thisId;
	// show popup image after a short delay
	timedFunction = window.setTimeout("showPreviewSpan('"+imgSrc+"');", 400);
	
}

function showPreviewSpan(imgSrc) 
{	
	// show loading gif
	$j('#load_'+uniqueId).show();
	
	// initialise flag for whether popup is loaded
	loaded = 0;
	// create img element and handle load event
	var $fetchedImg = $j("<img/>")
		.attr('id','image_'+uniqueId)
		.load(positionImage); 
	// append it to the span element
	$j('#id_'+uniqueId).append($fetchedImg);
	// add the src attribute after we have added the element to the DOM if we want the load event to trigger
	// reliably in IE
	$fetchedImg.attr('src','../servlet/display?file='+imgSrc);
}

function positionImage(event)
{
	loaded=1;
	//hide loading gif
	$j('#load_'+uniqueId).hide();
	//show span containing popup
	$j('#id_'+uniqueId).show();
	// get reference to popup image on which this onload event has fired
	var img = event.target;
	// update global variables
	imageWidth = img.width;
	imageHeight = img.height;
	// flag to check we are on right hand of page - used when deciding whether to hide sort strip
	var rightHandEdge = false;
	
	// check position of image (check it still exists as hidePreview() may have deleted it)
	if ($j(img).length>0) {
		//initialise vertical position
		$j(img).parent().css('top','0px');
		
		var imgPosition = $j(img).parents('span.larger').offset();	// default position of containing span
		var sortStripPosition = $j('#sortForm').offset();	// get position of sort strip
		var browserWidth = $j(window).width();				// width of browser window	
		var scrollTop = $j(window).scrollTop();				// scroll position of browser window

		// debug: console.log('imgpositiontop:'+imgPosition.top+', height:'+imageHeight+', scrollTop:'+scrollTop);

		// set position of image if it is too close to right hand edge or top of browser
		if ((browserWidth - imgPosition.left) < imageWidth) {
			$j(img).parent().css('right','0px');
			// set flag
			rightHandEdge = true;
		}
		if ((imgPosition.top - scrollTop - thumbHeight) > imageHeight) {
			// want to shift image up by its height + the height of the thumbnail above it
			offsetY = imageHeight + thumbHeight + 5;
			$j(img).parent().css('top','-'+offsetY+'px');
		}	
		// having set the position now show the image (using visibility so IE still can calculate
		// image height and width).
		$j(img).css('visibility','visible');

	}
	// hide select drop downs - only required for IE6
	if($j('#sortForm').length>0) {
		if (imgPosition.top - sortStripPosition.top < 400 && !rightHandEdge) {
			$j('#sortForm select').addClass('ie6Hide');
		}	
	}
		
}
function hidePreview(uniqueId) 
{
	//cancel timeout
	window.clearTimeout(timedFunction);
	//get reference to popup image
	var imageId = '#image_'+uniqueId;
	if ($j(imageId)) {
		//delete image
		$j(imageId).remove();
	}	
	//hide popup span
	$j('#id_'+uniqueId).css('display','none');
	//hide loading image
	$j('#load_'+uniqueId).hide();
	//show select drop downs
	$j('#sortForm select').removeClass('ie6Hide');
}


/*
----------------------------------------------------------------------
Add to lightbox
----------------------------------------------------------------------
NOTES:
Uses Ajax to dynamically add assets to lightbox.
*/
function addToLightBox(thisLink,assetId, numAssets, forwardParams) 
/*
----------------------------------------------------------------------
	d1		18-Aug-2008		Matt Woollard			Created
	d2		26-Mar-2009		Ben Browning			Modified to work without the invalid hidden fields
													(Makes use of prototype)
	d3		08-Jun-2009		Matt Woollard			Changed add to lightbox so counter isn't updated until OK response received
	d4		09-Nov-2010		Ben Browning			Changed so that it now toggles between 2 seperate links rather then modifying 
													the attributes of the 'add to lightbox' link. Also moved some code to lbPanel object
----------------------------------------------------------------------
*/
{
	var divId = 0;
	var url = 'addToAssetBox?id=' + assetId + '&type=Ajax&'+forwardParams;
	
	var $thisLink = $j(thisLink);
	var $inLink = $thisLink.next("a.in");
	
	$thisLink.hide();				// hide 'add to lightbox' link
	$inLink.text('adding...');
	$inLink.show();					// show modified 'in lightbox' link
	
	$j.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data,textStatus,transport){		
		if (data.match("OK"))
		{
			// increment the relevant counts in the lightbox panel
			lbPanel.incrementCounts();

			// update the link text to show that it is successfully in the lightbox
			$inLink.text(document.getElementById("inLightBoxText").value);
		}
	  }
	});
	
}

/*
----------------------------------------------------------------------
Add to lightbox
----------------------------------------------------------------------
NOTES:
Simple add to lightbox - just takes asset id
*/
function addToLightBoxSimple(assetId)
{
	var url = 'addToAssetBox?id=' + assetId + '&type=Ajax&';
	var currentCount = lbPanel.$container.find('#lbText strong').text();
	$j.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data,textStatus,transport){		
		if (data.match("OK")) {
			var nameIndex = data.indexOf("num-assets-in-box");
            var valueIndex = data.indexOf('value="', nameIndex) + 7;
            var newCount = parseInt(data.slice(valueIndex, data.indexOf('"', valueIndex)));
            if (newCount != currentCount) {
				lbPanel.incrementCounts();
			} else {
				// asset is already in their lightbox
			}
		}
	  }
	});
}


/*
----------------------------------------------------------------------
Reordering Assets
----------------------------------------------------------------------
NOTES:
Uses Ajax to dynamically move assets in lightbox.
*/
function moveAssetInLightbox(assetId, assetIdInfrontOf) 
/*
----------------------------------------------------------------------
	d15		22-Jan-2009		Matt Woollard		Created
----------------------------------------------------------------------
*/
{	
	var divId = 0;
	var url = 'moveAssetInAssetBox?id=' + assetId + '&moveTo='+assetIdInfrontOf;
	var myAjax = new Ajax.Updater(divId, url, {method: 'get'});
	
}


/*
----------------------------------------------------------------------
Dynamic bulk upload
----------------------------------------------------------------------
NOTES:
Uses Ajax to dynamically update the bulk import page so we no longer have 
to rely on an ugly meta refresh.
*/
function ajaxUpdate(url, match_text, url2) 
/*
----------------------------------------------------------------------
	d1		1-Apr-2009		Ben Browning		Created
	d2		22-May-2009		Ben Browning		Removed 'decay' feature (i.e. set to 1)
	d3		19-May-2010		Ben Browning		Convert to jquery. Recursive aspect is now achieved by using setInterval 
												when calling this function (See view_data_import.jsp).
----------------------------------------------------------------------
*/
{
	//jQuery Ajax function
	$j.get(url, function(data){
		//update page
		$j('#ajaxUpdateContent').html(data); 
		//check if it contains the match text eg 'Import Complete', 'TASK COMPLETE'
		if (data.indexOf(match_text) >= 0) {
			// if it does, force page reload
			window.location = url2;
		} 
		
	});
		
}

/*
----------------------------------------------------------------------
Prevent timeout
----------------------------------------------------------------------
NOTES:
This prevents users seeing a timeout message 
It accesses the homepage every 60 seconds 
*/
function preventTimeout() 
/*
----------------------------------------------------------------------
	d15		07-May-2009		Matt Woollard		Created
----------------------------------------------------------------------
*/
{
	new Ajax.PeriodicalUpdater('container', 'refreshSession', {
		// make the call every 60 seconds
		frequency: 60,
		onSuccess: function(myRequest) {
		}
	});
}

/*
----------------------------------------------------------------------
Set up Autocompleter fields
----------------------------------------------------------------------
NOTES:
Now using jquery UI autocomplete plugin
*/

function splitString( val, delim ) {
	// return an array of values split by the delimiter
	return val.split( delim );
}
function extractLast( term, delim) {
	// get the last bit of a string following a delimiter
	return splitString( term, delim ).pop();
}


function initJQAutocompleter($input,delimiters,attrId,searchEdit,langCode)
/*
----------------------------------------------------------------------
	d1		20-July-2011		Ben Browning		Created - replaces old scritaculous autocomplete
----------------------------------------------------------------------
Note: delimiters, attrId, searchEdit and langCode are optional parameters
*/

{
	// Is there a delimiter in play? If so we need to be able to deal with multiple values in the input field
	var delimSet = true;
	var delim = "";
	if (typeof delimiters == "undefined" || delimiters=="") {
		var delimSet = false;
	} else {
		delim = delimiters[0];
	}
	// pass an attributeId parameter to do auto-completion for a particular attribute ID. Don't pass an
	// attributeId parameter to do auto-completion for all attributes (e.g. for the quick search)
	if (typeof attrId == "undefined") {
		attrId = "";
	}	
	// set default behaviour to 'search'
	if (typeof searchEdit == "undefined") {
		searchEdit = "search";
	}	
	// check for language code, if not set as empty string
	if (typeof langCode == "undefined") {
		langCode = "";
	}	
	var autocompleteOptions = {
		source: function(request, response) {
			var term = request.term;
			if(delimSet) {
				// if multiple values, only want to send last snippet of text
				term = extractLast(term, delim);
			}
			$j.ajax({
				url:"../action/autoComplete",
				dataType: "json",
				type: "POST",
				html:true,
				data: {
					prefix: term,
					attributeId: attrId,
					completeType: searchEdit,
					languageCode:langCode
				},
				success: function(data,textStatus,jqXHR) {
					// Check user hasn't changed the term in the meantime
					var newTerm = $input.val();
					if(delimSet) {
						newTerm = extractLast(newTerm, delim);
					}
					if (term == newTerm) {
						response(data);
					}
				}
				//TODO error handling
			})
		},
		minLength: 2,
		focus: function() {
			// prevent value inserted on focus
			return false;
		},
		select: function(event,ui) {
			//only add a delimter if a delimeter has been defined
			if (delimSet) {
				var terms = splitString( this.value, delim );
				// remove the current input
				terms.pop();
				// add the selected item
				terms.push( ui.item.value );
				// add placeholder to get the comma-and-space at the end
				terms.push( "" );
				this.value = terms.join( delim );
				return false;
			} else {
				this.value = ui.item.value;
			}

		}
	};
	// deal with the min length when you have multiple values in an input field
	if (delimSet) {
		autocompleteOptions.search = function() {
			// get length of characters typed after last delimiter
			var term = extractLast( this.value, delim );
			if ( term.length < 2 ) {
				return false;
			}
		}
	}
	// initialise autocompleter
	$input
		// if we have multiple values, prevent tab from switching focus to next field
		.bind( "keydown", function( event ) {
			if ( (event.keyCode === $j.ui.keyCode.TAB) && ($j( this ).data( "autocomplete" ).menu.active ) && delimSet ) {
				event.preventDefault();
			}
		})
		.autocomplete(autocompleteOptions).data("autocomplete")._renderItem = function( ul, item ) {
			//allow for html in response
			return $j( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<a>"+ item.label + "</a>" )
				.appendTo( ul );
	};
}


/*
----------------------------------------------------------------------
 James Home's code for access level rows.
----------------------------------------------------------------------
*/
var ajaxIsBusy = false;

function ajaxBusy()
{
	ajaxIsBusy = true;
	$j('.ajaxLoader').show();
}

function ajaxNotBusy()
{
	ajaxIsBusy = false;
	$j('.ajaxLoader').fadeOut(600);
}

/*
 * Inserts the response of the ajax call (if successful) after the element with the passed id. Does 
 * nothing if the request returns an error code or the element doesn't exist.
 */
function insertResponseAfter(elementId, ajaxUrl)
{
	if(ajaxIsBusy)
	{
		return;
	}
	
	if(document.getElementById(elementId))
	{
		ajaxBusy();
		
		new Ajax.Request(ajaxUrl, 
		{
			method: 'get',
			onSuccess: function(transport) 
			{
				$j('#'+elementId).after(transport.responseText);
				ajaxNotBusy();
			},
			onFailure: function(transport)
			{
				ajaxNotBusy();
			}
		});
	}
}

/*
 * Makes an ajax request, hiding all the elements of class elementClass on success.
 */
function hideOnAjaxSuccess(elementClass, ajaxUrl)
{
	if(ajaxIsBusy)
	{
		return;
	}

	ajaxBusy();
	
	new Ajax.Request(ajaxUrl, 
	{
		method: 'get',
		onSuccess: function(transport) 
		{
			$j('.'+elementClass).hide();
			ajaxNotBusy();
		}
		,
		onFailure: function(transport)
		{
			ajaxNotBusy();
		}
	});

}

//This function inserts newNode after referenceNode
function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}



/*
* jQuery UI Autocomplete HTML Extension
*
* Copyright 2010, Scott González (http://scottgonzalez.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* http://github.com/scottgonzalez/jquery-ui-extensions
*/
(function( $ ) {

var proto = $.ui.autocomplete.prototype,
initSource = proto._initSource;

function filter( array, term ) {
var matcher = new RegExp( $.ui.autocomplete.escapeRegex(term), "i" );
return $.grep( array, function(value) {
return matcher.test( $( "<div>" ).html( value.label || value.value || value ).text() );
});
}

$.extend( proto, {
_initSource: function() {
if ( this.options.html && $.isArray(this.options.source) ) {
this.source = function( request, response ) {
response( filter( this.options.source, request.term ) );
};
} else {
initSource.call( this );
}
},

_renderItem: function( ul, item) {
return $( "<li></li>" )
.data( "item.autocomplete", item )
.append( $( "<a></a>" )[ this.options.html ? "html" : "text" ]( item.label ) )
.appendTo( ul );
}
});

})( jQuery );


/*
----------------------------------------------------------------------
Category Explorer code
----------------------------------------------------------------------
NOTES:
Uses jQuery. The Html required is produced by the custom tag <ab:categoryExplorer />
Usage:
	- Initialise by calling bbExplorer.init() once the DOM is loaded.
	- Any of the default config options can be overwritten by passing in a settings object. 
*/

var bbExplorer = {
	
	init : function(settings) {
		//console.time('init') 
		// default config
		bbExplorer.config = {
			$wrapper : $j('#explorerCategories'),
			$contentHolder : $j('#categoryContent'),
			loadingImg : '<img src="../images/standard/misc/ajax_loader.gif" alt="loading" class="loading" />'
		}
		// provide for custom configuration via init()
		if (settings && typeof(settings) == 'object') {
			$j.extend(bbExplorer.config, settings);
		}
		
		//reference to all category links
		var $allCatLinks = bbExplorer.config.$wrapper.find('a');

		
		//handle clicks on links in the explorer tree - different behaviour depending on type of link
		$allCatLinks.click(function() {
			var $thisLink = $j(this)
			
			if ($thisLink.hasClass('expand')) {						// This is a node expand link
				//toggle link styles and visibility of ul:
				var $catLink = $thisLink.siblings("a");
				bbExplorer.toggleLinks($catLink,$thisLink);
				return false;

			} else {												// This is a category link
				// handle click event on category links
				bbExplorer.catClick($thisLink, $allCatLinks);
				return false;
			}
			
		});
		
		
		// handle click events on any pager links that appear in the loaded content
		bbExplorer.config.$contentHolder.find('div.pager a').live('click', function() {
		 		bbExplorer.loadContent($j(this).attr('href'));
		 		return false;
		});
				
		
		bbExplorer.expandCurrentCat();
		//console.timeEnd('init') 
	
	},

	createExpanderLink : function($li) {
		if ($li.children('ul').length) {
			$j("<a href='#' class='expand'>&nbsp;</a>")
				.click(function() {
					//toggle link styles and visibility of ul:
					var $expanderLink = $j(this);
					var $catLink = $expanderLink.siblings("a");
					bbExplorer.toggleLinks($catLink,$expanderLink);
					return false;
				})
				//insert expander link into the start of this li
				.prependTo($li);			
		}
	
	},
	
	toggleLinks : function($catLink,$expanderLink) {
		// change icon to an open folder and try and open sub list
		$catLink.toggleClass('open')
			.siblings("ul")
			.toggle();
		// if expander link exists toggle its class	
		if ($expanderLink.length) {	
			$expanderLink.toggleClass('collapse');
		}	
			
	},
	
	catClick : function($catLink,$allCatLinks) {
		//make this link the only highlighted one.
		$allCatLinks.removeClass('current');
		$catLink.addClass('current');
		
		// load the category content
		bbExplorer.loadContent($catLink.attr('href'));
		
		// expand any sub categories
		var $subCats = $catLink.siblings("ul");
		if ($subCats.length) {
			$subCats.show();
			$catLink.addClass('open')
		}
		$catLink.siblings("a").addClass('collapse');	
	},
	
	
	
	loadContent : function(href) {
		// show loading gif until new content loaded
		bbExplorer.config.$contentHolder.empty().html(bbExplorer.config.loadingImg);
		// load content
		bbExplorer.config.$contentHolder.load(href, function() {
			// stripe any tables
			bbExplorer.config.$contentHolder.find('table.stripey').each(function() {
				$j(this).find('tr:even').addClass('even');
			});
		});
	},
	
	expandCurrentCat : function() {
		// The current cat will have the class 'current'. Use this to find it and expand it's parents		
		bbExplorer.config.$wrapper.find('a.current').each(function() {
			$this = $j(this);
			var url = $this.attr('href');
			if (bbExplorer.pagingParams.page > 0) {
				url = url + '&page='+bbExplorer.pagingParams.page+'&pageSize='+bbExplorer.pagingParams.pageSize
			}
			
			// load the content for the current category by triggering the click action
			bbExplorer.loadContent(url);
			
			$this						
				.addClass('open')
				.parents('ul')
					.each( function(){			// toggle parent uls and change links
						$thisUl = $j(this);
						var $catLink = $thisUl.siblings('a:not(.expand)');
						var $expanderLink = $thisUl.siblings("a.expand");
						bbExplorer.toggleLinks($catLink,$expanderLink);
					})
				.end()								// reset context back to current cat link
				.children("a:first")					
					.toggleClass('collapse');	//toggle the associated expander link
					
			// If the current folder is out of sight, scroll to it:
			var scrollPos = $this.position();	
			if (scrollPos.top > 450){ 
				bbExplorer.config.$wrapper.find('.explorerCatWrapper').scrollTop(scrollPos.top);	
			}	
		});
	},
	
	// variables to hold paging values:
	pagingParams : {
		page: 0,
		pageSize: 0
	}

};

/*
----------------------------------------------------------------------
Lightbox Panel code
----------------------------------------------------------------------
NOTES:
Uses jQuery. Enables a dynamic drop down for switching lightboxes or adding new ones on the fly.
Usage:
	- Initialise by calling lbPanel.init() once the DOM is loaded.
	- Any of the default config options can be overwritten by passing in a settings object. 
*/
var lbPanel = {
	config : {
			container : '#lbPanel'
	},
		
	init : function(settings) {
		// handle custom settings and initialise

		// provide for custom configuration via init()
		$j.extend(lbPanel.config, settings);

		// create and/or cache some DOM elements we'll want to use throughout the code
		lbPanel.$container = $j(lbPanel.config.container);
		lbPanel.$drop = lbPanel.$container.find('div.dropOptions');
		lbPanel.$dropLink = lbPanel.$container.find('a.dropLink');
		
		// BB Dec2011 - Note, the toggling of the drop down is now done by more generic dropdown
		// click event on input
		lbPanel.$drop.find('input').click(function(e) {
			//e.stopPropagation(); 			// stop dropdown closing
			$thisInput = $j(this);			
			// do something different depending on which input has been clicked
			if ($thisInput.hasClass('text')) {
				// clear input
				if($thisInput.val() == 'Create new...' ) {
					$thisInput.val('');
				}
			} else {											// Add button was clicked
				var $textInput = $thisInput.prev('input')		// Get reference to text input
				if ($textInput.val() == '') {
					// error - name is empty
					alert('Please enter a value for the new lightbox name.');
					$textInput.blur();							// Remove focus else hitting enter to close the js popup triggers click event on add button.
					return false;
				} else {
					// add new lightbox
					lbPanel.addLightbox($thisInput);
					// clear text input and give focus
					$textInput.val('').focus();
				}
			}
		
		});
		
		// keydown event on text field - handle user hitting enter to submit the form
		lbPanel.$drop.find('input.text').keyup(function(event){
			if(event.keyCode == 13){
				$j(this).next('input').click();
			}
		});

		// click event on 'empty' link 
		lbPanel.$container.find('a.empty').click(function(e) {
			e.preventDefault();
			lbPanel.emptyLightbox($j(this));
		});
		
	},
	
	addLightbox : function($addButton) {
		// dynamically add a new lightbox
		var newName = $addButton.siblings('input').val();
		var $addLi = $addButton.parent();
		// create holding li (with loading gif) and insert at end of the list
		var $newLi = $j('<li><img src="../images/standard/misc/load_bar.gif" alt="loading"></li>');
		var $parentUl = lbPanel.$drop.find('ul');
		$newLi.appendTo(lbPanel.$drop.find('ul'));	
		
		// scroll to bottom of list so user can see the lightbox being added
		var scrollUl = lbPanel.$drop.find('ul').get(0);			// the get call returns a DOM element rather than a jquery object
		scrollUl.scrollTop = scrollUl.scrollHeight;
		
		var myUrl = "../action/addAssetBox";
		var myData = { 'ajax': true, 'name': newName};
		//perform ajax call which creates new lightbox in the back end and returns the new name and id
		$j.ajax({
			type: "GET",
			url: myUrl,
			data: myData,
			success: function(data, textStatus, xhr) {
				$newLi.html('<li><a href="../action/switchAssetBox?currentAssetBoxId='+data.lbID+'"><span class="name">'+data.lbName+'</span> <span class="count">(0)</span></a></li>').effect("highlight", {}, 1500);
			},
			dataType: "json", 
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(textStatus);
				$newLi.remove();
			}
		});

	},
	
	
	emptyLightbox : function($emptyLink) {
		var response = confirm('Are you sure you want to remove all the items from this lightbox?');
		if (response == true) {
			// call remove all action...
			var myUrl = $emptyLink.attr('href');
			$j.ajax({
				url: myUrl,
				success: function(data){
					// set counts to zero
					lbPanel.resetCounts();				
					//reset all 'add to lightbox' links
					lbPanel.resetAddLinks();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert ("Error: " + textStatus);
				}
			});
			
		
		} 
	},
	
	resetAddLinks : function() {
		// show all 'add to lightbox' links
		var $addCollection = $j('#content ul.lightbox a.add').add('#content table.lightboxList a.add');
		$addCollection.show(); 
		// hide all 'in lightbox' links
		var $inCollection = $j('#content ul.lightbox a.in').add('#content table.lightboxList a.in');
		$inCollection.hide(); 
	},
	
	showEmptyLink : function() {
		lbPanel.$container.find('a.empty').addClass('on');
	},
	
	incrementCounts : function() {
		// there are 2 counts, one in the lbPanel text and one in the drop down
		//var $count1 = lbPanel.$container.find('li.current span.count'); - this did not work when user not logged in.
		var $count1 = lbPanel.$container.find('#lbText strong');
	
		var newCount = parseInt($count1.text()) + 1;				
		
		// update the lightbox panel text
		if (newCount==1) {
			// if there were 0 items, now there's 1 so use different text (which is got from a hidden span on the page)
			document.getElementById("itemsInLightbox").innerHTML = document.getElementById("itemInLightBoxText").innerHTML;
			lbPanel.showEmptyLink();			//show 'empty this lightbox' link in the lbPanel
		} else {
			document.getElementById("itemsInLightbox").innerHTML = document.getElementById("itemsInLightBoxText").innerHTML;
		}
		
		var $count2 = lbPanel.$container.find('#lbText strong').eq(0);  // needs to happen after text change above else references wrong strong tags
		
		// update the counts
		$count1.text(newCount);
		$count2.text(newCount);
	},
	
	resetCounts : function() {
		var $counts = lbPanel.$container.find('#lbText strong');
		$counts.add('li.current span.count').text('0');	
	}

}


/*
----------------------------------------------------------------------
Equal Heights Function
----------------------------------------------------------------------
NOTES:
Uses jQuery. Fixes issue of different asset reult panel heights due to long display attributes.
Usage
	equalHeights($elements); Sets all columns to the same height.            
 
 */


function equalHeights($elements) {
	var tallest = 0;
	$elements.each(function() {
		var thisHeight = $j(this).innerHeight();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		} 
	});
	$elements.each(function() {
		$j(this).height(tallest);
	});
	

}


/*
----------------------------------------------------------------------
Drag and drop sorting - used to reorder attributes, slideshows etc..
----------------------------------------------------------------------
NOTES:
Uses jQuery and jQuery UI
Usage
- Include the jquery UI files in the head of the jsp.
- The things you want to sort must be in a table with the css class 'list', any tr elements within a tbody will be sortable.
- Give each sortable tr a class attribute set to the id of whatever you are sorting (prefixed with 'id'). Example: <tr class="idXXX"
- Give one of the table cells in each row the class 'sort' (usually the first) - this provides a handle for the user to click and drag
- Set a js variable called 'sortingAction' to the url that you want to call upon each sort. And make sure that action is set up to
  receive 2 parameters: id (id of the current thing) and moveTo (id of the thing it is being moved in front of)

*/

function initSorting(sortingAction) {
	$j('table.list tbody').sortable({
		placeholder: 'landing',
		start: function(event, ui) {					// called on start of drag
			ui.helper.addClass('active');
			var start_pos = ui.item.index();			// get starting position of element
			ui.item.data('start', start_pos);
		}, 
		update: function(event, ui) {					// called on drop
			ui.item.removeClass('active');				// remove highlighting
			ui.item.find('td').addClass('disabled')
			// Get parameters for ajax call:
			var draggedId = ui.item.attr('class').replace('id','');   	
			var $nextItem = ui.item.next('tr');
			
			if ($nextItem.length > 0) {
				var draggedBeforeID = $nextItem.attr('class');
				draggedBeforeID = draggedBeforeID.replace('id','');
			} else {
				var draggedBeforeID = -1;
			}
            // set up main ajax data
			var ajaxData = {
	        	id : draggedId,
				moveTo : draggedBeforeID
			}      
			// extra ajax data fields
			var groupId = ui.item.parents('table').attr('id');  
			if (groupId != "") {
				ajaxData.daGroupId = groupId;
			}   
			// Ajax call to cement new position
			$j.ajax({
				url: sortingAction,
				data: (ajaxData),
				success: function(data) {
					ui.item.find('td').removeClass('disabled')
					ui.item.effect("highlight", {}, 1500)
				}
			});
		},
		helper: function(event, $tr) {
			// the following code stops the table cells shrinking while they are being dragged
			var $originals = $tr.children();
			var $helper = $tr.clone();
			$helper.addClass('active');
			var $helperKids = $helper.children();

			$helperKids.each(function(index) {
				// Set helper cell sizes to match the original sizes
				var origWidth = $originals.eq(index).innerWidth();
				//$j(this).css('width',origWidth+'px');
				$j(this).innerWidth(origWidth);			// BB - using width() causes a 'type mismatch' error in IE8
			});

			return $helper;
		}	
	});
	
	// Fix text selection issue in Chrome
	$j('table.list td.sort').each(function() {
		this.onselectstart = function() {return false};
	});
}

/*
----------------------------------------------------------------------
Video keywording interface
----------------------------------------------------------------------
*/             
var vidKeywords = {
	init : function (settings) {
		// set up some variables as properties
		vidKeywords.assetId = settings.assetId;
		vidKeywords.errorMessage = "";
		vidKeywords.vkid = 0;		    
		vidKeywords.content = settings.validationMessages;  
		vidKeywords.endTime = "";
		
		$j('a.get').click(function () {
			var $this = $j(this)
			// get current video point and insert into correpsonding input field
			var position = Math.round(jwplayer().getPosition());
			var splitTime = vidKeywords.convertFromSecs(position);
			if ($this.hasClass('start')) {
				$j('#start_point').val(position);				
			} else if ($this.hasClass('end')) {
				$j('#end_point').val(position);
			}
			return false;
		});   
		               
		$j("#addKeywordForm").click(function () {     
			var startPoint = $j('#start_point').val();
			var endPoint = $j('#end_point').val();  
			var keywords =  $j('#keywords1').val();
            vidKeywords.vkid = 0;
            vidKeywords.add(keywords,startPoint,endPoint,vidKeywords.vkid);
            return false;
		});  
		$j("#saveKeywordForm").click(function () {  
			var startPoint = $j('#start_point').val();
			var endPoint = $j('#end_point').val();  
			var keywords =  $j('#keywords1').val(); 
 			vidKeywords.add(keywords,startPoint,endPoint,vidKeywords.vkid);
			$j('#keywordsWrapper').removeClass('edit'); 
			return false;    
		});	
	},  
	
	convertFromSecs : function (time) {
		var hours = Math.floor(time / 3600);
		time = time - hours * 3600;
		var minutes = Math.floor(time / 60);
		var seconds = time - minutes * 60;
		var splitTime = {
			'hh' : hours,
			'mm' : minutes,
			'ss' : seconds
		}
		return splitTime
		
	},
	getSecs : function(timeStr) {
	    var time = timeStr.split(':');
		var convertedTime = "";
		var length = time.length; 
		var sec = parseInt(time[length-1]);
		var	min = parseInt(time[length-2]) * 60;
			
		convertedTime = sec + min;
		if (length == 3) {
			//deal with hours too
			var hrs = time[length-2] * 3600;
			convertedTime = convertedTime+hrs;
		}
		return convertedTime;
		
	},
	
	validate : function (keywords, startPoint, endPoint) {     
		// Validate form fields and build a javascript validation error message
		var bValid = true;  
		vidKeywords.errorMessage = '';
		
        if (keywords == "") {
			vidKeywords.errorMessage = vidKeywords.content.keywords;
			bValid = false;
		}  
		if (startPoint == "") {
			vidKeywords.errorMessage = vidKeywords.errorMessage + vidKeywords.content.start;
			bValid = false;
		}     
		
        if (parseInt(startPoint) >= jwplayer().getDuration()){
        	vidKeywords.errorMessage = vidKeywords.errorMessage + vidKeywords.content.overstart;
        	bValid = false;
        }
        
        if (parseInt(endPoint) > jwplayer().getDuration()){
        	vidKeywords.errorMessage = vidKeywords.errorMessage + vidKeywords.content.overend;
        	bValid = false;
        }
		
		if (endPoint) {
			if (parseInt(endPoint) < parseInt(startPoint)) {
				vidKeywords.errorMessage = vidKeywords.errorMessage + vidKeywords.content.end; 
				bValid = false;  
			}     
		}	
		return bValid;
	},
	
	add : function (keywords, startPoint, endPoint, vkid) {  
		var startPoint = startPoint +''; //convert to string
		// parse time fields 
		if(startPoint.indexOf(':') != -1){
			startPoint = vidKeywords.getSecs(startPoint);
		} else {
			startPoint = parseInt(startPoint);
		}
		if (endPoint) {
			var endPoint = endPoint +'';	//convert to string
			if (endPoint.indexOf(':') != -1){
				endPoint = vidKeywords.getSecs(endPoint);
			} else {
				endPoint = parseInt(endPoint);
			}
		} 
		
		// call validation and perform ajax call if successful:   
		if ( vidKeywords.validate(keywords, startPoint, endPoint) ) {  
			
			var data = {
				'id' : vidKeywords.assetId,
				'vkId' : vkid,
				'start' : startPoint,
				'end' : endPoint
			};

			$j('#keywordsWrapper input.keywordsField').each(function() {
				$this = $j(this);
				data[$this.attr('id')] = $this.val();
			});
			
			// perform Ajax call
			$j.ajax({
				type: "POST",
				url: "../action/saveVideoKeyword",
				data: data,
				success: function(response){
					$j('#keywordsList').empty().append(response);
					$j('#keywordsWrapper tr.updated').effect("highlight", {}, 1500)
				} 
			});     
			 
			// reset form values
			$j('#keywordsWrapper input.keywordsField').val('')
			$j('#keywords1').focus();
			$j('#start_point').val('');
			$j('#end_point').val('');  
		} else {
			alert(vidKeywords.errorMessage);
		}                     
	}, 
	
	edit : function (vkid, keywords, startPoint, duration) {  
		// Populate keywords from and switch to edit mode:
		
		$j.each(keywords, function(key,value) {
			$j('#'+key).val(value);
		});
		$j('#keywords1').focus();
		$j('#start_point').val(startPoint);     
		if(duration>0) {
		   $j('#end_point').val(startPoint+duration); 
		}
		     
		//switch to edit mode
		$j('#keywordsWrapper').addClass('edit'); 
		vidKeywords.vkid = vkid; 
	},
	
	deleteKeyword : function (keywordId, thisLink) {        
		//animate hide on this row
		$j(thisLink).parents('tr').hide('slow');       
		// perform Ajax call
		$j.ajax({
			type: "POST",
			url: "../action/deleteVideoKeyword",
			data: "id="+vidKeywords.assetId+"&vkId="+keywordId,
			success: function(response){
				//$j('#keywordsList').empty().append(response);   
				//animate hide on this row
				$j(thisLink).parents('tr').hide('slow');
			} 
		});   
	},    
	
	seekAndPlay : function (time, endTime) {		
		jwplayer().seek(time).play(true);
		vidKeywords.endTime = endTime
		
		if (typeof vidKeywords.endTime != "" && vidKeywords.endTime > time) {
			//stop at endTime
			var stopped = false;
			jwplayer().onTime(function(event) {
				if (!stopped) {
					if (event.position >= vidKeywords.endTime) {
						stopped = true;
						jwplayer().pause(true);
					}
				} 

			})
		}
	}
}

/*
----------------------------------------------------------------------
Date picker - using jquery ui datepicker
----------------------------------------------------------------------
*/

function initDatePicker() {
	//Date picker fields
	setDateFormat = jqDateFormats.standard;				

	// Simple date picker
	$j('#mainCol input.date').datepicker({
		showOn: "button",
		buttonImage: "../images/standard/icon/calendar.gif",
		buttonImageOnly: true,
		dateFormat: jqDateFormats.standard,				// date format comes from app settings
		constrainInput: false,
        beforeShow: function(input) {
			// BB - had to deactivate this functionality for time being to allow for flexible date formatting
			// TODO - get date range functionality working again with flexible dates.
			// Check if this is the end date field:
			// if (input.id.indexOf('endDate') >= 0) {
			// 				// Look for a start date:
			// 				var splitDate = $j(input).prevAll('input.date').val().split('/');
			// 				// Parse the date depending on which date format we are using:
			// 				if (daysBeforeMonths) {	
			// 					var minDate = new Date(splitDate[2],splitDate[1]-1,splitDate[0]);
			// 				} else {
			// 					var minDate = new Date(splitDate[2],splitDate[0]-1,splitDate[1]);
			// 				}
			// 				// Increment by 1 day:
			// 		        minDate.setDate(minDate.getDate()+1);
			// 				// Set the minDate for this picker:
			// 		        return {
			// 		            minDate: minDate
			// 		        };
			// 				
			// 		    }  
			$j('#ui-datepicker-div').removeClass('noDays');		// make sure days appear (incase a month picker has hidden them)
		}		
	});
	
	// Month and year only version of datepicker
	$j('#mainCol input.monthPicker').datepicker({
		showOn: "button",
		buttonImage: "../images/standard/icon/calendar.gif",
		buttonImageOnly: true,		
		changeMonth: true,
	    changeYear: true,
	    showButtonPanel: true,
	    dateFormat: jqDateFormats.yearMonth,			// date format comes from app settings
		yearRange: '1900:2100',
		beforeShow : function(input, inst) {
			var $this = $j(this);
	        if ((datestr = $this.val()).length > 0) {
				var parsedDate = Date.parse(datestr);	// parse the date using date.js library
	            $this.datepicker('option', 'defaultDate', parsedDate);
	            $this.datepicker('setDate', parsedDate);	
	        }
			$j('#ui-datepicker-div').addClass('noDays');		// css to hide days in popup
	    },
	    onClose: function(dateText, inst) { 
			// set to 1st of the chosen month on close
	        var month = $j("#ui-datepicker-div .ui-datepicker-month :selected").val();
	        var year = $j("#ui-datepicker-div .ui-datepicker-year :selected").val();
	        $j(this).datepicker('setDate', new Date(year, month, 1));
		}
	    

	});

}


/*
----------------------------------------------------------------------
Javascript dropdown links/buttons
----------------------------------------------------------------------
*/
function initDropLinks() {
	$j('a.dropButton, a.dropLink').click(function(e) {
		var $dropButton = $j(this);
		$dropButton.toggleClass('on').siblings('.dropOptions').toggle();

		//Now set up an event listener so that clicking anywhere outside will close the menu
	    $j('html').click(function(event) {
	        //check up the tree of the click target to check whether user has clicked outside of menu
	        if ($j(event.target).parents('.dropHolder').length==0) {
	            // your code to hide menu
				$dropButton.removeClass('on').siblings('.dropOptions').hide();
	            //this event listener has done its job so we can unbind it.
	            $j(this).unbind(event);
	        }
	    })
		return false;
	});
}

/* 
======================================================================
PAGE FUNCTIONS
----------------------------------------------------------------------
Less commonly used functions that are still worth putting into an include
*/

// generic function for switching tabs
// NB need to make sure your tabs use the simplified layout (i.e. the links are not wrapped in 
// <strong> tags) - see page_help.jsp for example
function switchTab(element) {
	$j(element).addClass('active');
	$j(element).siblings().removeClass('active');
}

function selectCheckboxes(strAllOrNone, cssSelector) {
/*
Switches an array of checkboxes all on or all off. 
Args:
	strAllOrNone - set to 'all' or 'none' 
	cssSelector - used to identify the checkboxes you want to affect (e.g. '#myDiv input.checkbox')
*/
	var $checkBoxArray = $j(cssSelector);
	//Iterate through checkboxes on the page
	if (strAllOrNone == 'all') {
		$checkBoxArray.attr('checked',true)

	} else if (strAllOrNone == 'none') {
		$checkBoxArray.removeAttr('checked')
	}

}


function toggleState(thisCheckbox) {
/*
Toggles a checkbox between checked and unchecked.
*/
	if ( thisCheckbox.checked == true ) {
		thisCheckbox.checked = false;
	}
	else {
		thisCheckbox.checked = true;
	}
}
/*
Toggles class of containing <li> for extra visual feedback
*/
function toggleClass(wrappingLi,force) {
	if ( wrappingLi.hasClassName('selected')) {
		wrappingLi.removeClassName('selected');
	}
	else {
		wrappingLi.addClassName('selected');
	}
}


// toggles the display of a control panel
// $elementToToggle and $togglingLink should be jquery objects (e.g. $j(this))
function toggleControls($elementToToggle,$togglingLink)
{
	//toggle visibility of control panel
	$elementToToggle.toggle();

	//toggle the css class of the link
	$togglingLink.toggleClass("collapse");
}


/*
Either select or deselect all checkboxes, depending on the value of 'b_trueOrFalse'
Also need to pass in the id of a containing element for the checkboxes (so you can group checkboxes together)
This function assumes checkboxes are contained in li items and will toggle the 'selected' all the li elements 
within the passed in container.
*/
function selectItems(b_trueOrFalse, containerId) {
	var $checkBoxArray = $j('#'+containerId+' input:checkbox');
	$checkBoxArray.attr('checked',b_trueOrFalse);
	if (b_trueOrFalse) {
		$j('#'+containerId+' li').addClass('selected');
	} else {
		$j('#'+containerId+' li').removeClass('selected');
	}
}


/*
Functions for integrating with a map popup.
*/		
function popupMap(element) {
	var mapWindow = window.open(element.href, "mapWindow", "width=700,height=550,toolbar=no,location=no,status=no,menubar=no,resizable=yes,scrollbars=yes,titlebar=no");
	mapWindow.focus();
}


function getSpatialCoords($container) {
	//update global variables with values in the text boxes
	sLat = $j('input.sLat', $container).val();
	wLng = $j('input.wLng', $container).val();
	nLat = $j('input.nLat', $container).val();
	eLng = $j('input.eLng', $container).val();
}

function setSpatialCoords($container) {
	//update text boxes with global variable values
	$j('.sLat', $container).val(sLat);
	$j('.wLng', $container).val(wLng);
	$j('.nLat', $container).val(nLat);
	$j('.eLng', $container).val(eLng);
}

function popupMapInit() {
	$j('a.mapPopup').click(function(){
		//get context
		$whichAttribute = $j(this).parents('table.nested').eq(0)
		getSpatialCoords($whichAttribute);
		popupMap(this);
		return false;
	});
}	
function viewMapPopupInit() {
	$j('a.mapPopup').click(function(){
		//get context
		$whichAttribute = $j(this).parents('td.padded').eq(0)
		sLat = $j('span.sLat', $whichAttribute).text();
		wLng = $j('span.wLng', $whichAttribute).text();
		nLat = $j('span.nLat', $whichAttribute).text();
		eLng = $j('span.eLng', $whichAttribute).text();
		popupMap(this);
		return false;
	});
}	

function searchMapPopupInit() {
	popupMapInit();
	
	$j('p.areaPointToggle input').click(function(){
		activateSearchTab($j(this));
	})
	
	// Initially hide search point and radius
	// $j('table.searchPoint').hide()
	$j('p.areaPointToggle').addClass('tabHolderPopup');
	
	
	$j('p.areaPointToggle input:checked').each( function() {
		activateSearchTab($j(this));
	});
	
}


function activateSearchTab($this) {
	// shows either search area or point and radius fields depending on which radio button is selected
	var $container = $this.parents('div.spatialAreaWrap');
	var $label = $this.parent();

	$container.find('p.areaPointToggle label').removeClass('active');
	$this.parent().addClass('active');
	$container.find('table').hide()
	$container.find('table.'+$label.attr('rel')).show();
}

/*
----------------------------------------------------------------------
Expanding/collapsing attribute headings
----------------------------------------------------------------------
*/
 var attrHeadings = {
	init: function(wrapperId) {
		var $headings = $j(wrapperId).find('.attributeGroupHeading h3');
		$headings.click(function(){
			attrHeadings.toggle($j(this));
		});      
		// hide initially collapsed panels    
		$j(wrapperId).find('.initially-collapsed').hide();
	},
	toggle: function($heading) {
		var $panel = $heading.parents('.attributeGroupHeading').next('.attributeGroupPanel');
		$heading.toggleClass('collapsed');
		$panel.toggle();
	}
	
}


/*
----------------------------------------------------------------------
Clear CMS Mode
----------------------------------------------------------------------
NOTES:
This calls an action to clear the CMS mode (used to clear CMS mode before returning user to CMS)
*/
function clearCmsMode() 
{
	url = "clearCmsMode";
	new Ajax.Request(url);
}



/* 
======================================================================
WHEN DOM READY
----------------------------------------------------------------------
Generic actions to carry out on every page when DOM is loaded
*/
$j(function() {
	//Listen for clicks on any popup links
	$j('a.help-popup, a.popup-link').click( function() {
		popupGeneric(this,"width=800,height=500,toolbar=yes,location=no,status=no,menubar=no,resizable=yes,scrollbars=yes,titlebar=no");
		return false;
	});

	// Main navigation - set up hover and click events on expanding menu items (e.g. upload and admin)
	$j('#main_nav a.expanding')
		.hover(function(){
			var $link = $j(this);
			$link.toggleClass('openHover');
		})
		.click(function() {
			var $link = $j(this);
			var $submenu = $link.next('ul');		// get reference to submenu ul
			$submenu.toggle();						//show/hide submenu
			$link.toggleClass('open');	
			return false;
		});
			
	// stripey tables - BB I have removed all other table stripey code from the application, as this covers everything
    $j('.stripey').each(function() {
		$j(this).find('tr:even').addClass('even');
	});
	
	
	// asset panel heights - if the current page has asset panels make sure the sizes are even
	if($j('#content ul.lightbox').length) {
		equalHeights($j('#content ul.lightbox div.detailWrapper'));
	}
	
	// selectable assets - check if applicable then initialize
	if ($j('#selectableAssets').length) {
		var $listArray = $j('#selectableAssets li.selectable');
		var $checkArray = $j('#selectableAssets li input.checkbox');
		
		// make li elements clickable
		$listArray.click(function(event) {
			// if containing li is clicked simply trigger click event on the checkbox inside
			if(!$j(event.target).is('img.image')) {		//user is clicking to see the asset not check the checkbox
				$j(this).find('input.checkbox:eq(0)').click();
			}
		});
		
		// click event on checkboxes
		$checkArray.click(function(event) {
			var $parentUL = $j(this).parents('ul.lightbox');
			var mode = $parentUL.attr('rel');
			event.stopPropagation();	
			if(mode=="radio") {
				//alert('test');
				$j(this).parents('ul.lightbox').find('li.selectable').removeClass('selected');
			}
			$j(this).parents('li:eq(0)').toggleClass('selected');
		});
		
		// highlight any already selected checkboxes
		$j('#selectableAssets input:checked').each(function() {
			$j(this).parents('li:eq(0)').addClass('selected');
		});
	}
	
	// initiaise lightbox panel
	if($j('#lbPanel').length) {
		lbPanel.init();
	}
	
	//Dropdown links/buttons
	if($j('a.dropButton, a.dropLink').length) {
		initDropLinks();
	}

	
	

});

