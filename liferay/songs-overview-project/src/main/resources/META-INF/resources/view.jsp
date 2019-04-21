<%@ include file="/init.jsp" %>

<%--suppress JSUnresolvedVariable, JSUnresolvedFunction --%>
<script type="text/javascript">
	Liferay.Loader.require("app-finnish-metal");
</script>

<div id="${ns}songs-overview"></div>
<script data-union-widget="songs-overview" data-union-container="${ns}songs-overview" type="application/json"></script>
