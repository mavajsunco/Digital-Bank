<%@include file="../inc/doctype_html.jsp" %>

<!-- Website designed and developed by Bright Interactive, http://www.bright-interactive.com -->
<%-- History:
	 d1		James Home			03-Oct-2008		Created.
--%>
<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/c.tld" prefix="c" %>
<%@ taglib uri="/WEB-INF/fmt.tld" prefix="fmt" %>
<%@ taglib uri="/WEB-INF/bright-tag.tld" prefix="bright" %>

<head>
	
	<title><bright:cmsWrite identifier="title-batch-update" filter="false"/></title> 
	<%@include file="../inc/head-elements.jsp"%>

	<script src="../js/category.js" type="text/javascript"></script>
	

	<script src="../js/keywordChooser.js" type="text/javascript"></script>

	<bean:define name="searchBuilderForm" property="assetAttributes" id="attributes"/>
	<bean:define name="searchBuilderForm" property="operators" id="operators"/>
	<bean:size name="searchBuilderForm" property="clauses" id="numClauses" />
	<bean:define id="assetForm" name="searchBuilderForm" />
	<bean:define id="searchForm" name="searchBuilderForm"/>
	<bean:define id="bIsSearch" value="true"/>

	<%-- Set up category javascript --%>
	<c:set var="ctrlIsCheckboxControl" value="0" scope="request"/>
	<%@include file="../category/inc_asset_category_head_js.jsp"%>
	
	<%@include file="../inc/search_builder_js.jsp"%>

	<bean:define id="section" value="batch"/>
	<bean:define id="helpsection" value="batch-batchupdate"/>
	<script type="text/JavaScript">
		$j(function() {
			initDatePicker();
		});
	</script>	

</head>

<body id="uploadPage" onload="setDescSelectedCategories(); setPermSelectedCategories(); setCatIdsFields(); ">
	
	<%@include file="../inc/body_start.jsp"%>
	
	<h1 class="underline"><bright:cmsWrite identifier="heading-batch-update" filter="false" /></h1> 
	
	<div style="float:right">
		<p><a href="<c:out value="../action/viewBatchUpdate?searchBuilder=false&selectedFilter.id=${searchForm.selectedFilter.id}"/>"><bright:cmsWrite identifier="link-use-search-form" filter="false"/> &raquo;</a></p>
	</div>
	
	<bright:cmsWrite identifier="intro-batch-specify-items" filter="false"/>
	
	<c:if test="${userprofile.searchCriteria!=null}"><bright:cmsWrite identifier="intro-batch-use-search" filter="false"/></c:if>
	
	<bean:define id="bMore" value="false"/>
	<logic:present name="userprofile" property="batchUpdate">
		<logic:equal name="userprofile" property="batchUpdate.hasNext" value="true">
			<bean:define id="bMore" value="true"/>
		</logic:equal>
	</logic:present>
	<logic:equal name="bMore" value="true">
		<a href="viewUpdateNextImage?resume=true">Return to current update</a>.<br />
	</logic:equal>
	
	<logic:equal name="searchBuilderForm" property="hasErrors" value="true">
		<div class="error">
		<logic:iterate name="searchBuilderForm" property="errors" id="error">
			<bright:writeError name="error" /><br />
		</logic:iterate>
		</div>
	</logic:equal>
	
	<html:form action="createNewBatchWithBuilder" method="post">
		<input type="hidden" name="restart" value="true">
		<bean:define id="isBatchOperation" value="true"/>
		<%@include file="../inc/search_builder_fields.jsp"%>
	</html:form>
	
	<%@include file="../inc/body_end.jsp"%>
</body>
</html>