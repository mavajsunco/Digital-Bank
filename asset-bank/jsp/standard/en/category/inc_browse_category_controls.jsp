	

		<%-- setup the variables that we need for the controls and the browse include --%>
		<bright:applicationSetting id="extensionAssetsEnabled" settingName="category-extension-assets-enabled" />
		<bright:applicationSetting id="userDrivenBrowseSorting" settingName="user-driven-browse-sorting-enabled" />
		<bright:applicationSetting id="bAddAllToLightboxLimit" settingName="add-all-to-assetbox-limit"/>
		<c:set var="totalHits" value="${browseItemsForm.searchResults.totalHits}" />
		<c:set var="numberHits" value="${browseItemsForm.searchResults.numResults}" />
		<c:set var="formBean" value="${browseItemsForm}"/>
		
		<logic:notPresent name='noLinks'><bean:define id="noLinks" value="false"/></logic:notPresent>
		
		<%-- setup the switches that define whether the action links are displayed and the link urls to use --%>	
		<c:choose>
			<c:when test="${noLinks}">
				<c:set var="LinkSwitch_AddAllToLightbox" value="false" />
				<c:set var="extendedCategoryLink" value="" />
			</c:when>
			<c:otherwise>
				<c:set var="LinkSwitch_AddAllToLightbox" value="${bShowAddAllToLightbox && !userprofile.isFromCms && !hideLightbox}" />
				<c:set var="extendedCategoryLink"><c:if test="${browseItemsForm.category.extensionAssetId > 0}"><bright:addExtendedCategoryLink categoryId="${browseItemsForm.category.id}" explorer="${explorer}" categoryTreeId="${browseItemsForm.category.categoryTypeId}" defaultLinkIdentifier="snippet-extended-sub-category" /></c:if></c:set>
			</c:otherwise>
		</c:choose>
		
		<%-- output the controls (sorting, paging and action links) along with the category header --%>
		<logic:notEmpty name='browseItemsForm' property='category'>
			<c:if test="${browseItemsForm.anyVisibleAssets}">
				<div <c:if test="${!explorer}">class="sortStrip"</c:if>>
					<c:set var="styleClass" value="pager browsePager"/>
					<%@include file="../inc/pager.jsp"%>

					<c:if test="${userDrivenBrowseSorting && !explorer}">
						<div class="searchResultSorting">
							<bean:define id="sortForm" name="browseItemsForm"/>
							<html:form action="${browseAction}" styleId="sortForm" method="get">
								<c:if test="${not empty keywordChooserForm}">
									<input type="hidden" name="filter" value="<bean:write name="keywordChooserForm" property="filter"/>"/>
								</c:if>
								<input type="hidden" name="categoryId" value="<bean:write name="browseItemsForm" property="category.id"/>"/><input type="hidden" name="categoryTypeId" value="<bean:write name="browseItemsForm" property="category.categoryTypeId"/>"/>
								<input type="hidden" name="page" value="<bean:write name="p_page"/>"/>
								<%@include file="../inc/sort_attribute_fields.jsp" %>
							</html:form>
						</div>
					</c:if>
				</div>
			</c:if>
			
			
			
			<div class="toolbar">
				<c:if test="${browseItemsForm.anyVisibleAssets}">
					<p class="listViewToggle">
					    <a class="panel-view <c:if test="${userprofile.view == 'panels'}">active</c:if>" href="toggleView?switch=panels&returnUrl=<c:out value='${thisUrlForGet}'/>" title="<bright:cmsWrite identifier="tooltip-switch-panel-view" />"><bright:cmsWrite identifier="link-panel-view"/></a>
					    <a class="list-view <c:if test="${userprofile.view == 'list'}">active</c:if>" href="toggleView?switch=list&returnUrl=<c:out value='${thisUrlForGet}'/>" title="<bright:cmsWrite identifier="tooltip-switch-list-view" />"><bright:cmsWrite identifier="link-list-view"/></a>
					    <a class="compact-view <c:if test="${userprofile.view == 'minimal'}">active</c:if>" href="toggleView?switch=minimal&returnUrl=<c:out value='${thisUrlForGet}'/>" title="<bright:cmsWrite identifier="tooltip-switch-compact-view" />"><bright:cmsWrite identifier="link-compact-view" /></a>
					</p>
				</c:if>
				
				<%--  Construct hits text --%>
				<c:choose>
					<c:when test="${numberHits!=1}">
						<c:choose>
							<c:when test="${formBean.searchResults.maxResultsExceeded}">
								<c:set var="sHitsText"><bright:cmsWrite identifier="browse-results-restricted" filter="false" replaceVariables="true" /></c:set>			
							</c:when>				
							<c:otherwise>
								<c:set var="sHitsText"><c:out value="${numberHits}"/> <bright:cmsWrite identifier="items" filter="false"  /></c:set>
							</c:otherwise>
						</c:choose>						
					</c:when>			
					<c:otherwise>
						<c:set var="sHitsText">1 <bright:cmsWrite identifier="item" filter="false"  /></c:set>			
					</c:otherwise>
				</c:choose>			
				
				<h2>
					<c:if test="${!hideTitle}"><c:set var="catName"><c:out value="${browseItemsForm.category.name}" /> </c:set>
					<c:out value="${browseItemsForm.category.name}" />
					<span>(</c:if><c:out value="${sHitsText}" /><c:if test="${!hideTitle}">)</c:if></span>
				</h2>
				<ul class="toolbarActions">
					
					<c:if test="${browseItemsForm.category.id != -1  && !noLinks}">
						<li>		
							<c:choose>
								<c:when test="${totalHits>1}">
									<a href="viewLastSearch?newSearch=true&amp;searchThisCat=<c:out value='${browseItemsForm.category.id}'/>&amp;searchThisCatType=<c:out value='${browseItemsForm.category.categoryTypeId}'/>" style="float:left">
								</c:when>
								<c:otherwise>
									<em class="disabled" title="Cannot search as category is empty" style="float:left">
								</c:otherwise>	
							</c:choose>	
									<c:choose><c:when test="${categoryTypeId == 1}"><bright:cmsWrite identifier="link-search-this-category" filter="false" /></c:when><c:otherwise><bright:cmsWrite identifier="link-search-this-accesslevel" filter="false" /></c:otherwise></c:choose>
							<c:choose>
								<c:when test="${totalHits>1}">
									</a>
								</c:when>
								<c:otherwise>
									</em>
								</c:otherwise>	
							</c:choose>	
			
					
					
						<%-- check to see if some of the following X links are going to show - if so then we need to group them --%>
						<c:if test="${extendedCategoryLink != '' || LinkSwitch_AddAllToLightbox}">
							<div class="group">
							<div class="dropHolder">
								<a href="" class="dropLink js-enabled-show" title="More actions"><bright:cmsWrite identifier="label-actions" filter="false" /></a>
								<ul class="dropOptions">
						</c:if>
					
								<logic:notPresent name="forwardParams">
									<c:set var="forwardParams" value="forward=/action/browseItems&categoryId=${browseItemsForm.category.id}&categoryTypeId=${browseItemsForm.category.categoryTypeId}&page=${p_page}" />
								</logic:notPresent>
		
								<c:if test="${LinkSwitch_AddAllToLightbox}">
									<noscript>
											</ul>
											<ul>
									</noscript> 
									<li>
										<a href="addAllInCategoryToAssetBox?<c:out value='${forwardParams}' />" 
											<c:choose>
												<c:when test="${totalHits > bAddAllToLightboxLimit}" >
													<bean:define id="count" name="bAddAllToLightboxLimit" />
													onclick="return confirm('<bright:cmsWrite identifier="js-add-x-cat-items-lightbox" filter="false" replaceVariables="true" />');"
												</c:when>
												<c:otherwise>
													onclick="return confirm('<bright:cmsWrite identifier="js-add-cat-items-lightbox" filter="false" replaceVariables="true" />');"
												</c:otherwise>
											</c:choose>
										>
										<bright:cmsWrite identifier="link-add-all" filter="false" /></a>
									</li>
								</c:if>	

								<bean:write name='extendedCategoryLink' filter="false" />

								<bright:addItemLink categoryId="${browseItemsForm.category.id}" categoryTreeId="${browseItemsForm.category.categoryTypeId}" boolCheck="${browseItemsForm.showGlobalAddItemLink && !noLinks}" extensionEntityId="${browseItemsForm.extensionEntityId}"/>

					
								<logic:iterate name="browseItemsForm" property="panels" id="panel" indexId="index">
									<c:if test="${!panel.populated && panel.visibilityStatus == 2}">
										<%-- the panel isnt populated but we want to see any associated links --%>
										<bright:addItemLink categoryId="${browseItemsForm.category.id}" categoryTreeId="${browseItemsForm.category.categoryTypeId}" itemName="${panel.header}" boolCheck="${!noLinks}" extraParameters="${panel.addItemParameters}" extensionEntityId="${browseItemsForm.extensionEntityId}"/>
									</c:if>
								</logic:iterate>
					
						<c:if test="${extendedCategoryLink != '' || LinkSwitch_AddAllToLightbox}">
								</ul>
							</div>	<!-- end of dropHolder -->	 
							</div>	<!-- end of group --> 	
						</c:if>
						</li>	
					</c:if>	
					
				</ul>	
				<div class="clearing"></div>	
			</div><!-- end of toolbar -->				
		</logic:notEmpty>
	
	
	

	
	