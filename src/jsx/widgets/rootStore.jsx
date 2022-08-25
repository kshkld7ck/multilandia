import { types } from "mobx-state-tree";
import React from "react";

// export const Widget = types
// 	.model("Widget", {
// 		id: types.identifier,
// 		data: types.union(
// 			{
// 				eager: true,
// 				dispatcher: (snapshot) => {
// 					if (Widgets[snapshot.kind] && Widgets[snapshot.kind].cmsModel) {
// 						return Widgets[snapshot.kind].cmsModel;
// 					}
// 					return Banner;
// 				},
// 			},
// 			...Widgets.allCmsModels(),
// 		),
// 		store: types.maybe(WidgetStores),
// 	})
// 	.actions((self) => ({
// 		setStore(store) {
// 			self.store = store;
// 		},
// 	}))
// 	.views((self) => ({
// 		get kind() {
// 			return self.data.kind || "";
// 		},
// 	}));

export const Page = types
	.model("Page", {
		id: types.identifier,
		path: types.maybe(types.string),
		// widgets: types.maybe(types.array(Widget)),
		variables: types.maybe(
			types.model({
				id: types.maybe(types.string),
				model: types.maybe(types.string),
			}),
		), 
	})
	.views((self) => ({
		getWidgetById(key) {
			if (!self.widgets) return undefined;
			return self.widgets.find((widget) => widget.id === key);
		},
		getWidgetByKind(key) {
			if (!self.widgets) return undefined;
			return self.widgets.find((widget) => widget.kind === key);
		},
	}))
	.actions((self) => ({
		getWidgetStore(storeEntity, id) {
			const widget = self.getWidgetById(id);
			if (widget.store) return widget.store;

			if (!storeEntity) return undefined;
			widget.setStore(storeEntity.create({ kind: widget.kind }));
			return widget.store;
		},
	}));

export const RootStore = types
	.model("RootStore", {
		currentUrl: types.optional(types.string, "/"),
		page: types.maybe(Page),
	})
	.actions((self) => ({
		// fetchPage: flow(function* fetchPage(url) {
		// 	if (!self.isNeedToFetch) {
		// 		self.isNeedToFetch = true;
		// 		return;
		// 	}
		// 	url && self.setCurrentUrl(url);

		// 	let request = {
		// 		method: "Router.get_by_path",
		// 		params: {
		// 			path: self.currentUrl,
		// 			channel: "default",
		// 			cached: true,
		// 		},
		// 	};
		// 	try {
		// 		const response = yield Axios.post(ROUTES.mostroCMS, request);
		// 		if (!response.data.result || !response.data.result.data) {
		// 			throw response.data;
		// 		}

		// 		self.page = {
		// 			...response.data.result,
		// 			widgets: (function createStores() {
		// 				const w = response.data.result.data.widgets;
		// 				return w.map((widgetData) => {
		// 					const component = Widgets[widgetData.data.kind];
		// 					const widgetModel = Widget.create(widgetData);
		// 					if (component && component.store) {
		// 						widgetModel.setStore(component.store.create({ kind: widgetData.data.kind }));
		// 					}
		// 					return widgetModel;
		// 				});
		// 			})(),
		// 			header_footer: response.data.result.data.header_footer.data,
		// 			header_theme: response.data.result.data.header_theme,
		// 			meta_tags: response.data.result.data?.seo?.data,
		// 			page_theme: response.data.result.data.page_theme,
		// 			city_id: response.data.result.data.city_id,
		// 		};
		// 	} catch (e) {
		// 		console.log(
		// 			"Fetch page error!\n",
		// 			`Request URL: ${ROUTES.mostroCMS}\n`,
		// 			`Request Body: ${JSON.stringify(request)}\n`,
		// 			`Response Body: ${JSON.stringify(e)}\n`,
		// 			`Error: ${e}`,
		// 		);
		// 	}
		// }),
		// setCurrentUrl(url) {
		// 	self.currentUrl = url;
		// },
		// serverSideFetch: flow(function* serverSideFetch(requestUrl) {
		// 	self.ssrFetchUrl = requestUrl;
		// 	yield self.fetchPage();
		// 	const initPromises = self.widgets
		// 		.map((widgetModel) => {
		// 			const component = Widgets[widgetModel.data.kind];
		// 			if (component && component.store) {
		// 				widgetModel.setStore(component.store.create({ kind: widgetModel.kind }));
		// 				if (typeof widgetModel.store.serverSideFetch === "function") {
		// 					return widgetModel.store.serverSideFetch(widgetModel.data);
		// 				}
		// 			}
		// 		})
		// 		.filter((promise) => promise !== undefined);
		// 	yield Promise.all(initPromises);
		// 	self.isNeedToFetch = false;
		// }),
	}))
	.views((self) => ({
		get widgets() {
			return self.page?.widgets || [];
		},
	}));

// Стандартный функционал React
// Можно почитать здесь - https://reactjs.org/docs/context.html
// C помощью контекста можно получить доступ к RootStore из любого места в приложении если это будет нужно
export const MSTContext = React.createContext(null);

// eslint-disable-next-line prefer-destructuring
export const Provider = MSTContext.Provider;

// context for TagManager
export const TagContext = React.createContext(null);
