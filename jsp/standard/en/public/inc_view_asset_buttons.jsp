<%-- 
	Vars used in this page, i.e. if you use a <jsp:include you'll need to pass them as parameters (unless they are request-scope).
	viewUrl
	pos
	params

--%>

<%@ taglib uri="/WEB-INF/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/struts-logic.tld" prefix="logic" %>
<%@ taglib uri="/WEB-INF/c.tld" prefix="c" %>
<%@ taglib uri="/WEB-INF/fmt.tld" prefix="fmt" %>
<%@ taglib uri="/WEB-INF/bright-tag.tld" prefix="bright" %>
<%@ taglib uri="/WEB-INF/ab-tag.tld" prefix="ab" %>

<bright:applicationSetting id="canEditAssetVersions" settingName="can-edit-asset-versions"/>
<bright:applicationSetting id="canCreateAssetCopies" settingName="can-create-asset-copies"/>			
<bright:applicationSetting id="brandTemplatesEnabled" settingName="brand-templates-enabled"/>
<bright:applicationSetting id="copyAssetChildChoiceLimit" settingName="copy-asset-child-choice-limit"/>


			<%-- Download button --%>
			<%-- Only admin users can download brand templates; other users have to fill in the fields first (see below) --%>
			<c:if test="${(brandTemplatesEnabled == false) || (assetForm.asset.isBrandTemplate == false || userprofile.isAdmin)}">
				<c:choose>
					<c:when test="${assetForm.asset.hasFile && assetForm.asset.isRestricted && !assetForm.userCanDownloadAsset && !assetForm.userCanViewRestrictedAsset}">
						<li class="text warning"><bright:cmsWrite identifier="snippet-image-restricted" filter="false"/></li>
					</c:when>
					<c:when test="${assetForm.asset.hasFile && assetForm.asset.hasExpired}">
						<li class="text warning"><bright:cmsWrite identifier="snippet-image-expired" filter="false"/></li>
					</c:when>
				</c:choose>

				<c:choose>
					<c:when test="${assetForm.asset.isImage && not assetForm.downloadAsDocument}">
						<c:if test="${assetForm.directDownloadFileType || assetForm.userHasApprovalForHighRes}">
							<c:set var="downloadActionURL" value="../action/downloadImage"/>
							<c:set var="downloadOriginal" value="true"/>
						</c:if>
						<c:if test="${!(assetForm.directDownloadFileType || assetForm.userHasApprovalForHighRes)}">
							<c:set var="downloadActionURL" value="../action/viewDownloadImage"/>
						</c:if>
					</c:when>
					<c:when test="${assetForm.asset.isVideo}">
						<c:if test="${assetForm.directDownloadFileType || assetForm.userHasApprovalForHighRes}">
							<c:set var="downloadActionURL" value="../action/downloadFile"/>
							<c:set var="downloadOriginal" value="true"/>
						</c:if>
						<c:if test="${!(assetForm.directDownloadFileType || assetForm.userHasApprovalForHighRes)}">
							<c:set var="downloadActionURL" value="../action/viewDownloadVideo"/>
						</c:if>
					</c:when>
					<c:when test="${assetForm.asset.isAudio}">
						<c:if test="${assetForm.directDownloadFileType || assetForm.userHasApprovalForHighRes}">
							<c:set var="downloadActionURL" value="../action/downloadFile"/>
							<c:set var="downloadOriginal" value="true"/>
						</c:if>
						<c:if test="${!(assetForm.directDownloadFileType || assetForm.userHasApprovalForHighRes)}">
							<c:set var="downloadActionURL" value="../action/viewDownloadAudio"/>
						</c:if>
					</c:when>
					<c:otherwise>
						<c:if test="${assetForm.asset.hasFile || assetForm.downloadAsDocument}">
							<c:if test="${assetForm.directDownloadFileType || assetForm.userHasApprovalForHighRes}">
								<c:set var="downloadActionURL" value="../action/downloadFile"/>
								<c:set var="downloadOriginal" value="true"/>
							</c:if>
							<c:if test="${!(assetForm.directDownloadFileType || assetForm.userHasApprovalForHighRes)}">
								<c:set var="downloadActionURL" value="../action/viewDownloadFile"/>
							</c:if>
						</c:if>
					</c:otherwise>
				</c:choose>

				<c:if test="${(assetForm.asset.hasFile || (assetForm.asset.surrogateAssetId>0 && not empty downloadActionURL)) && assetForm.userCanDownloadAsset}">
					<li>
						<form action="<bean:write name="downloadActionURL"/>" method="get">
							<c:if test="${not empty params}">
								<input type="hidden" name="returnUrl" value="<c:out value='${viewUrl}?index=${pos}&${params}' />" />
							</c:if>
							<c:choose>
								<c:when test="${assetForm.asset.surrogateAssetId>0}">
									<input type="hidden" name="id" value="<bean:write name='assetForm' property='asset.surrogateAssetId'/>" />
									<input type="hidden" name="parentId" value="<bean:write name='assetForm' property='asset.id'/>" />
								</c:when>
								<c:otherwise>
									<input type="hidden" name="id" value="<bean:write name='assetForm' property='asset.id'/>" />
								</c:otherwise>
							</c:choose>
							<logic:present name="downloadOriginal">
								<input type="hidden" name="b_downloadOriginal" value="true" />
							</logic:present>
							<c:if test="${assetForm.userHasApprovalForHighRes}">
								<input type="hidden" name="highResDirectDownload" value="true" />
							</c:if>							
							<c:if test="${assetForm.asset.isVideo}">
								<input type="hidden" name="advanced" value="true" />
							</c:if>
							<c:if test="${assetForm.userHasApprovalForHighRes}">
								<input id="downloadAssetButton" class="button" type="submit" value="<bright:cmsWrite identifier="button-download-high-res" filter="false"/>" />
							</c:if>
							<c:if test="${!assetForm.userHasApprovalForHighRes}">
								<input id="downloadAssetButton" class="button" type="submit" value="<c:if test="${!userprofile.isFromCms}"><bright:cmsWrite identifier="button-download" filter="false" /></c:if><c:if test="${userprofile.isFromCms}"><bright:cmsWrite identifier="button-select-for-cms" filter="false" /></c:if>" />
							</c:if>
						</form>
					</li>
				</c:if>
			</c:if>
			<%-- Display high res download only message --%>
			<c:if test="${assetForm.userMustRequestApprovalForHighRes && !assetForm.userHasApprovalForHighRes && !assetForm.approvalIsPending}">
				<c:set var="assetId" value="${assetForm.asset.id}" />	
				<li class="border text">
					<bright:cmsWrite identifier="snippet-request-high-res-view" filter="false" replaceVariables="true" />		
				</li>
			</c:if>
			
			<c:if test="${assetForm.userMustRequestApprovalForHighRes && assetForm.approvalIsPending}">
				<li class="border text">
					High-res approval is pending - check your lightbox
				</li>
			</c:if>
			
			<%-- Download children button --%>
			<c:if test="${assetForm.asset.entity.canDownloadChildrenFromParent && assetForm.userCanDownloadAsset && assetForm.asset.childAssetIdsAsString!=''}">
				<form action="viewChildAssets" method="get">
					<input type="hidden" name="id" value="<bean:write name='assetForm' property='asset.id'/>">
					<input class="button" type="Submit" value="<bright:cmsWrite identifier="button-download" filter="false"/> <bean:write name="assetForm" property="asset.entity.childRelationshipToNamePlural"/>" />
				</form>
			</c:if>

			<%-- Brand Templates: Create Document button --%>
			<c:if test="${brandTemplatesEnabled && assetForm.asset.isBrandTemplate && assetForm.userCanDownloadAsset}">
				<li>
					<form name="updateForm" action="../action/viewFillInBrandTemplate" method="get">
						<input id="createAssetDocumentButton" class="button" type="submit" value="<bright:cmsWrite identifier="button-create-doc-from-brand-template" filter="false"/>" />
						<input type="hidden" name="assetId" value="<bean:write name='assetForm' property='asset.id'/>" />
					</form>
				</li>
			</c:if>

			<c:if test="${assetForm.asset.currentVersionId<=0 || canEditAssetVersions}">
				<%-- Edit button --%>
				<logic:equal name="assetForm" property="userCanUpdateAsset" value="true">
					<li>
						<form name="updateForm" action="../action/viewUpdateAsset" method="get">
							<c:if test="${not empty params}">
								<input type="hidden" name="returnUrl" value="<c:out value='${viewUrl}?index=${pos}&${params}' />" />
							</c:if>
							<input type="hidden" name="expectedAssetId" value="<c:out value='${assetForm.asset.id}' />" />
							<input id="editAssetButton" class="button" type="submit" value="<bright:cmsWrite identifier="button-edit" filter="false" />" />
							<input type="hidden" name="id" value="<bean:write name='assetForm' property='asset.id'/>" />
						</form>
					</li>
				</logic:equal>
				<%-- Create copy button --%>
				<c:if test="${assetForm.userCanUpdateAsset && canCreateAssetCopies && (assetForm.asset.entity.id==0 || assetForm.asset.entity.canCopyAssets)}">
					<li>
						<form name="updateForm" action="../action/viewCopyAsset" method="get" onclick="return confirmCopyAsset();">
							<input id="copyAssetButton" class="button" type="submit" value="<bright:cmsWrite identifier="button-create-copy" filter="false" />" />
							<input type="hidden" name="assetId" value="<bean:write name='assetForm' property='asset.id'/>" />
						</form>
						<script type="text/javascript">
							function confirmCopyAsset()
							{
								<c:choose> 
									<c:when test="${empty assetForm.asset.childAssetIdsAsString}">
										return confirm('<bright:cmsWrite identifier="js-confirm-copy-asset" filter="false"/>');
									</c:when>
									<c:when test="${assetForm.asset.noOfChildAssets > copyAssetChildChoiceLimit}">
										return confirm('<bright:cmsWrite identifier="js-confirm-copy-asset-limit-exceeded" filter="false"/>');
									</c:when>
								</c:choose>
							}
						</script>
					</li>
				</c:if>
				<%-- Delete button --%>
				<c:if test="${(userprofile.isAdmin || assetForm.userCanDeleteAsset)}">
					<li>
						<form name="updateForm" action="../action/deleteAsset" method="get">
							<input id="deleteAssetButton" class="button" type="submit" value="<bright:cmsWrite identifier="button-delete" filter="false" />" onclick="return confirmDeleteAsset(); " />
							<input type="hidden" name="id" value="<bean:write name='assetForm' property='asset.id'/>" />
						</form>
						<script type="text/javascript">
							function confirmDeleteAsset()
							{
								<c:choose>
									<c:when test="${assetForm.asset.extendsCategory.id > 0}">
										return confirm('<bright:cmsWrite identifier="js-confirm-delete-extension-asset" filter="false"/>');
									</c:when>
									<c:when test="${assetForm.asset.entity.id>0 && assetForm.childrenMustHaveParents}">
										<bean:define id="entityName" name="assetForm" property="asset.entity.name"/>
										<bean:define id="childNamePlural" name="assetForm" property="asset.entity.childRelationshipToNamePlural"/>
										return confirm('<bright:cmsWrite identifier="js-confirm-delete-asset-and-children" replaceVariables="true" filter="false"/>');
									</c:when>
									<c:otherwise>
										return confirm('<bright:cmsWrite identifier="js-confirm-delete-asset" filter="false"/>');
									</c:otherwise>
								</c:choose>
							}
						</script>
					</li>
					
				</c:if>
			</c:if>
			
			<c:if test="${userCanUpdateAsset && canCreateAssetCopies}">
				<li>
					<form name="updateForm" action="../action/viewUpdateAsset" method="get">
						<input class="button" type="submit" value="<bright:cmsWrite identifier="button-create-copy" filter="false" />" />
						<input type="hidden" name="id" value="<bean:write name='assetForm' property='asset.id'/>" />
						<input type="hidden" name="saveTypeId" value="1" />
					</form>
				</li>
			</c:if>
			
			<%-- Copy when user has no permission --%>
			<c:if test="${!assetForm.userCanDownloadAsset && !assetForm.userCanDownloadAssetWithApproval}">
				<li class="text"><bright:cmsWrite identifier="snippet-view-only-permission"/></li>
			</c:if>
			

