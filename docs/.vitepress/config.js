import sidebar from "./sidebar"
export default {
	title: 'CDoc',
	description: 'Just playing around.',
	lastUpdated: true,
	markdown: {
		theme: 'material-palenight',
		lineNumbers: true
	},
	themeConfig: {
		nav: [
			{ text: '🐸 计算机网络', link: '/Networking/http1' },
			{ text: '🎯 JS 知识', link: '/jsAdvance/js0' },
			{ text: '🌈 vue知识点汇总', link: '/vue/vue基础知识' },
			{ text: '🎰 常用工具', link: '/tool/git.md' },
			{ text: '📗 C 语言', link: '/c/c1.md' },
		],
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2023-PRESENT Cyz99'
		},
		sidebar
	}
};