// stores/settings.js
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
	state: () => ({
		theme: '#409EFF', // default theme
	}),
	actions: {
		setTheme (newTheme) {
			this.theme = newTheme
		},
	},
})
