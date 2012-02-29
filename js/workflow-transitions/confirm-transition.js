

	/*
		These functions are to check if there is confirm text next to selected transition, and to show the confirm dialog if so.
	
		The top few are taken from off the web. doConfirmation is mine.
	*/

		function getSelectedRadio(buttonGroup) {
		   // returns the array number of the selected radio button or -1 if no button is selected
		   if (buttonGroup[0]) { // if the button group is an array (one button is not an array)
		      for (var i=0; i<buttonGroup.length; i++) {
		         if (buttonGroup[i].checked) {
		            return i
		         }
		      }
		   } else {
		      if (buttonGroup.checked) { return 0; } // if the one button is checked, return zero
		   }
		   // if we get to this point, no radio button is selected
		   return -1;
		} // Ends the "getSelectedRadio" function
		
		function getSelectedRadioValue(buttonGroup) {
		   // returns the value of the selected radio button or "" if no button is selected
		   var i = getSelectedRadio(buttonGroup);
		   if (i == -1) {
		      return "";
		   } else {
		      if (buttonGroup[i]) { // Make sure the button group is an array (not just one button)
		         return buttonGroup[i].value;
		      } else { // The button group is just the one button, and it is checked
		         return buttonGroup.value;
		      }
		   }
		} // Ends the "getSelectedRadioValue" function
		
		function getSelectedCheckbox(buttonGroup) {
		   // Go through all the check boxes. return an array of all the ones
		   // that are selected (their position numbers). if no boxes were checked,
		   // returned array will be empty (length will be zero)
		   var retArr = new Array();
		   var lastElement = 0;
		   if (buttonGroup[0]) { // if the button group is an array (one check box is not an array)
		      for (var i=0; i<buttonGroup.length; i++) {
		         if (buttonGroup[i].checked) {
		            retArr.length = lastElement;
		            retArr[lastElement] = i;
		            lastElement++;
		         }
		      }
		   } else { // There is only one check box (it's not an array)
		      if (buttonGroup.checked) { // if the one check box is checked
		         retArr.length = lastElement;
		         retArr[lastElement] = 0; // return zero as the only array value
		      }
		   }
		   return retArr;
		} // Ends the "getSelectedCheckbox" function
		
		function getSelectedCheckboxValue(buttonGroup) {
		   // return an array of values selected in the check box group. if no boxes
		   // were checked, returned array will be empty (length will be zero)
		   var retArr = new Array(); // set up empty array for the return values
		   var selectedItems = getSelectedCheckbox(buttonGroup);
		   if (selectedItems.length != 0) { // if there was something selected
		      retArr.length = selectedItems.length;
		      for (var i=0; i<selectedItems.length; i++) {
		         if (buttonGroup[selectedItems[i]]) { // Make sure it's an array
		            retArr[i] = buttonGroup[selectedItems[i]].value;
		         } else { // It's not an array (there's just one check box and it's selected)
		            retArr[i] = buttonGroup.value;// return that value
		         }
		      }
		   }
		   return retArr;
		} // Ends the "getSelectedCheckBoxValue" function	
		
		
		function doConfirmation(lAssetId)
		{
			var iTransition = getSelectedRadioValue(document.forms['form_' + lAssetId].transition);
			var eltHidden =  document.getElementById('text_' + lAssetId + '_' + iTransition);
			
			if (eltHidden == null)
			{
				return true;
			}
			
			var sConfirmText = eltHidden.value;
			
			if ( sConfirmText == null || sConfirmText.length == 0 )
			{
				return true;
			}
			
			return confirm(sConfirmText);
		}
