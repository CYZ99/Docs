export default {
	'/Networking/': [
		{
			text: '🎋HTTP',
			collapsible: false,
			collapsed: false,
			items: [
				{ text: 'HTTP1', link: '/Networking/http1.md', hidden: true },
				{ text: 'HTTP2', link: '/Networking/http2.md', hidden: true },
				{ text: 'HTTP3', link: '/Networking/http3.md', hidden: true },
				{ text: 'HTTP4', link: '/Networking/http4.md', hidden: true }
			]
		},
		{
			text: '🎡DNS',
			collapsible: false,
			collapsed: false,
			items: [{ text: 'DNS', link: '/Networking/dns.md', hidden: true }]
		}
	],
	'/jsAdvance/': [
		{
			text: '🪄js知识',
			collapsible: true,
			collapsed: true,
			items: [
				{ text: '数据类型', link: '/jsAdvance/js0.md', hidden: true },
				{ text: '深浅拷贝', link: '/jsAdvance/js1.md', hidden: true },
				{ text: '作用域和作用域链', link: '/jsAdvance/js2.md', hidden: false },
				{ text: 'this指向规则一', link: '/jsAdvance/js3.md', hidden: false },
				{ text: 'this指向规则二', link: '/jsAdvance/js4.md', hidden: false },
				{
					text: '手写call apply bind new',
					link: '/jsAdvance/js5.md',
					hidden: false
				},
				{
					text: 'let var const的区别',
					link: '/jsAdvance/js6.md',
					hidden: false
				},
				{
					text: '字符串常用方法',
					link: '/jsAdvance/js7.md',
					hidden: false
				},
				{
					text: '闭包',
					link: '/jsAdvance/js9.md',
					hidden: false
				}
			]
		},
		{
			text: '🏷️ 数组/对象/原型链/ES6+',
			collapsible: true,
			collapsed: true,
			items: [
				{ text: '数组常用方法(一)', link: '/jsAdvance/js10.md', hidden: true },
				{ text: '数组常用方法(二)', link: '/jsAdvance/js13.md', hidden: true },
				{
					text: '数组常用的特殊操作',
					link: '/jsAdvance/js14.md',
					hidden: true
				},
				{ text: '原型原型链', link: '/jsAdvance/js11.md', hidden: true },
				{ text: '继承', link: '/jsAdvance/js12.md', hidden: true },
				{ text: 'ES6常用知识点(一)', link: '/jsAdvance/js15.md', hidden: true },
				{ text: 'ES6常用知识点(二)(一)(一)', link: '/jsAdvance/js16.md', hidden: true },
				{ text: 'Proxy和Reflect', link: '/jsAdvance/js17.md', hidden: true },
				{ text: 'Promise基础', link: '/jsAdvance/js18.md', hidden: true },
				{ text: 'async await基础', link: '/jsAdvance/js19.md', hidden: true },
				{ text: '事件循环', link: '/jsAdvance/js20.md', hidden: true },
				{ text: '前端模块化', link: '/jsAdvance/js21.md', hidden: true }
			]
		},
		{
			text: '💻DOM 和 BOM',
			collapsible: true,
			collapsed: true,
			items: [
				{ text: 'DOM', link: '/jsAdvance/DOM/1.md', hidden: true },
				{ text: 'BOM', link: '/jsAdvance/BOM/1.md', hidden: true }
			]
		}
	],
	'/Guide/': [
		{
			text: '💻开始阅读',
			items: [
				{ text: '数据类型', link: '/jsAdvance/js0.md', hidden: true },
				{ text: 'this指向规则', link: '/jsAdvance/js4.md', hidden: true },
				{ text: '深拷贝', link: '/jsAdvance/js1.md', hidden: true }
			]
		},
		{
			text: '🎨计算机网络',
			items: [
				{ text: 'HTTP基本知识', link: '/Networking/http1.md', hidden: true },
				{
					text: 'HTTP缓存和重定向',
					link: '/Networking/http2.md',
					hidden: true
				},
				{ text: 'HTTPS', link: '/Networking/http3.md', hidden: true }
			]
		},
		{
			text: '🎡HTML5/CSS3',
			items: [
				{ text: 'CSS笔记', link: '/h5c3/CSS.md', hidden: true },
				{ text: 'CSS动画相关', link: '/h5c3/CSS animation.md', hidden: true }
			]
		}
	],
	'/h5c3/': [
		{
			text: '💻HTML5',
			items: [{ text: 'HTML5 新增的内容', link: '/h5c3/h5.md', hidden: true }]
		},
		{
			text: '🎨CSS3',
			items: [
				{ text: 'CSS知识总览', link: '/h5c3/CSS.md', hidden: true },
				{ text: 'CSS动画', link: '/h5c3/CSS animation.md', hidden: true }
			]
		}
	],
	'/tool/': [
		{
			text: '🔑git',
			collapsible: false,
			collapsed: false,
			items: [
				{ text: 'git 的基本使用', link: '/tool/git.md', hidden: true },
				{ text: 'git 的分支管理', link: '/tool/gitbranch.md', hidden: true }
			]
		},
		{
			text: '📗TypeScript',
			collapsible: false,
			collapsed: false,
			items: [{ text: 'TS的基本类型', link: '/tool/基本类型.md', hidden: true }]
		}
	]
};
