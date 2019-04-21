<%@ include file="/init.jsp" %>

<%--suppress JSUnresolvedVariable, JSUnresolvedFunction --%>
<script type="text/javascript">
	Liferay.Loader.require("app-finnish-metal");
</script>

<div id="${ns}songs-rating"></div>
<script data-union-widget="songs-rating" data-union-container="${ns}songs-rating" type="application/json"></script>
