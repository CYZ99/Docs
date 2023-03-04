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
			text: '🎡TCP',
			collapsible: false,
			collapsed: false,
			items: [{ text: 'TCP/IP', link: '/Networking/tcp.md', hidden: true }]
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
				}
			]
		}
	],
	'/Guide/': [
		{
			text: '💻开始阅读',
			items: [
				{ text: '数据类型', link: '/jsAdvance/js0.md', hidden: true },
				{ text: '深拷贝', link: '/jsAdvance/js1.md', hidden: true }
			]
		},
		{
			text: '🎨CSS',
			items: [
				{ text: 'flex布局', link: '/jsAdvance/js1.md', hidden: true },
				{ text: 'CSS3', link: '/jsAdvance/js2.md', hidden: true }
			]
		},
		{
			text: '🎡常用工具',
			items: [{ text: 'git', link: '/git.md', hidden: true }]
		}
	]
};
