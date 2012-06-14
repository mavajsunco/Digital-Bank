<%@ taglib uri="/WEB-INF/c.tld" prefix="c" %>
<%@ taglib uri="/WEB-INF/bright-tag.tld" prefix="bright" %>

<bright:applicationSetting id="databaseSupportsUTF8" settingName="databaseSupportsUTF8"/>

<%-- Set the content type to utf-8 if required. Note, we cannot conditionally do this with the @page directive, so it has to be inline java --%>
<c:if test="${databaseSupportsUTF8}">
	<% response.setContentType("text/html;charset=utf-8"); %>
</c:if>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<c:choose>
	<c:when test="${(not empty userprofile && userprofile.currentLanguage.rightToLeft) || (not empty session.currentLanguage && session.currentLanguage.rightToLeft)}">
		<c:set var="dirValue" value="rtl"/>
	</c:when>
	<c:otherwise>
		<c:set var="dirValue" value="ltr"/>	
	</c:otherwise>
</c:choose>

<c:set var="isAdminPage" value="false"/>

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <html class="ie6" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="<c:out value="${dirValue}"/>"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="<c:out value="${dirValue}"/>"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="<c:out value="${dirValue}"/>"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie9" xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="<c:out value="${dirValue}"/>"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="<c:out value="${dirValue}"/>"> <!--<![endif]-->

