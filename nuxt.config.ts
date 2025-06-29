export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: [
		'@nuxt/ui',
		'@nuxt/eslint',
		'@pinia/nuxt',
	],
	css: ['~/assets/css/main.css']
})